import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
df = pd.read_csv("data/eci_data_2024.csv", encoding="latin1")

# Convert numeric columns
df["Total Votes"] = pd.to_numeric(df["Total Votes"], errors="coerce")
df["Postal Votes"] = pd.to_numeric(df["Postal Votes"], errors="coerce")
df["EVM Votes"] = pd.to_numeric(df["EVM Votes"], errors="coerce")
df["% of Votes"] = pd.to_numeric(df["% of Votes"], errors="coerce")

# Drop rows where Constituency or Party is missing
df = df.dropna(subset=["Constituency", "Party", "Total Votes"])

# Winner per constituency
winners = df.loc[df.groupby("Constituency")["Total Votes"].idxmax()]
winners["Winner"] = winners["Party"]

# Features (you can expand with demographics later)
X = winners[["Total Votes", "Postal Votes", "% of Votes"]].fillna(0)  # fill NaNs with 0
y = winners["Winner"]

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

print("✅ Model Accuracy:", model.score(X_test, y_test))

# Save trained model
joblib.dump(model, "model.pkl")
print("✅ Model saved as model.pkl")
