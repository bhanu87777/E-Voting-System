import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setLoading(true);
    setSentiment(null);

    try {
      const res = await fetch("http://localhost:5001/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });

      const data = await res.json();
      setSentiment(data.sentiment);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (label) => {
    if (label === "POSITIVE") return "#d1fae5"; // green-100
    if (label === "NEGATIVE") return "#fee2e2"; // red-100
    return "#f3f4f6"; // gray-100
  };

  return (
    <FormContainer>
      <FormTitle>Submit Your Feedback</FormTitle>
      <Form onSubmit={handleSubmit}>
        <TextArea
          placeholder="Write your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={5}
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Submit Feedback"}
        </SubmitButton>
      </Form>

      {sentiment && (
        <SentimentBox color={getSentimentColor(sentiment.label)}>
          <p>
            <strong>Feedback Sentiment:</strong> <span>{sentiment.label}</span>
          </p>
          <p>
            <strong>Confidence Score:</strong>{" "}
            {(sentiment.score * 100).toFixed(2)}%
          </p>
        </SentimentBox>
      )}
    </FormContainer>
  );
}

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const FormContainer = styled.div`
  max-width: 500px;
  margin: 6rem auto;
  padding: 2rem;
  background: whitesmoke;
  border-radius: 2rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease forwards;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #4f46e5;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border-radius: 1rem;
  border: 2px solid #dbeafe;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #fbbf24; // bright yellow border on focus
    box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(
    90deg,
    #f59e0b,
    #fbbf24
  ); // orange-yellow gradient
  color: #fff;
  font-weight: 600;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #fbbf24, #f59e0b); // hover gradient swap
  }
  &:disabled {
    background-color: #fcd34d;
    cursor: not-allowed;
  }
`;

const SentimentBox = styled.div`
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
  border-radius: 1.5rem;
  background-color: ${(props) => props.color || "#fef3c7"}; // yellow fallback
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  color: #000;

  p {
    margin: 0.3rem 0;
    font-weight: 500;
    span {
      font-weight: 700;
    }
  }
`;
