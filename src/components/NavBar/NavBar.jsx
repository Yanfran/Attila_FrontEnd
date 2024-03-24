import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaHome, FaUserAlt, FaBars, FaAlignJustify, FaUsers, FaAssistiveListeningSystems } from "react-icons/fa";
import { NavLink, Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./navbar.css";
import miImagen from "../../assets/iconos/logo@2x.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import TokenDesencriptadoContext from "../Context/TokenDesencriptadoContext";

const routes = [  
  {
    path: "/home",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "/tickets",
    name: "Tickets",
    icon: <FaAlignJustify />,
  },
  {
    path: "/empleados",
    name: "Empleados",
    icon: <FaUserAlt />,
  },
  {
    path: "/clientes",
    name: "Clientes",
    icon: <FaUsers />,
  },
  {
    path: "/asistencias",
    name: "Asistencias",
    icon: <FaAssistiveListeningSystems />,
  }    
];

const NavBar = () => {
  const navigate = useNavigate();
  const Cerrar = (e) => {
    e.preventDefault();
    localStorage.removeItem("userDataReact");
    navigate("/login");
  };

  const datos = useContext(TokenDesencriptadoContext);

  return (
    <>
      <div className="navbar-relogeria">
        <div className="container">

          <Navbar expand="lg" className="mb-3">
            <Container fluid>
              <Navbar.Brand href="#" className="">
              <Link to="/home">                
                <img
                  src={miImagen}
                  className="imgLogo"
                  alt="Logo"
                />                                  
              </Link>
                {/* <span className="textLogo">RELOJ</span> */}
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="offcanvasNavbar" />
              <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel">
                  <img
                    src={miImagen}
                    className="imgLogo"
                    alt="Logo"
                  /> 
                  {/* Relojería  */}
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                  

                   
                      <Nav.Link><h5>{datos?.data?.nombre || ''}</h5></Nav.Link>                      
                      <NavDropdown
                        // title="Dropdown"
                        align="end"
                        title={<FaUserAlt />}
                        id="dropdown-menu-align-end"
                      >                        
                        {routes.map((route) => (
                          <NavDropdown.Item>
                            <NavLink to={route.path} key={route.name} className="text-black">                            
                                {route.name}
                            </NavLink>
                          </NavDropdown.Item>
                        ))}
                        <Dropdown.Item as={Link} to="/perfil">
                          Perfil
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="4" onClick={Cerrar}>
                          Logout
                        </Dropdown.Item>
                      </NavDropdown>                    

                    {/* <DropdownButton
                      align="end"
                      title={<FaUserAlt />}
                      id="dropdown-menu-align-end"
                    >
                      <Dropdown.Item as={Link} to="/perfil">
                        Perfil
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="4" onClick={Cerrar}>
                        Logout
                      </Dropdown.Item>
                    </DropdownButton> */}

                  {/* <div className="d-flex">
                    <div className="name">                      
                      <h5>{datos?.data?.nombre || ''}</h5>
                    </div>
                    
                  </div> */}


                  </Nav>                  
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>         

          <hr className="linea" />

          <section className="container routes">
            {routes.map((route) => (
              <NavLink to={route.path} key={route.name} className="link">
                <div className="icon">{route.icon}</div>
                {route.name}
              </NavLink>
            ))}
          </section>
        </div>
      </div>
      <div className="">
        <Outlet />{" "}
      </div>
    </>
  );
};
export default NavBar;
