'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductDetail } from './types/product';

export default function HomePage() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: input }),
    });
    const data = await res.json();
    setResults(data.enrichedResults || []);
    setLoading(false);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">Promo Product Assistant</h1>
      <p className="text-center text-gray-600 mb-6">
        Describe what you&#39;re looking for and we&#39;ll find matching promo products from our catalog.
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
          className="w-48 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div className="space-y-6">
        {results.map((product, i) => (
          <div key={i} className="border p-4 rounded-lg shadow-sm bg-white">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {product.pics?.[0]?.url  && (
                <Image
                  src={product.pics?.[0]?.url}
                  alt={product.prName}
                  className="w-48 h-auto object-contain rounded border"
                  width={100}
                  height={100}
                />
              )}
              <div className="flex-1 space-y-2">
                <h2 className="font-semibold text-lg">{product.prName}</h2>
                <div className='mx-4'>
                  <p className="text-sm text-gray-700">{product.description}</p>


                </div>
                <p className="text-sm text-gray-800 font-medium">
                  <span className='font-bold'>Price:</span> ${product?.prc?.[0] || 'N/A'}
                </p>
                <ProductColors colors={product?.colors} />

                <p className="text-sm text-gray-800 font-medium">
                  <span className='font-bold'>Imprint:</span> {product?.imprintArea || 'N/A'}
                </p>
                <p className="text-sm text-gray-800 font-medium">
                  <span className='font-bold'>Production Time:</span> {product?.prodTime || 'N/A'}
                </p>
                <p className="text-sm text-gray-800 font-medium">
                  <span className='font-bold'>Supplier:</span> {product?.supplier?.coName || 'N/A'}
                </p>
                <p className="text-sm text-gray-800 font-medium">
                  <span className='font-bold'>Themes:</span> {product?.themes || 'N/A'}
                </p>
                <p className="text-sm text-gray-800 font-medium">
                  <span className='font-bold'>SAGE EID:</span> {product?.prodEId || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}



const ProductColors = ({ colors }: { colors?: string }) => {
  const [showAll, setShowAll] = useState(false);

  if (!colors) {
    return (
      <p className="text-sm text-gray-800 font-medium">
        <span className="font-bold">Colors:</span> N/A
      </p>
    );
  }

  const colorList = colors.split(',').map(c => c.trim());
  const displayedColors = showAll ? colorList : colorList.slice(0, 2);

  return (
    <div className="text-sm text-gray-800 font-medium">
      <span className="font-bold">Colors:</span>
      <ul className="list-disc list-inside mt-1">
        {displayedColors.map((color, i) => (
          <li key={i}>{color}</li>
        ))}
      </ul>
      {colorList.length > 2 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 text-sm underline mt-1 hover:text-blue-800"
        >
          {showAll ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}


