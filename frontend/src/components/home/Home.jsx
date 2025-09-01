import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Prediction from "../PredictionForm.jsx";

const Home = () => {
  const [userData, setUserData] = useState({});

  const loadData = async () => {
    const res = await fetch("/home", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    setUserData(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Welcome>
        <ContentWrapper>
          <LeftSection>
            <MainTitle>Online Voting Procedures</MainTitle>
            <BulletList>
              <ol>
                <li>
                  Registration
                  <ul>
                    <li>Enter your full name (as per your Aadhaar card)</li>
                    <li>Provide a valid mobile number</li>
                    <li>Enter a valid email address</li>
                    <li>Create a strong password</li>
                    <li>Enter your Aadhaar number</li>
                  </ul>
                </li>
                <li>
                  Login
                  <ul>
                    <li>Enter your Aadhaar number</li>
                    <li>Enter your password</li>
                  </ul>
                </li>
                <li>
                  Voting Section
                  <ul>
                    <li>
                      Go to the Voter section and select the party you want to
                      vote for
                    </li>
                    <li>
                      Once you submit your vote, it cannot be changed, so please
                      vote carefully
                    </li>
                  </ul>
                </li>
                <li>Check live updates of votes below</li>
              </ol>
            </BulletList>
          </LeftSection>
          <RightSection>
            <SubTitle>Why Your Vote Matters</SubTitle>
            <BulletList>
              <li>
                Every vote contributes to shaping the future – Your
                participation in elections directly influences the policies and
                leadership that guide your country’s growth and development.
              </li>
              <li>
                Influences decisions that affect your community – By voting, you
                help decide on issues such as education, healthcare,
                infrastructure, and public services in your local area.
              </li>
              <li>
                Ensures representation of your voice in governance – Voting
                ensures that your opinions and needs are considered when
                government decisions are made.
              </li>
              <li>
                Encourages transparency and accountability – Elected officials
                are more likely to act responsibly when citizens actively
                participate in the democratic process.
              </li>
              <li>
                Strengthens democracy and civic engagement – A higher voter
                turnout reflects an engaged population, reinforcing democratic
                institutions and practices.
              </li>
              <li>
                Protects your rights and freedoms – Voting is a fundamental way
                to safeguard civil liberties and maintain the rule of law in
                society.
              </li>
              <li>
                Influences national and local policies – Your vote can shape
                policies on critical issues like climate change, economy,
                healthcare, and education.
              </li>
            </BulletList>
          </RightSection>
        </ContentWrapper>
      </Welcome>

      <LiveFeed>
        <SectionHead>
          <Head>Live Election Updates</Head>
        </SectionHead>

        <StatsContainer>
          <TotalVotesCard>
            <VotesTitle>Total Votes</VotesTitle>
            <VotesCount>{userData.total || 0}</VotesCount>
          </TotalVotesCard>

          <PartyWise>
            <PartyHead>Party-Wise Results</PartyHead>
            <Grid>
              {[
                {
                  name: "Bharatiya Janata Party(BJP)",
                  img: "https://www.freepnglogos.com/uploads/bjp-logo-png/bjp-picture-png-logos-8.png",
                  key: "bjp",
                  color: "#FF9933",
                },
                {
                  name: "Aam Aadmi Party(AAP)",
                  img: "aap.png",
                  key: "aap",
                  color: "#00A0DE",
                },
                {
                  name: "Indian National Congress(INC)",
                  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Indian_National_Congress_hand_logo.svg/1200px-Indian_National_Congress_hand_logo.svg.png",
                  key: "congress",
                  color: "#19AA6D",
                },
                {
                  name: "Communist Party of India[CPI(M)]",
                  img: "cpi.png",
                  key: "ncp",
                  color: "#3366CC",
                },
                {
                  name: "Samajwadi Party(SP)",
                  img: "sp.webp",
                  key: "sp",
                  color: "red",
                },
                {
                  name: "Bahujan Samaj Party(BSP)",
                  img: "bsp.webp",
                  key: "bsp",
                  color: "violet",
                },
                {
                  name: "Trinamool Congress(TMC)",
                  img: "tmc.webp",
                  key: "tmc",
                  color: "indigo",
                },
                {
                  name: "Janata Dal Secular(JDS)",
                  img: "jds.webp",
                  key: "jds",
                  color: "brown",
                },
              ].map((party) => (
                <PartyCard key={party.key} color={party.color}>
                  <PartyImageContainer>
                    <PartyImage src={party.img} alt={party.name} />
                  </PartyImageContainer>
                  <PartyName>{party.name}</PartyName>
                  <PartyVotes>{userData[party.key] || 0}</PartyVotes>
                  <VoteLabel>Votes</VoteLabel>
                </PartyCard>
              ))}
            </Grid>
          </PartyWise>
        </StatsContainer>
        <LiveFeed>
          <SectionHead>
            <Head>AI Prediction Result</Head>
          </SectionHead>
          <Prediction />
        </LiveFeed>
      </LiveFeed>
    </Container>
  );
};

export default Home;

/* Animations */
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

/* Styled Components */
const Container = styled.div`
  font-family: "Poppins", "Segoe UI", sans-serif;
`;

const Welcome = styled.div`
  min-height: 700px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    transform: rotate(30deg);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  z-index: 2;
  gap: 4rem;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  animation: ${fadeIn} 1s ease forwards;
`;

const RightSection = styled.div`
  flex: 1;
  animation: ${fadeIn} 1s ease forwards;
`;

const MainTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const BulletList = styled.ul`
  list-style: disc inside;
  font-size: 1.1rem;
  line-height: 1.2;
  color: white;

  li {
    margin-bottom: 0.5rem;
  }

  li ul {
    list-style-type: disc; /* bullets for nested UL */
    padding-left: 1.5rem; /* more indentation */
    margin-top: 0.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.8rem;
  }
`;

/* Live Feed & Stats Components remain same as your previous code */

const LiveFeed = styled.div`
  padding: 5rem 2rem;
  background: #f8fafc;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionHead = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Head = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TotalVotesCard = styled.div`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  padding: 2.5rem;
  border-radius: 16px;
  text-align: center;
  margin-bottom: 3rem;
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.2);
`;

const VotesTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  opacity: 0.9;
`;

const VotesCount = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const PartyWise = styled.div`
  width: 100%;
`;

const PartyHead = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1e293b;
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const PartyCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border-top: 4px solid ${(props) => props.color};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const PartyImageContainer = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f8fafc;
  padding: 12px;
`;

const PartyImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const PartyName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const PartyVotes = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #4f46e5;
  margin-bottom: 0.25rem;
`;

const VoteLabel = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
`;
/* Styled Components for Prediction Section */
const PredictionSection = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const PredictButton = styled.button`
  margin-left: 1rem;
  background-color: #4f46e5;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #7c3aed;
  }
`;

const PredictionResult = styled.div`
  margin-top: 1rem;
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 12px;
  font-family: monospace;
  text-align: left;
`;

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;
