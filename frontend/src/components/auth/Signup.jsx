import React, { useState } from "react";
import "./auth.css";
import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../authContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preverntDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/signup", {
        email: email,
        password: password,
        username: username,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      setLoading(false);

      window.location.href = "/";
    } catch (err) {
      console.log(err);
      alert("sign failed");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="main-container">
        <img className="mb-2 mt-5 logo" src={logo} alt="" />
        <h2 className="fs-4 p-4">Sign Up to GitHub</h2>
        <div className="heading">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              username
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Password
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="d-grid gap-2">
            <button
              onClick={handleSignup}
              class="btn btn-success mt-3"
              type="button"
              disabled={loading}
            >
              {loading ? "Loading..." : "Signup"}
            </button>
          </div>
          <hr />
          <div className="text-center">
            <p>
              Already have an account? <Link to="/auth">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
