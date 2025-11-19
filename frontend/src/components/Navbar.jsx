import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg border-bottom">
      <div className="p-2">
        <img
          className="nav-img "
          style={{ width: "50px", borderRadius: "50%" }}
          src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
        />
      </div>

      <div class="container-fluid">
        <Link style={{ color: "white" }} to="/" class="navbar-brand" href="#">
         <h3>Github</h3>
        </Link>

        <ul className="nav justufy-content-end mx-5">
          <li class="nav-item">
            <Link
              to="/create"
              style={{ color: "aqua" }}
              class="nav-link active"
              aria-current="page"
              href="#"
            >
              create a repo
            </Link>
          </li>
          <li class="nav-item">
            <Link
              to="/profile"
              style={{ color: "aqua" }}
              class="nav-link"
              href="#"
            >
              Profile
            </Link>
          </li>
          <li class="nav-item">
            <Link style={{ color: "aqua" }} class="nav-link" href="#">
              Pricing
            </Link>
          </li>
          <li class="nav-item">
            <Link
              style={{ color: "aqua" }}
              class="nav-link disabled"
              aria-disabled="true"
            >
              Disabled
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
