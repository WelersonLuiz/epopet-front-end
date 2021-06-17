import React from "react";

import {
  Navbar,
  Nav
} from "react-bootstrap";
import logosmall from "../../../images/logoE_popetSmall.png";

import "./Header.css";

function ShowLoginButtom(props) {
  const logged = props.loggedInStatus;
  if (logged === false) {
    return <Nav.Link href="/logout">Sair</Nav.Link>;
  }
  return <Nav.Link href="/login">Login</Nav.Link>;
}

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img
          src={logosmall}
          style={{ maxWidth: "50%" }}
          className="d-inline-block align-top"
          alt="Missing"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/nos">Nós</Nav.Link>
          <Nav.Link href="/planos">Planos</Nav.Link>
          <Nav.Link href="/rede-referenciada">Rede Referenciada</Nav.Link>
          <Nav.Link href="/contato">Contato</Nav.Link>
        </Nav>
        <Nav>
          <ShowLoginButtom />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
