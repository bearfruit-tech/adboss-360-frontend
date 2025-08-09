'use client'

import { useEffect } from 'react';

export default function Step3DataCollection() {
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Data Collection Interface</h1>
        <p className="mt-1 text-gray-600">Collect and gather data through various research methods and tools.</p>
      </div>
      
      <div className="space-y-8">
        {/* Empty view placeholder */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <p className="text-gray-500 text-lg">
            Data Collection Interface content will be implemented here.
          </p>
        </div>
      </div>
    </>
  );
}