import { useState } from "react";
import type { PredictionResult } from "../PredictionTypes";

interface Props {
  onResults: (results: PredictionResult[]) => void;
}

function UploadForm({ onResults }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage(" Please select a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/predict_csv", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload");

      const data: PredictionResult[] = await res.json();
      onResults(data);
      setMessage(` Uploaded successfully: ${data.length} rows processed`);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Upload failed. Ensure the backend is running.";
      setMessage(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-md max-w-3xl mx-auto space-y-4"
    >
      <label className="block text-lg font-semibold text-white">
        Upload CSV File
      </label>

      <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 bg-gray-800 text-center">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="w-full text-white bg-gray-900 p-2 border border-gray-600 rounded"
        />
        <p className="mt-2 text-sm text-gray-400">
          Drag and drop your file or click above to select
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
      >
        Upload
      </button>

      {message && (
        <p className="text-sm text-center text-gray-400">{message}</p>
      )}
    </form>
  );
}

export default UploadForm;
