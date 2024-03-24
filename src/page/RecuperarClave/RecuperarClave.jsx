import React, { useState } from "react";
import {  toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import "./recuperarclave.css";
import { ActualizarClave } from "../../services/login";
import logo from "../../assets/iconos/logo@2x.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


const RecuperarClave = () => {
        
        // let navigate = useNavigate();
        const [user, setUsers] = useState({ email: "" });
        const [loading, setLoading] = useState(false);

        const handleChange = (e) => {
          setUsers({ ...user, [e.target.name]: e.target.value });
          // console.log(user)
        };
        const submitForm = (e) => {
          e.preventDefault();

          // alert(user.email);

          const form = new FormData();
          form.append("email", user.email);  
          
          setLoading(true); 
          ActualizarClave(form).then(function ({data}) {
            if (data.result === true) {   
                      
              toast.success(data.msg, {
                position: toast.POSITION.TOP_RIGHT
              });
      
              // navigate("/clientes");
      
              setLoading(false);
            } else {
              toast.error(data.msg, {
                position: toast.POSITION.TOP_RIGHT
              });      
            }
          }).catch((error) => {
            console.log(error);
          });
                
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
            style={{ width: "25rem", height: "18rem", background: "#322F2F" }}
          >
            <Card.Body>
              <Form onSubmit={submitForm} className="form">
                <div className="d-flex justify-content-center bd-highlight mt-3">
                  <h1 className="title">Recuperar Clave</h1>
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="label">Correo</Form.Label>
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
                

                <div className="d-flex justify-content-center bd-highlight">                                    
                  <Button className="login" type="submit" disabled={loading}>
                    {loading ? (
                      <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                      "Enviar"
                    )}
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

export default RecuperarClave;
