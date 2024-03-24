import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const Cerrar = (e) => {
    e.preventDefault();
    localStorage.removeItem("userDataReact");
    navigate("/login");
  };  
  return (
    <div className="fondo">
      <Navbar expand="lg" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#" className="text-white">Relojería</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">                
                <button onClick={Cerrar} className="btn btn-primary" type="button">
                  logout
                </button>                 
              </Nav>                         
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>    
    </div>
  );
};

export default Header;
