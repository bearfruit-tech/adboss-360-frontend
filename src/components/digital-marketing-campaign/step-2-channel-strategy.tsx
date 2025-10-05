'use client'

import { useEffect } from 'react';

export default function Step2ChannelStrategy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Channel Strategy & Budget Allocation</h1>
        <p className="mt-1 text-gray-600">AI-recommended digital marketing channels with budget allocation.</p>
      </div>

      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-lg text-gray-500">Step 2 implementation coming soon...</p>
      </div>
    </>
  );
}
