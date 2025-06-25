import React, { useState } from "react";

interface PredictionResult {
  Time: number;
  Amount: number;
  prediction: number;
  probability: number;
  [key: string]: string | number;
}

interface Props {
  results: PredictionResult[];
}

const BatchResultsTable: React.FC<Props> = ({ results }) => {
  const [sortKey, setSortKey] = useState<string>("Time");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  if (!results.length) return null;

  const headers = Object.keys(results[0]);

  const getProbabilityClass = (value: number) => {
    if (value > 0.8) return "text-red-500 font-semibold";
    if (value > 0.5) return "text-yellow-400 font-medium";
    return "text-green-400 font-medium";
  };

  const handleSort = (key: string) => {
    if (key === sortKey) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedResults = [...results].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  return (
    <div className="mt-6 max-w-6xl mx-auto overflow-x-auto rounded-2xl border border-gray-800 shadow-lg">
      <table className="min-w-full bg-gray-900 text-white text-sm">
        <thead className="bg-gray-950 sticky top-0 z-10">
          <tr>
            {headers.map((key) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="px-4 py-3 text-left font-semibold border-b border-gray-700 uppercase tracking-wide text-sm cursor-pointer hover:text-blue-400 transition"
              >
                {key}
                {sortKey === key && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedResults.map((row, index) => (
            <tr
              key={index}
              className={
                row.prediction === 1
                  ? "bg-red-900"
                  : index % 2 === 0
                  ? "bg-gray-800"
                  : "bg-gray-850"
              }
            >
              {headers.map((key) => {
                const value = row[key];
                let cellClass =
                  "px-4 py-2 border-b border-gray-800 whitespace-nowrap";

                if (key === "probability" && typeof value === "number") {
                  cellClass += " " + getProbabilityClass(value);
                }

                if (key === "prediction") {
                  cellClass += " font-bold";
                }

                return (
                  <td key={key} className={cellClass}>
                    {typeof value === "number"
                      ? key === "probability"
                        ? value.toFixed(4)
                        : value
                      : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BatchResultsTable;


