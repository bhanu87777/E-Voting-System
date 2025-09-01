import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Register = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    aadhar: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,}$/;
    return re.test(password);
  };

  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);

  const PostData = async (e) => {
    e.preventDefault();
    const { name, aadhar, password } = user;

    // Basic field check
    if (!name || !aadhar || !password) {
      alert("Fill in all the fields");
      return;
    }

    // Name validation
    if (!validateName(name)) {
      alert("Name should contain only letters and spaces");
      return;
    }

    // Aadhar validation
    if (!/^\d{12}$/.test(aadhar)) {
      alert("Aadhar number must be exactly 12 digits");
      return;
    }

    // Password validation
    if (!validatePassword(password)) {
      alert(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
      );
      return;
    }

    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, aadhar, password }),
      });

      const data = await res.text();

      if (res.status === 422 || !data) {
        alert("User already exists. Try logging in");
        history.push("/signin");
      } else {
        alert("Registration Successful");
        history.push("/signin");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <Container>
      <Form>
        <form method="POST">
          <div className="head">Register</div>

          {[
            {
              key: "name",
              label: "Enter your name (as in Aadhar)",
              type: "text",
            },
            { key: "aadhar", label: "Aadhar Number", type: "number" },
            { key: "password", label: "Create Password", type: "password" },
          ].map((field) => (
            <div className="inputGroup" key={field.key}>
              <label htmlFor={field.key}>{field.label}</label>
              <input
                type={field.type}
                name={field.key}
                id={field.key}
                placeholder={field.label}
                value={user[field.key]}
                onChange={handleInput}
              />
            </div>
          ))}

          <button type="submit" onClick={PostData}>
            Register
          </button>
        </form>
      </Form>
    </Container>
  );
};

export default Register;

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
  padding: 2rem 1.5rem;
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
    gap: 0.8rem;

    .head {
      font-size: 2rem;
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
        padding: 0.5rem 0.8rem;
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
      height: 2.8rem;
      background: linear-gradient(135deg, #ff6a00, #ee0979);
      color: #fff;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-weight: 700;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-shadow: 0px 6px 15px rgba(255, 106, 0, 0.4);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0px 8px 20px rgba(255, 106, 0, 0.5);
      }
      &:active {
        transform: translateY(0);
      }
    }
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
