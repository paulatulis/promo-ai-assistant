'use client';

import { useState } from 'react';

export default function HomePage() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null);
  const [productDetails, setProductDetails] = useState<Record<number, any>>({});
  const [detailLoading, setDetailLoading] = useState(false);
  const handleSearch = async () => {
    setLoading(true);
    setExpandedProductId(null);
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: input }),
    });
    const data = await res.json();
    console.log('data', data)
    setResults(data.products || []);
    setLoading(false);
  };

  const handleViewDetails = async (prodEId: number) => {
    if (expandedProductId === prodEId) {
      // Collapse if already expanded
      setExpandedProductId(null);
      return;
    }

    setDetailLoading(true);
    setExpandedProductId(prodEId);

    // Only fetch if we haven't already
    if (!productDetails[prodEId]) {
      const res = await fetch('/api/product-detail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prodEId }),
      });

      const data = await res.json();
      setProductDetails((prev) => ({ ...prev, [prodEId]: data }));
    }

    setDetailLoading(false);
  };


  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Promo Product Assistant</h1>
      <textarea
        className="w-full border p-2 rounded mb-4"
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe what you need, e.g. '100 purple items under $5 for a college event'"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search Products'}
      </button>

      <div className="mt-6 space-y-4">
        {results.map((product, i) => (
          <div key={i} className="border p-4 rounded shadow">
            <h2 className="font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="mt-2 max-w-sm"
              />
            )}
            <p className="mt-2 text-sm">Price: ${product.price}</p>
            <button
              onClick={() => handleViewDetails(product.prodEId)}
              className="mt-2 text-blue-600 underline"
            >
              {expandedProductId === product.prodEId && detailLoading ? 'Loading...' : 'More Info'}
            </button>
            {expandedProductId === product.prodEId && productDetails[product.prodEId] && (
              <div className="mt-4 p-4 border rounded bg-gray-50 shadow text-sm">
                <h3 className="font-bold text-lg">{productDetails[product.prodEId].name}</h3>
                <p>{productDetails[product.prodEId].description}</p>
                {productDetails[product.prodEId].image && (
                  <img
                    src={productDetails[product.prodEId].image}
                    alt={productDetails[product.prodEId].name}
                    className="mt-2 max-w-sm"
                  />
                )}
                <p className="mt-2">Production Time: {productDetails[product.prodEId].productionTime || 'N/A'}</p>
                <p>Colors: {productDetails[product.prodEId].colors || 'N/A'}</p>
                <p>Imprint: {productDetails[product.prodEId].imprint || 'N/A'}</p>
                <p className="text-gray-500">Supplier: {productDetails[product.prodEId].supplier}</p>
              </div>
            )}
          </div>
        ))}
      </div>


    </main>
  );
}
