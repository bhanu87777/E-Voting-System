import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Vote = () => {
  const history = useHistory();
  const [vote, setVote] = useState("");

  const SubmitVote = async (partyId) => {
    const aadhar = localStorage.getItem("aadhar");
    const password = localStorage.getItem("aadhar-password");
    if (!partyId) {
      alert("Please Select an option");
      return;
    }

    const res = await fetch("/voterecording", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aadhar, password, party: partyId }),
    });

    if (res.status === 400) {
      alert("Please login to vote");
      history.push("/signin");
    } else if (res.status === 500) {
      alert("You have already voted. Cannot vote again");
      history.push("/");
    } else if (res.status === 200) {
      alert("Vote recorded successfully");
      history.push("/");
    }
  };

  const parties = [
    {
      id: "bjp",
      name: "BJP",
      img: "https://www.freepnglogos.com/uploads/bjp-logo-png/bjp-picture-png-logos-8.png",
      color: "#FF9933",
    },
    { id: "congress", name: "Congress", img: "congress.png", color: "#19AA6D" },
    { id: "aap", name: "Aam Aadmi Party", img: "aap.png", color: "#00A0DE" },
    {
      id: "ncp",
      name: "Communist Party of India",
      img: "cpi.png",
      color: "#0084B4",
    },
    { id: "sp", name: "Samajwadi Party", img: "sp.webp", color: "red" },
    {
      id: "bsp",
      name: "Bahujan Samaj Party",
      img: "bsp.webp",
      color: "violet",
    },
    { id: "tmc", name: "Trinamool Congress", img: "tmc.webp", color: "indigo" },
    { id: "jds", name: "Janata Dal Secular", img: "jds.webp", color: "brown" },
  ];

  return (
    <Container>
      <Head>
        <Main>Vote for a Party</Main>
      </Head>

      <PartyGrid>
        {parties.map((p) => (
          <PartyCard
            key={p.id}
            selected={vote === p.id}
            color={p.color}
            onClick={() => {
              setVote(p.id);
              SubmitVote(p.id);
            }}
          >
            <img src={p.img} alt={p.name} />
            <PartyName>{p.name}</PartyName>
          </PartyCard>
        ))}
      </PartyGrid>
    </Container>
  );
};

export default Vote;

/* Styled Components */
const Container = styled.div`
  width: 100vw;
  min-height: 79vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  padding-top: 90px; /* Offset for navbar */
`;

const Head = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Main = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #ff6a00, #ee0979);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Note = styled.div`
  color: #555;
  font-size: 0.95rem;
`;

const PartyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  width: 80%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* 2 per row on tablets */
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 1 per row on mobile */
  }
`;

const PartyCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${({ selected, color }) => (selected ? color : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#333")};
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 120px;
    height: 120px;
    object-fit: contain;
    margin-bottom: 1rem;
  }
`;

const PartyName = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;
