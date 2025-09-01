from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib
import os

app = FastAPI()

# Allow frontend ports
origins = [
    "http://localhost:3000",
    "http://localhost:3001"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path to model and CSV
MODEL_PATH = "model.pkl"
CSV_PATH = "data/eci_data_2024.csv"

# Load model once
if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
else:
    raise FileNotFoundError(f"{MODEL_PATH} not found. Train the model first.")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/predict")
def predict_get():
    try:
        # Check if CSV exists
        if not os.path.exists(CSV_PATH):
            return {"error": f"{CSV_PATH} not found"}

        # Load dataset
        df = pd.read_csv(CSV_PATH, encoding="latin1")

        # Ensure required columns exist
        required_cols = ["Constituency", "Total Votes", "Postal Votes", "% of Votes", "State"]
        for col in required_cols:
            if col not in df.columns:
                return {"error": f"Column '{col}' missing in CSV"}

        # Convert numeric columns
        df["Total Votes"] = pd.to_numeric(df["Total Votes"], errors="coerce")
        df["Postal Votes"] = pd.to_numeric(df["Postal Votes"], errors="coerce")
        df["% of Votes"] = pd.to_numeric(df["% of Votes"], errors="coerce")

        # Drop rows with missing essential values
        df = df.dropna(subset=["Constituency", "Total Votes"])

        # Pick the row with highest votes per constituency
        df_winners = df.loc[df.groupby("Constituency")["Total Votes"].idxmax()]

        # Features
        X = df_winners[["Total Votes", "Postal Votes", "% of Votes"]].fillna(0)

        # Predict
        predictions = model.predict(X)
        df_winners["Predicted Winner"] = predictions

        return {"predictions": df_winners[["State", "Constituency", "Predicted Winner"]].to_dict(orient="records")}

    except Exception as e:
        # Return the exact Python error for debugging
        return {"error": str(e)}
