import { useState } from "react";
import UploadForm from "./components/UploadForm";
import BatchResultsTable from "./components/BatchResultsTable";
import type { PredictionResult } from "./PredictionTypes";

function App() {
  const [batchResults, setBatchResults] = useState<PredictionResult[]>([]);
  const [onlyFrauds, setOnlyFrauds] = useState(false);

  const totalPredictions = batchResults.length;
  const fraudCount = batchResults.filter((r) => r.prediction === 1).length;
  const fraudRate = totalPredictions
    ? ((fraudCount / totalPredictions) * 100).toFixed(2)
    : "0";

  const filteredResults = onlyFrauds
    ? batchResults.filter((r) => r.prediction === 1)
    : batchResults;

  const handleDownloadCSV = () => {
    if (!filteredResults.length) return;

    const headers = Object.keys(filteredResults[0]);
    const csvRows = [
      headers.join(","), // header row
      ...filteredResults.map((row) =>
        headers.map((key) => JSON.stringify(row[key])).join(",")
      ),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "fraud_predictions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10 font-medium">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-white">
          Credit Fraud Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Settings Card */}
            <div className="bg-gray-900 p-6 rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-4">Settings</h2>

              <label className="text-sm text-gray-300">Fraud Threshold</label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="50"
                className="w-full mt-2 accent-red-500"
              />

              <div className="mt-4 flex items-center justify-between">
                <label htmlFor="onlyFrauds" className="text-sm text-gray-300">
                  Show only frauds
                </label>
                <input
                  id="onlyFrauds"
                  type="checkbox"
                  checked={onlyFrauds}
                  onChange={() => setOnlyFrauds(!onlyFrauds)}
                  className="accent-red-500 h-5 w-5"
                />
              </div>

              <button className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg transition">
                Detect Fraud
              </button>
            </div>

            {/* Key Stats Card */}
            <div className="bg-gray-900 p-6 rounded-2xl shadow text-center space-y-4">
              <h2 className="text-lg font-semibold">Key Stats</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white text-sm">
                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                  <p className="text-gray-400">Total Transactions</p>
                  <p className="text-2xl font-bold">{totalPredictions}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                  <p className="text-gray-400">Fraudulent</p>
                  <p className="text-2xl font-bold text-red-500">
                    {fraudCount}
                  </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                  <p className="text-gray-400">Fraud Rate</p>
                  <p className="text-2xl font-bold">{fraudRate}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Upload + Table) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900 p-6 rounded-2xl shadow">
              <UploadForm onResults={setBatchResults} />
            </div>

            {filteredResults.length > 0 && (
              <div className="bg-gray-900 p-6 rounded-2xl shadow space-y-4">
                {/* Download Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleDownloadCSV}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition duration-200"
                  >
                    Download CSV
                  </button>
                </div>

                <BatchResultsTable results={filteredResults} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;




