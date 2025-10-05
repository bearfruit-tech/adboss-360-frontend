'use client'

import { useEffect } from 'react';

export default function Step4TargetingSpecs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Targeting & Technical Specifications</h1>
        <p className="mt-1 text-gray-600">Detailed targeting parameters and technical setup for each channel.</p>
      </div>

      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-lg text-gray-500">Step 4 implementation coming soon...</p>
      </div>
    </>
  );
}
