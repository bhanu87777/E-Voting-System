import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

export default function FeedbackStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("http://localhost:5001/feedback/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return <Card>Loading sentiment stats...</Card>;
  }

  if (!stats) {
    return <Card>No stats available</Card>;
  }

  return (
    <Container>
      <Card>
        <Title>Feedback Sentiment Stats</Title>
        <StatList>
          <StatItem color="#d1fae5" borderColor="#10b981">
            👍 Positive: <strong>{stats.positive}</strong>
          </StatItem>
          <StatItem color="#fee2e2" borderColor="#ef4444">
            👎 Negative: <strong>{stats.negative}</strong>
          </StatItem>
          <StatItem color="#fef3c7" borderColor="#f59e0b">
            😐 Neutral: <strong>{stats.neutral}</strong>
          </StatItem>
        </StatList>
      </Card>
    </Container>
  );
}

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const Card = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, #ffffff, #f3f4f6);
  border-radius: 2rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.5s ease forwards;
  text-align: center;
  padding-top: 90px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #4f46e5;
  margin-bottom: 1.5rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;

const StatList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StatItem = styled.li`
  padding: 1rem 1.5rem;
  border-radius: 1.5rem;
  background-color: ${(props) => props.color || "#f3f4f6"};
  border-left: 6px solid ${(props) => props.borderColor || "#4f46e5"};
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center; /* center horizontally */
  align-items: center; /* center vertically */
  min-height: 100vh; /* full viewport height */
  background: linear-gradient(135deg, #eef2ff, #fef3c7); /* optional */
`;
