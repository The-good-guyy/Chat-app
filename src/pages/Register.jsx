import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1 rem;
    justify-content: center;
    img {
      height: 5rem;
    }
  }
`;
function Register(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("form");
  };
  const handleChange = (event) => {
    event.preventDefault();
    alert("change");
  };
  return (
    <>
      <FormContainer>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Snappy</h1>
          </div>
          <input
            type="text"
            placeholder="UserName"
            name="username"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Confirmed Password"
            name="confirmPassword"
            onChange={(event) => handleChange(event)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
}

export default Register;
