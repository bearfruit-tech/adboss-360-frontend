'use client'

import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import useMarketingResearchStore, { ResearchDesignMethodology } from "@/stores/use-marketing-research-store";

type DataCollectionEntry = { findings: string; files: File[] };

function MethodologyDataCollectionCard({
  idx,
  methodology,
  entry,
  onUpdateFinding,
  onAddFiles,
  onRemoveFile,
  allowedExtensions,
}: {
  idx: number;
  methodology: ResearchDesignMethodology;
  entry: DataCollectionEntry;
  onUpdateFinding: (idx: number, text: string) => void;
  onAddFiles: (idx: number, files: FileList | null) => void;
  onRemoveFile: (idx: number, fileIndex: number) => void;
  allowedExtensions: string[];
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    onAddFiles(idx, e.dataTransfer.files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAddFiles(idx, e.target.files);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <Card key={`${methodology.name}-${idx}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{methodology.name}</CardTitle>
            <CardDescription>{methodology.description}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">Data Collection</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Findings / Notes</label>
          <Textarea
            className="min-h-[120px]"
            placeholder="Record key findings, observations, anomalies, timestamps, etc."
            value={entry.findings}
            onChange={(e) => onUpdateFinding(idx, e.target.value)}
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-900">Upload Artifacts</label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <p className="text-gray-700">Drag & drop files here, or click to browse</p>
            <p className="text-xs text-gray-500 mt-1">Allowed: {allowedExtensions.join(', ')}</p>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept={allowedExtensions.join(',')}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {entry.files.length > 0 && (
            <ul className="mt-3 divide-y rounded border">
              {entry.files.map((f, fileIdx) => (
                <li key={`${f.name}-${fileIdx}`} className="flex items-center justify-between p-2 text-sm">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="truncate max-w-[260px]" title={f.name}>{f.name}</span>
                    <span className="text-gray-500">({Math.max(1, Math.round(f.size / 1024))} KB)</span>
                  </div>
                  <button
                    type="button"
                    className="text-red-600 hover:underline"
                    onClick={() => onRemoveFile(idx, fileIdx)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Step3DataCollection() {
  const { researchDesign, dataCollection, updateDataCollectionFinding, addDataCollectionFiles, removeDataCollectionFile } = useMarketingResearchStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const allowedExtensions = useMemo(() => [
    '.csv', '.xls', '.xlsx', '.pdf', '.txt', '.doc', '.docx'
  ], []);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Data Collection Interface</h1>
        <p className="mt-1 text-gray-600">Enter findings and upload artifacts for each methodology from Step 2.</p>
      </div>

      <div className="space-y-8">
        {!researchDesign?.methodologies?.length && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">
              Complete Step 2 to generate methodologies. They will appear here for data entry.
            </p>
          </div>
        )}

        {researchDesign?.methodologies?.map((m, idx) => {
          const dc = (dataCollection as Record<number, DataCollectionEntry>)[idx] || { findings: '', files: [] };
          return (
            <MethodologyDataCollectionCard
              key={`${m.name}-${idx}`}
              idx={idx}
              methodology={m}
              entry={dc}
              onUpdateFinding={updateDataCollectionFinding}
              onAddFiles={(i, files) => {
                if (!files) return;
                addDataCollectionFiles(i, Array.from(files));
              }}
              onRemoveFile={removeDataCollectionFile}
              allowedExtensions={allowedExtensions}
            />
          );
        })}
      </div>
    </>
  );
}