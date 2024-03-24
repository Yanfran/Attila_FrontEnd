import { Container, Row, Col, Form, Button, InputGroup, FloatingLabel, } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CrearEncuesta } from '../../../services';
import Navbar from "react-bootstrap/Navbar";
import miImagen from "../../../assets/iconos/logo@2x.png";
import "./crear.css";

const Crear = () => {

  let navigate = useNavigate();

  const [encuesta, setEncuesta] = useState({ respuesta_1: "", respuesta_2: "", respuesta_3: "", respuesta_4: "", comentario: ""});
  

  const Guardar = (e) => {
    e.preventDefault();    

    if (encuesta.respuesta_1 === "" || encuesta.respuesta_2 === "" || encuesta.respuesta_3 === "" || encuesta.respuesta_4 === "") {
      toast.error("Debe seleccionar todos los radios", {
        position: toast.POSITION.TOP_RIGHT
      });  
      return;
    }    


    const form = new FormData();
    form.append("respuesta_1", encuesta.respuesta_1);
    form.append("respuesta_2", encuesta.respuesta_2);
    form.append("respuesta_3", encuesta.respuesta_3);   
    form.append("respuesta_4", encuesta.respuesta_4);   
    form.append("comentario", encuesta.comentario);    

    CrearEncuesta(form).then(function ({data}) {
      if (data.result == true) {                

        toast.success(data.msg, {
          position: toast.POSITION.TOP_RIGHT
        });

        navigate("/encuesta/success");

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
    <>
      <div className="navbar-relogeria">
        <div className="container">

          <Navbar expand="lg" className="mb-3">
            <Container fluid>
              <Navbar.Brand href="#" className="">
                <img
                  src={miImagen}
                  className="imgLogo"
                  alt="Descripción de la imagen"
                />
                {/* <span className="textLogo">RELOJ</span> */}
              </Navbar.Brand>              
              
            </Container>
          </Navbar>                             
        </div>
      </div>
      
      <Container className="px-4 mt-4 mb-5">
        <Row>
          <Col xs={12} md={10} lg={10}>
            <h2 className="mt-4">Encuesta</h2>
          </Col>
          {/* <Col xs={12} md={2} lg={2}>
            <Link className="btn-link" to="/empleados">
              <button
                className="btn btn-outline-primary mt-4"
                onMouseOver={() => changeLinkColor(true)}
                onMouseOut={() => changeLinkColor(false)}
                type="button"
              >
                Regresar
              </button>
            </Link>
          </Col> */}

          <Form onSubmit={Guardar} className="form">
            <Row className="mt-5">

              <Col xs={12} md={6} lg={6}>
                <h6>1.	¿Cómo calificarías tu experiencia en nuestro servicio?</h6>
              </Col>  
              <Col xs={12} md={6} lg={6}>                
               
                  {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <div className="d-flex">
                        <p className="ml-4">Muy mala</p>
                        <p className="" style={{marginLeft: "30px"}}>Mala</p>
                        <p className="ml-5">Regular</p>
                        <p className="" style={{marginLeft: "35px"}}>Buena</p> 
                        <p className="ml-4">Excelente</p>
                      </div>
                      <div className="d-flex">
                        <div className="ml-5">
                          <Form.Check
                            inline
                            label=""
                            name="respuesta_1"
                            type={type}
                            id={`inline-${type}-1`}
                            value="Muy mala"
                            onChange={(e) => setEncuesta({...encuesta, [e.target.name]: e.target.value})}                        
                          />               
                        </div>       
                        <div className="ml-5">
                          <Form.Check
                            inline
                            label=""
                            name="respuesta_1"
                            type={type}
                            id={`inline-${type}-2`}
                            value="Mala"
                            onChange={(e) => setEncuesta({...encuesta, [e.target.name]: e.target.value})}                        
                          />    
                        </div>                
                        <div className="ml-5">       
                          <Form.Check
                            inline
                            label=""
                            name="respuesta_1"
                            type={type}
                            id={`inline-${type}-3`}
                            value="Regular"
                            onChange={(e) => setEncuesta({...encuesta, [e.target.name]: e.target.value})}                        
                          />   
                        </div>        
                        <div className="ml-5">                                
                          <Form.Check
                            inline
                            label=""
                            name="respuesta_1"
                            type={type}
                            id={`inline-${type}-4`}
                            value="Buena"
                            onChange={(e) => setEncuesta({...encuesta, [e.target.name]: e.target.value})}                        
                          />         
                        </div>             
                        <div className="ml-5">     
                          <Form.Check
                            inline
                            label=""
                            name="respuesta_1"
                            type={type}
                            id={`inline-${type}-5`}
                            value="Excelente"
                            onChange={(e) => setEncuesta({...encuesta, [e.target.name]: e.target.value})}                        
                          />   
                        </div> 
                      </div>  
                    </div>
                  ))}   


              </Col>   


              <Col xs={12} md={6} lg={6}>
                <h6>2.	¿Cómo calificarías la calidad de los servicios realizados?</h6>
              </Col>  
              <Col xs={12} md={6} lg={6}>                
               
                  {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <div className="d-flex">
                        <p className="ml-4">Muy mala</p>
                        <p className="" style={{marginLeft: "30px"}}>Mala</p>
                        <p className="ml-5">Regular</p>
                        <p className="" style={{marginLeft: "35px"}}>Buena</p> 
                        <p className="ml-4">Excelente</p>
                      </div>
                      <div className="d-flex">
                        <div className="ml-5">
                          <Form.Check
                            inline
                            label=""
                            name="respuesta_2"
                            type={type}
                            id={`inline-${type}-1`}
                            value="Muy mala"
                            onChange={(e) => setEncuesta({...encuesta, [e.target.name]: e.target.value})}                        
                          />               
                        </div>       
                        <div className="ml-5">
                          <Form.Check
                            inline
                            label=""
                            name="respuesta_2"
                            type={type}
                            id={`inline-${type}-2`}
                            value="Mala"
                            onChange={(e) => setEncuesta({...encuesta, [e.target.name]: e.target.value})}                        
                          />    
                        </div>                
                        <div className="ml-5">       
                          <Form.Check
                            inline
                            label=""
                            name="respuesta_2"
                            type={type}
                            id={`inline-${type}-3`}
                            value="Regular"
                            onChange={(e) => setEncuesta({...encuesta, [e.target.name]: e.target.value})}                        
                          />   
                        </div>        
                        <div className="ml-5">                                
                          <Form.Check
                            inline
                            label=""
                            name="respuesta_2"
                            type={type}
                            id={`inline-${type}-4`}
                            value="Buena"
                            onChange={(e) => setEncuesta({...encuesta, [e.target.name]: e.target.value})}                        
                          />         
                        </div>             
                        <div className="ml-5">     
                          <Form.Check
                            inline
                            label=""
                            name="respuesta_2"
                            type={type}
                            id={`inline-${type}-5`}
                            value="Excelente"
                            onChange={(e) => setEncuesta({...encuesta, [e.target.name]: e.target.value})}                        
                          />   
                        </div> 
                      </div>    
                    </div>
                  ))}   


              </Col>  


              <Col xs={12} md={6} lg={6}>
                <h6>3.	¿Qué tan probable es que recomiendes nuestro servicio?</h6>
              </Col>  
              <Col xs={12} md={6} lg={6}>                
               
                  {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <div className="d-flex">
                        <p className="">Nada probable</p>
                        <p className="" style={{marginLeft: "30px"}}>Poco probable</p>
                        <p className="" style={{marginLeft: "30px"}}>Probable</p>
                        <p className="" style={{marginLeft: "30px"}}>Muy probable</p>                         
                      </div>
                      <div className="d-flex">
                        <div className="ml-5">
                          <Form.Check
                            inline
                            label=""
                            name="respuesta_3"
                            type={type}
                            id={`inline-${type}-1`}
                            value="Nada probable"
                            onChange={(e) => setEncuesta({...encuesta, [e.target.name]: e.target.value})}                        
                          />               
                        </div>       
                        <div className="" style={{marginLeft: "90px"}}>
                          <Form.Check
                            inline
                            label=""
                            name="respuesta_3"
                            type={type}
                            id={`inline-${type}-2`}
                            value="Poco probable"
                            onChange={(e) => setEncuesta({...encuesta, [e.target.name]: e.target.value})}                        
                          />    
                        </div>                
                        <div className="" style={{marginLeft: "75px"}}>       
                          <Form.Check
                            inline
                            label=""
                            name="respuesta_3"
                            type={type}
                            id={`inline-${type}-3`}
                            value="Probable"
                            onChange={(e) => setEncuesta({...encuesta, [e.target.name]: e.target.value})}  
                          />   
                        </div>        
                        <div className="" style={{marginLeft: "70px"}}>                                
                          <Form.Check
                            inline
                            label=""
                            name="respuesta_3"
                            type={type}
                            id={`inline-${type}-4`}
                            value="Muy probable"
                            onChange={(e) => setEncuesta({...encuesta, [e.target.name]: e.target.value})}  
                          />         
                        </div>                                     
                      </div>  
                    </div>
                  ))}   


              </Col>  
                    

              <Col xs={12} md={6} lg={6}>
                <h6>4.	¿El tiempo de respuesta fue el adecuado? </h6>
              </Col>  
              <Col xs={12} md={6} lg={6}>                
               
                  {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <div className="d-flex">
                        <p className="" style={{marginLeft: "50px"}}>Si</p>
                        <p className="" style={{marginLeft: "115px"}}>No</p>                        
                      </div>
                      <div className="d-flex">
                        <div className="ml-5">
                          <Form.Check
                            inline
                            label=""
                            name="respuesta_4"
                            type={type}
                            id={`inline-${type}-1`}
                            value="Si"
                            onChange={(e) => setEncuesta({...encuesta, [e.target.name]: e.target.value})}                        
                          />               
                        </div>       
                        <div className="" style={{marginLeft: "90px"}}>
                          <Form.Check
                            inline
                            label=""
                            name="respuesta_4"
                            type={type}
                            id={`inline-${type}-2`}
                            value="No"
                            onChange={(e) => setEncuesta({...encuesta, [e.target.name]: e.target.value})}                        
                          />    
                        </div>                                       
                      </div>  
                    </div>
                  ))}   


              </Col>    


              <h6 className="mt-4 mb-5">5.	¿Te gustaría dejar algún comentario adicional para mejorar nuestro servicio?</h6>
              <FloatingLabel controlId="floatingTextarea3" label="">
                <Form.Control
                  className="textarea-save"
                  as="textarea"                  
                  value={encuesta.comentario}
                  name="comentario"                  
                  onChange={(e) => setEncuesta({...encuesta, [e.target.name]: e.target.value})}                                 
                  style={{ height: "100px" }}   
                />
              </FloatingLabel>                                                        

            </Row>

            <div className="mt-3">
              <Button
                className="save pull-right"
                variant="primary"
                type="submit"
              >
                ENVIAR
              </Button>{" "}
            </div>
          </Form>
        </Row>        
      </Container>
    </>
  );
};
export default Crear;
