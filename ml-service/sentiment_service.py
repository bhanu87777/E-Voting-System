from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # frontend URLs
    allow_credentials=True,
    allow_methods=["*"],          # allow GET, POST, etc.
    allow_headers=["*"],          # allow all headers
)

# Sentiment analysis pipeline
sentiment_pipeline = pipeline("sentiment-analysis")

# Temporary in-memory storage for demo
feedback_storage = []

class FeedbackRequest(BaseModel):
    feedback: str

@app.post("/feedback")
def add_feedback(request: FeedbackRequest):
    result = sentiment_pipeline(request.feedback)
    feedback_storage.append(result[0]["label"].lower())  # store label
    return {"label": result[0]["label"], "score": result[0]["score"]}

@app.get("/feedback/stats")
def feedback_stats():
    # Count positive, negative, neutral
    counts = {"positive": 0, "negative": 0, "neutral": 0}
    for label in feedback_storage:
        if label in counts:
            counts[label] += 1
        else:
            counts["neutral"] += 1
    return counts
