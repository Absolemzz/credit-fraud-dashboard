import { useState } from "react";
import UploadForm from "./UploadForm";
import type { PredictionResult } from "../PredictionTypes";

function CsvPredictorPage() {
  const [results, setResults] = useState<PredictionResult[] | null>(null);

  return (
    <div className="p-6 space-y-6">
      <UploadForm onResults={setResults} />

      {results && (
        <div className="overflow-x-auto bg-gray-900 border border-gray-700 rounded-xl p-4 mt-6">
          <h3 className="text-white text-lg font-semibold mb-4">
            Prediction Results
          </h3>
          <table className="table-auto w-full text-sm text-white">
            <thead>
              <tr className="bg-gray-800 border-b border-gray-700">
                {Object.keys(results[0]).map((col) => (
                  <th key={col} className="px-4 py-2 text-left">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-800 ${
                    row.prediction === 1 ? "bg-red-800" : ""
                  }`}
                >
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="px-4 py-2">
                      {typeof val === "number" ? val.toFixed(4) : val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CsvPredictorPage;
