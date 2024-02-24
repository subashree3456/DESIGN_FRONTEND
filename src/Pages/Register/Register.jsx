import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const handelregister = async () => {
    if (password === canpassword) {
      const data = {
        username,
        password,
        email,
      };
      const res = await axios.post(
        "https://design-backend-1.onrender.com/auth/register",
        data
      );
      if (res.status == 201) {
        navigate("/");
      }
    } else {
      alert("Something went wrong");
    }
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [canpassword, setCanPassword] = useState("");
  return (
    <div className="registercontainer">
      <div>
        <h1>register</h1>
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
          <p className="label">User Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter email"
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
        <div>
          <p className="label">Confirm Password</p>
          <input
            value={canpassword}
            onChange={(e) => setCanPassword(e.target.value)}
            placeholder="enter password"
            type="password"
            required
          />
        </div>
        <div className="buttons">
          <button onClick={handelregister}>Register</button>
          <button onClick={() => navigate("/")}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
