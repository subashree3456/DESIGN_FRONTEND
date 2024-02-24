import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    const data = {
      username,
      password,
    };
    const res = await axios.post(
      "https://design-backend-1.onrender.com/auth/login",
      data,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const datas = res.data;
    localStorage.setItem("currentUser", JSON.stringify(datas.other));
    localStorage.setItem("token", JSON.stringify(datas.token));
    navigate("/home");
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="Logincontainer">
      <div>
        <h1>Login</h1>
        <div>
          <p className="label">UserName</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="enter username"
            type="text"
            required
          />
        </div>
        <div>
          <p className="label">Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter password"
            type="password"
            required
          />
        </div>
        <div className="buttons">
          <button onClick={handleLogin}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
