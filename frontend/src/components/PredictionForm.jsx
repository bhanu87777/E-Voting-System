import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Prediction = () => {
  const [prediction, setPrediction] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPrediction = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/predict");
      setPrediction(res.data.predictions);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch prediction");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrediction(); // fetch automatically on page load
  }, []);

  return (
    <Container>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>State</th>
              <th>Constituency</th>
              <th>Predicted Winner</th>
            </tr>
          </thead>
          <tbody>
            {prediction.map((item, index) => (
              <tr key={index}>
                <td>{item.State}</td>
                <td>{item.Constituency}</td>
                <td>{item["Predicted Winner"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Prediction;

const Container = styled.div`
  margin: 2rem;
  font-family: "Poppins", sans-serif;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  th,
  td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background: #4f46e5;
    color: white;
  }

  tr:nth-child(even) {
    background: #f9f9f9;
  }

  tr:hover {
    background: #e0e0ff;
  }
`;
