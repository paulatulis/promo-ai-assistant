'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const [input, setInput] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    setResults(data.products || []);
    setLoading(false);
  };

  const handleViewDetails = async (prodEId: number) => {
    if (expandedProductId === prodEId) {
      setExpandedProductId(null);
      return;
    }

    setDetailLoading(true);
    setExpandedProductId(prodEId);

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
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-center">Promo Product Assistant</h1>
      <p className="text-center text-gray-600 mb-6">
        Describe what you're looking for and we’ll find matching promo products from our catalog.
      </p>

      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <textarea
          className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm resize-none"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. '100 purple pens under $2'"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div className="space-y-6">
        {results.map((product, i) => (
          <div key={i} className="border p-4 rounded-lg shadow-sm bg-white">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-48 h-auto object-contain rounded border"
                  width={100}
                  height={100}
                />
              )}
              <div className="flex-1 space-y-2">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-sm text-gray-700">{product.description}</p>
                <p className="text-sm text-gray-800 font-medium">
                  Price: ${product.price || 'N/A'}
                </p>
                <button
                  onClick={() => handleViewDetails(product.prodEId)}
                  className="text-blue-600 text-sm underline hover:text-blue-800"
                >
                  {expandedProductId === product.prodEId && detailLoading
                    ? 'Loading...'
                    : expandedProductId === product.prodEId
                      ? 'Hide Details'
                      : 'More Info'}
                </button>
              </div>
            </div>

            {expandedProductId === product.prodEId &&
              productDetails[product.prodEId] && (
                <div className="mt-4 bg-gray-50 border rounded p-4 text-sm space-y-1">
                  <p><span className="font-medium">Production Time:</span> {productDetails[product.prodEId].productionTime || 'N/A'}</p>
                  <p><span className="font-medium">Colors:</span> {productDetails[product.prodEId].colors || 'N/A'}</p>
                  <p><span className="font-medium">Imprint:</span> {productDetails[product.prodEId].imprint || 'N/A'}</p>
                  <p><span className="font-medium">Supplier:</span> {productDetails[product.prodEId].supplier || 'N/A'}</p>
                </div>
              )}
          </div>
        ))}
      </div>
    </main>
  );





}

