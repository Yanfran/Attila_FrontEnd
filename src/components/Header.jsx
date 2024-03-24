import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Header = () => {
  const navigate = useNavigate();
  const Cerrar = (e) => {
    e.preventDefault();
    localStorage.removeItem("userDataReact");
    navigate("/login");
  };

  const expand = () => 1;

  return (
    <div>
      <Navbar expand="lg" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#"></Navbar.Brand>
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
                <button onClick={Cerrar} className="btn btn-success" type="buttom">
                  logout
                </button>                 
              </Nav>                         
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {/* <Navbar className="navbar">
        <Container>
          <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <button onClick={Cerrar} className="btn btn-success" type="submit">
              logout
            </button>
            <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text> 
          </Navbar.Collapse>
        </Container>
      </Navbar>       */}
    </div>
  );
};

export default Header;
