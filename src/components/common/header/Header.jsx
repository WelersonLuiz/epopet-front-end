import React, { useContext } from "react";
import {Context} from "../../authContext"

import {
  Navbar,
  Nav
} from "react-bootstrap";
import logosmall from "../../../images/logoE_popetSmall.png";

import "./Header.css";
import history from "../../history"


function Header(props) {
  const {authenticated, handleLogout} = useContext(Context)

  if (!authenticated){
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
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );}else{
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
        <Nav.Link href="/dashboard">Home</Nav.Link>
        <Nav.Link href="/nos">Nós</Nav.Link>
        <Nav.Link href="/rede-referenciada">Rede Referenciada</Nav.Link>
        <Nav.Link onClick={() => handleLogout()}>Sair</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>)
  }
}

export default Header;
