import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext.jsx"; 

import { PageHeader } from "@primer/react";

import { Box, Button } from "@primer/react";
import "./auth.css";

import logo from "../../assets/github-mark-white.svg";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3002/signup", {
        email: email.trim(),
        password: password.trim(),
        username: username.trim(),
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      setCurrentUser(res.data.userId);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Signup Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <Box sx={{ padding: 1 }}>
          <PageHeader>
            <PageHeader.TitleArea variant="large">
              <PageHeader.Title>Sign Up</PageHeader.Title>
            </PageHeader.TitleArea>
          </PageHeader>
        </Box>

        <form className="login-box" onSubmit={handleSignup}>
          <div>
            <label className="label">Username</label>
            <input
              autoComplete="off"
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              autoComplete="off"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            variant="primary"
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Signup"}
          </Button>
        </form>

        <div className="pass-box">
          <p>
            Already have an account? <Link to="/auth">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
