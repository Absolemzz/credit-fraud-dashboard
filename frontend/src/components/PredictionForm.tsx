import { useState } from 'react';

type Features = { [key: string]: string };
interface PredictionResponse {
  is_fraud: boolean;
  fraud_probability: number;
}

function PredictionForm() {
  const [features, setFeatures] = useState<Features>({
    Time: '',
    Amount: '',
    V1: '',
    V2: '',
    V3: '',
    V4: '',
    V5: '',
    V6: '',
    V7: '',
    V8: '',
    V9: '',
    V10: '',
    V11: '',
    V12: '',
    V13: '',
    V14: '',
    V15: '',
    V16: '',
    V17: '',
    V18: '',
    V19: '',
    V20: '',
    V21: '',
    V22: '',
    V23: '',
    V24: '',
    V25: '',
    V26: '',
    V27: '',
    V28: '',
  });

  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeatures({ ...features, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const numericFeatures = Object.values(features).map((val) =>
      val === '' ? 0 : parseFloat(val)
    );

    try {
      const res = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: numericFeatures }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Prediction failed');
      }

      const data: PredictionResponse = await res.json();
      setResult(`Prediction: ${data.is_fraud ? 'Fraud' : 'Legit'} | Probability: ${data.fraud_probability.toFixed(4)}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setResult(message);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = Object.values(features).every((val) => val !== '');

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 border border-gray-700 p-6 rounded-2xl max-w-3xl mx-auto mt-8 shadow-md"
    >
      <h2 className="text-white text-xl font-semibold mb-4 text-center">Manual Transaction Prediction</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.keys(features).map((key) => (
          <label key={key} className="flex flex-col">
            <span className="text-white text-sm">{key}</span>
            <input
              type="number"
              step="any"
              name={key}
              value={features[key]}
              onChange={handleChange}
              placeholder={key}
              className="p-2 bg-gray-900 text-white border border-gray-600 rounded w-full"
            />
          </label>
        ))}
      </div>
      <button
        type="submit"
        disabled={isLoading || !isFormValid}
        className={`w-full mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200 ${
          isLoading || !isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
        }`}
      >
        {isLoading ? 'Predicting...' : 'Predict'}
      </button>
      {result && <p className="mt-4 text-sm text-center text-gray-300">{result}</p>}
    </form>
  );
}

export default PredictionForm;