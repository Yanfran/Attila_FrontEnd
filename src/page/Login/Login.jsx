import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, Card} from "react-bootstrap";
import logo from "../../assets/iconos/logo@2x.png";
import "./login.css";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  let navigate = useNavigate();
  const [user, setUsers] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setUsers({ ...user, [e.target.name]: e.target.value });
    // console.log(user)
  };
  const submitForm = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("email", user.email);
    form.append("password", user.password);

    axios
      // .post("http://localhost/ReferidosBack/admin/sesion/login.php", form)      
      // .post("http://localhost:8080/ReferidosBack/admin/sesion/login.php", form)      
      .post("http://187.188.105.205:8082/ReferidosBack/admin/sesion/login.php", form)            
      .then((resultado) => {
        // console.log(resultado.data.token)
          // let token = resultado.data.token;
          // let decode = jwtDecode(token);
          // console.log(decode.data)
        // console.log(resultado.data.result)
        if (resultado.data.result === true) {
          localStorage.setItem("userDataReact", resultado.data.token);          
          navigate("/home");
        } else {     
          toast.error("Usuario incorrecto.", {
            position: toast.POSITION.TOP_RIGHT
          });                 
        }
      });
  };
  return (
    <Container className="contenedor-login" fluid>
      <Row className="justify-content-md-center">
        <Col xs lg="2"></Col>
        <Col md="auto" className="d-flex justify-content-center align-items-center"
         style={{ minHeight: "100vh" }}>                  
          <div className="logo-login">
            <img 
              src={logo} className="imgLogin"
              alt="logo"
            />
          </div>
          <Card className="cubol" style={{ 
              width: "25rem", 
              height: "25rem", 
              // background: "#322F2F" 
              }}>              
            <Card.Body>
              <Form onSubmit={submitForm} className="form">
                <div className="d-flex justify-content-center bd-highlight ">
                  <h1 className="title">Login</h1>
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="label">Email</Form.Label>
                  <input
                    type="text"
                    className="form-control form-login"
                    id="exampleInputEmail1"
                    name="email"
                    onChange={handleChange}
                    value={user.email}
                  />
                  {/* <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} value={user.email}/> */}                  
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="label">Password</Form.Label>
                  <input
                    type="password"
                    className="form-control form-login"
                    id="exampleInputPassword1"
                    name="password"
                    onChange={handleChange}
                    value={user.password}
                  />
                  {/* <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} value={user.password}/> */}
                </Form.Group>

                <Link to="/updatePassword"><p style={{color: "white"}}>Recuperar clave</p></Link>                                           


                <div className="d-grid gap-2">
                  {/* <div className="d-flex justify-content-center bd-highlight"> */}
                    <Button className="login" type="submit" size="lg">
                      Login
                    </Button>
                  {/* </div>      */}
                </div>


              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs lg="2"></Col>
      </Row>
    </Container>   
  );
};

export default Login;
