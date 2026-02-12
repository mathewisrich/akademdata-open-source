// © 2026 Mathew Sekanjako. Psalms23Wave. All Rights Reserved.
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      
      const data = await res.json();
      alert(`Success! Processed: ${data.students} students, ${data.enrollments} enrollments.`);
      // Refresh the page data
      router.refresh();
      setFile(null);
      // Reset input manually if needed, or rely on state
    } catch (error) {
      console.error(error);
      alert('Error uploading file. Please check the console.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} className="sr-only" />
        <div className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          file ? 'border-purple-500 bg-purple-500/10' : 'border-slate-600 hover:border-slate-500'
        }`}>
          {file ? (
            <p className="text-base font-medium text-white">{file.name}</p>
          ) : (
            <p className="text-base text-slate-400">Drop Excel file or click to browse</p>
          )}
          <p className="text-sm text-slate-500 mt-2">.xlsx · max 10MB</p>
        </div>
      </label>
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-slate-700 disabled:text-slate-500 text-white text-base font-medium transition-colors"
      >
        {uploading ? 'Processing...' : 'Run Analysis'}
      </button>
      <a href="/demo.xlsx" download className="block text-center text-sm text-slate-500 hover:text-purple-400 transition-colors py-1">
        Get demo template
      </a>
    </div>
  );
}

