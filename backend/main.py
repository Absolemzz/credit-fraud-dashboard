from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import joblib
import shap
import uvicorn

# Load model components
model = joblib.load("model/logistic_model.pkl")
scaler = joblib.load("model/scaler.pkl")
explainer = joblib.load("model/shap_explainer.pkl")

app = FastAPI()

# Define request schema
class Transaction(BaseModel):
    features: list[float]

@app.post("/predict")
def predict(transaction: Transaction):
    try:
        # Preprocess
        input_data = np.array(transaction.features).reshape(1, -1)
        input_scaled = scaler.transform(input_data)

        # Predict
        prediction = model.predict(input_scaled)[0]
        prob = model.predict_proba(input_scaled)[0][1]  # Fraud probability

        # SHAP Explanation (optional for later)
        shap_values = explainer.shap_values(input_scaled)
        explanation = shap_values.tolist()[0]

        return {
            "is_fraud": int(prediction),
            "fraud_probability": round(prob, 4),
            "shap_values": explanation  # (optional: we can disable if needed)
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Only needed for local testing
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
