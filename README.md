# Credit Card Fraud Detection Dashboard

Live Demo [Frontend on Vercel](https://credit-fraud-dashboard-e75vi8lao-ryans-projects-6dfbe191.vercel.app)  
Backend API [FastAPI on Render](https://fraud-api-ko7z.onrender.com)

A full-stack machine learning dashboard for detecting fraudulent credit card transactions. Upload CSV files, get real-time predictions, and view SHAP explainability insights for transparency.

---

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: FastAPI (Python), Scikit-learn, SHAP, Uvicorn
- **ML Model**: Logistic Regression + SMOTE (for imbalanced data)
- **Deployment**: Render (API), Vercel (Frontend)

---

## Features

-  Upload CSV to get batch predictions
-  Single transaction prediction form
-  Summary dashboard: total predictions, fraud count, fraud rate
-  Download results as CSV
-  Clean dark mode design with responsive layout

---

## Preview

![Screenshot](preview-image-url.png) <!-- Replace with actual URL if you have one -->

---

## How It Works

1. **Frontend** lets users input transaction data or upload a CSV.
2. **Backend** loads a trained Logistic Regression model and makes predictions.
3. SHAP explains which features influenced the fraud score.

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
source venv/bin/activate  # or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```
