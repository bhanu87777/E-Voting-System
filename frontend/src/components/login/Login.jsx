import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const history = useHistory();
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");

  const isValidAadhar = (num) => /^[0-9]{12}$/.test(num); // 12 digits only

  const LoginUser = async (e) => {
    e.preventDefault();

    if (!isValidAadhar(aadhar)) {
      alert("Please enter a valid 12-digit Aadhar number");
      return;
    }

    // Store in localStorage (as before)
    localStorage.setItem("aadhar", aadhar);
    localStorage.setItem("aadhar-password", password);

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, aadhar }),
      });

      const text = await res.text(); // Read backend response as plain text

      if (res.status === 400) {
        alert(text); // Show error message
      } else {
        alert(text); // e.g., "Logged in Successfully"
        history.push("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Container>
      <Form>
        <form method="POST">
          <div className="head">Login</div>

          <div className="inputGroup">
            <label htmlFor="aadhar">Aadhar Number</label>
            <input
              type="text"
              name="aadhar"
              id="aadhar"
              placeholder="Enter your Aadhar number"
              value={aadhar}
              maxLength={12}
              onChange={(e) => setAadhar(e.target.value.replace(/\D/, ""))} // Allow numbers only
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" onClick={LoginUser}>
            Login
          </button>
        </form>
      </Form>
    </Container>
  );
};

export default Login;

/* Styled Components */
const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ffecd2, #fcb69f);
  padding-top: 90px;
`;

const Form = styled.div`
  width: 35%;
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid #eee;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.2);
  }

  @media all and (max-width: 1236px) {
    width: 45%;
  }
  @media all and (max-width: 1000px) {
    width: 55%;
  }
  @media all and (max-width: 800px) {
    width: 70%;
  }
  @media all and (max-width: 500px) {
    width: 90%;
    padding: 1.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;

    .head {
      font-size: 2.2rem;
      font-weight: 700;
      text-align: center;
      background: linear-gradient(90deg, #ff6a00, #ee0979);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .inputGroup {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;

      label {
        font-weight: 600;
        color: #333;
      }
      input {
        height: 2.4rem;
        padding: 0.6rem 1rem;
        border-radius: 12px;
        border: 2px solid #ccc;
        outline: none;
        transition: all 0.3s;

        &:focus {
          border-color: #ff6a00;
          box-shadow: 0px 0px 8px rgba(255, 106, 0, 0.3);
        }
      }
    }

    button {
      height: 3rem;
      background: linear-gradient(135deg, #ff6a00, #ee0979);
      color: #fff;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-weight: 700;
      font-size: 1.05rem;
      transition: all 0.3s ease;
      box-shadow: 0px 6px 15px rgba(255, 106, 0, 0.4);

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0px 8px 20px rgba(255, 106, 0, 0.5);
      }
      &:active {
        transform: translateY(0);
      }
    }
  }
`;
