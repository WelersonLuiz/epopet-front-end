import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { Context } from "../../authContext";
import logosmall from "../../../images/logoE_popetSmall.png";
import "./Header.css";

function Header(props) {
  const { authenticated, handleLogout } = useContext(Context);
  let history = useHistory();
  
  var buttonName =  "NoButtonName";
  if (authenticated) {
    buttonName = "Sair";
  } else {
    buttonName = "Login";
  }
  
  function handleClick() {
    if (authenticated) {
      handleLogout()      
    } else {
      history.push("/login")
    }
  }

  return (
    <div>
      <Navbar bg="light" expand="lg" className="nav-bar">
        <Navbar.Brand href="/" className="brand">
          <img
            src={logosmall}
            style={{ width: "100%" }}
            className="d-inline-block align-top"
            alt="Missing"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard">Home</Nav.Link>
            <Nav.Link href="/nos">Nós</Nav.Link>
            <Nav.Link href="/rede-referenciada">Rede Referenciada</Nav.Link>
            <Nav.Link onClick={() => handleClick()}>{buttonName}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
