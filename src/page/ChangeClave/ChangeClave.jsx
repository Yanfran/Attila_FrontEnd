import React, { useState, useEffect } from "react";
import {  toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Card, InputGroup } from "react-bootstrap";
import "./changeclave.css";
import { CambiarClave } from "../../services/login";
import logo from "../../assets/iconos/logo@2x.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from "jwt-decode";
import { useParams, useNavigate } from 'react-router-dom';

const ChangeClave = () => {
        
        let navigate = useNavigate();
        const [user, setUsers] = useState({ clave: "", confirmar_clave: "" });
        const [showPassword, setShowPassword] = useState(false);
        const [showPassword2, setShowPassword2] = useState(false);

        

        const togglePasswordVisibility = () => {
          setShowPassword(!showPassword);
        };

        const togglePasswordVisibility2 = () => {
          setShowPassword2(!showPassword2);
        };

        const handleChange = (e) => {
          setUsers({ ...user, [e.target.name]: e.target.value });          
        };

        const { token } = useParams();

        useEffect(() => {
                
          if (token) {
            // Decodificar el token
            // console.log("Token recibido:", token);
            const decodedToken = jwtDecode(token);            
      
            if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
              // El token no ha expirado
              console.log("El token es válido");
              // Realiza las acciones necesarias con el token válido
            } else {
              // El token ha expirado
              console.log("El token ha expirado");
              toast.error("El token ha expirado", { position: toast.POSITION.TOP_RIGHT });
            }
          }
        }, []);




        const submitForm = (e) => {
          e.preventDefault();
          // alert(user.email);

          if (user.clave !== user.confirmar_clave) {
            toast.error("Las contraseñas no coinciden", { position: toast.POSITION.TOP_RIGHT });
            return;
          }


          if (token) {            
            // console.log("Token recibido:", token);
            const decodedToken = jwtDecode(token);
      
            if (decodedToken && decodedToken.exp * 1000 > Date.now()) {              
              // console.log("El token es válido");

              const correo = decodedToken.correo;
              const form = new FormData();
              form.append("correo", correo);  
              form.append("clave", user.clave);  
              form.append("confirmar_clave", user.confirmar_clave);  
              
              CambiarClave(form).then(function ({data}) {
                if (data.result === true) {   
                          
                  toast.success(data.msg, {
                    position: toast.POSITION.TOP_RIGHT
                  });
          
                  navigate("/login");
          
                } else {
                  toast.error(data.msg, {
                    position: toast.POSITION.TOP_RIGHT
                  });      
                }
              }).catch((error) => {
                console.log(error);
              });

            } else {
              // El token ha expirado
              console.log("El token ha expirado");
              toast.error("El token ha expirado", { position: toast.POSITION.TOP_RIGHT });
            }
          }
         
                
        };    

  return (
    <Container className="contenedor-login" fluid>
      <Row className="justify-content-md-center">
        <Col xs lg="2"></Col>
        <Col
          md="auto"
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="logo-login">
            <img 
              src={logo} className="imgLogin"
              alt="logo"
            />
          </div>
          <Card className="cubol"
            style={{ width: "25rem", height: "23rem", background: "#322F2F" }}
          >
            <Card.Body>
              <Form onSubmit={submitForm} className="form">
                <div className="d-flex justify-content-center bd-highlight mt-3">
                  <h1 className="title">Cambiar clave</h1>
                </div>                

                <Form.Label className="label">Clave</Form.Label> 
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    id="password"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                    />
                  </InputGroup.Text>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="Password"
                    value={user.clave}
                    name="clave"
                    onChange={(e) =>
                      setUsers({
                        ...user,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </InputGroup>



                <Form.Label className="label">Confirmar clave</Form.Label> 
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    id="password"
                    onClick={togglePasswordVisibility2}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon
                      icon={showPassword2 ? faEyeSlash : faEye}
                    />
                  </InputGroup.Text>
                  <Form.Control
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="Password"
                    value={user.confirmar_clave}
                    name="confirmar_clave"
                    onChange={(e) =>
                      setUsers({
                        ...user,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </InputGroup>

                  

                          

                <div className="d-flex justify-content-center bd-highlight">
                  <Button className="login" type="submit">
                    Guardar
                  </Button>
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

export default ChangeClave;
