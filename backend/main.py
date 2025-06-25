from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import numpy as np
import pandas as pd
import joblib
import shap
import io
import uvicorn
import os

# Dynamically resolve path to model directory
base_dir = os.path.dirname(__file__)
model_dir = os.path.join(base_dir, "model")

# Load model components
model = joblib.load(os.path.join(model_dir, "logistic_model.pkl"))
scaler = joblib.load(os.path.join(model_dir, "scaler.pkl"))
explainer = joblib.load(os.path.join(model_dir, "shap_explainer.pkl"))

app = FastAPI()

# CORS for frontend access (dev only)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Single Transaction Prediction Endpoint
class Transaction(BaseModel):
    features: list[float]

@app.post("/predict")
def predict(transaction: Transaction):
    try:
        input_data = np.array(transaction.features).reshape(1, -1)
        input_scaled = scaler.transform(input_data)

        prediction = model.predict(input_scaled)[0]
        prob = model.predict_proba(input_scaled)[0][1]

        shap_values = explainer.shap_values(input_scaled)
        explanation = shap_values.tolist()[0]

        return {
            "is_fraud": int(prediction),
            "fraud_probability": round(prob, 4),
            "shap_values": explanation
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Batch CSV Prediction Endpoint
@app.post("/predict_csv")
async def predict_csv(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

        input_scaled = scaler.transform(df)

        predictions = model.predict(input_scaled)
        probabilities = model.predict_proba(input_scaled)[:, 1]

        df["prediction"] = predictions
        df["probability"] = probabilities

        return df.to_dict(orient="records")

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Local Dev Entry Point
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)


