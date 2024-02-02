import React from "react";
import { Navbar} from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = ({ showLoader }) => {
  return (
    <Navbar style={{ backgroundColor: " #FF5E01" }}>
      <Navbar.Brand  style={{ color: "#fff" }}>
        <Link
          to="/"
          style={{ color: "#fff", textDecoration: "none" }}
          onClick={showLoader}
        >
           Hacker News Clone
        </Link>
      </Navbar.Brand>
    </Navbar>
  );
};

export default Header;
