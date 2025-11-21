import React, { useEffect, useState } from "react";
import "./profile.css";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/github-mark-white.svg";
import axios from "axios";
import HeatMap from "@uiw/react-heat-map";
import HeatMapProfile from "./HeatMap";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "username" });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/userProfile/${userId}`
          );
          setUserDetails(response.data.user);
        } catch (err) {
          console.error("cannot fetch user details", err);
        }
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="header">
          <p>
            {" "}
            <i class="fa-solid fa-book-open"></i>&nbsp; Overview
          </p>
          <p>
            <i class="fa-solid fa-star"></i> starred Repository
          </p>
        </div>
        <div className="img-container">
          <img src={logo} alt="" />
          <p className="mt-3">{userDetails.username}</p>
          <p>follow</p>
          <div className="follows">
            <p>{userDetails.followed}</p>
            <p>following</p>
          </div>
        </div>
        <div className="heat-map-section">
          <HeatMapProfile />
        </div>
      </div>
    </>
  );
};

export default Profile;
