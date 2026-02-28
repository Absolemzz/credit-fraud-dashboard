# Credit Card Fraud Detection Dashboard

A full-stack machine learning dashboard for detecting fraudulent credit card transactions. Upload CSV files, get real-time predictions, and view SHAP explainability insights.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Tailwind CSS, Vite |
| Backend | FastAPI, Scikit-learn, SHAP, Uvicorn |
| ML Model | Logistic Regression + SMOTE |
| Deployment | Vercel (frontend), Render (API) |

---

## Features

- Upload a CSV to get batch fraud predictions
- Single transaction prediction form
- Summary dashboard: total predictions, fraud count, fraud rate
- Download results as CSV
- Dark mode UI with responsive layout

---

## How It Works

1. User inputs transaction data manually or uploads a CSV
2. Backend runs a trained Logistic Regression model to predict fraud
3. SHAP values explain which features influenced each prediction

---

## Local Setup
```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## License

MIT
