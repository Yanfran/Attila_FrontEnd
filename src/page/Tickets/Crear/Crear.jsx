import { Container, Row, Col, Form, Button, InputGroup, FloatingLabel, } from "react-bootstrap";
import { useState, useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";
import { changeLinkColor } from '../../../utils';
import { CrearTicket, ListarSedes } from '../../../services';
import { ToastContainer, toast } from 'react-toastify';

export const Crear = () => { 

  let navigate = useNavigate();

  const [relojeria, setRelojeria] = useState({ telefono: "", cliente: "", sede: "", descripcion: "", codigo_cliente: ""});  
  const [sede, setSede] = useState([]);  
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {        
        const response = await ListarSedes();
        setSede(response.data);                  
        // setIsLoading(false);            
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const GuardarTicket = (e) => {
    e.preventDefault();   
    
    if (relojeria.cliente === "" ||relojeria.sede === "" || relojeria.descripcion === "") {
      toast.error("Debe llenar todos los campos.", {
        position: toast.POSITION.TOP_RIGHT
      });  
      return;
    }

    
    const form = new FormData();      
    form.append("telefono", relojeria.telefono);                      
    form.append("cliente", relojeria.cliente);
    form.append("sede", relojeria.sede);    
    form.append("codigo_cliente", relojeria.codigo_cliente);
    form.append("descripcion", relojeria.descripcion); 
        

    CrearTicket(form).then(function ({ data }) {
      // const respuesta = JSON.stringify(data);
      console.log(data.result);
      if (data.result == true) {       

        navigate("/tickets");

        toast.success(data.msg, {
          position: toast.POSITION.TOP_RIGHT
        });      
      
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
      <Container className="px-4 mt-4">
        <Row>
          <Col xs={12} md={10} lg={10}>
            <h2 className="mt-4">Crear Ticket</h2>
          </Col>
          <Col xs={12} md={2} lg={2}>
            <Link className="btn-link" to="/tickets">
              <button
                className="btn btn-outline-primary mt-4"
                onMouseOver={() => changeLinkColor(true)}
                onMouseOut={() => changeLinkColor(false)}
                type="button"
              >
                Regresar
              </button>            
            </Link>    
          </Col>
          

          <Form onSubmit={GuardarTicket} className="form">                                      
            <Row className="mt-5">
              <Col xs={12} md={3} lg={3}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="telefono">
                    <i class="fa fa-phone"></i>
                  </InputGroup.Text>                  
                  <Form.Control
                    placeholder="Teléfono"
                    aria-label="Teléfono"
                    aria-describedby="basic-addon1"
                    value={relojeria.telefono}
                    name="telefono"
                    onChange={(e) => setRelojeria({...relojeria, [e.target.name]: e.target.value})}                        
                  />
                </InputGroup>             
              </Col>
              <Col xs={12} md={3} lg={3}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="nombre">
                    <i class="fa fa-user"></i>                         
                  </InputGroup.Text>                  
                  <Form.Control
                    placeholder="Nombre"
                    aria-label="Nombre"
                    aria-describedby="nombre"
                    value={relojeria.cliente}
                    name="cliente"
                    onChange={(e) => setRelojeria({...relojeria, [e.target.name]: e.target.value})}                        
                  />
                </InputGroup>               
              </Col>              

              
                <Col xs={12} md={3} lg={3}>                
                  <Form.Select 
                    value={relojeria.sede} 
                    onChange={(e) => setRelojeria({...relojeria, [e.target.name]: e.target.value})} 
                    name="sede"
                    aria-label="Default select example"
                  >
                    <option value="">Sede</option>                    
                    {sede.map((sedeOption) => (
                      <option value={sedeOption.value}>
                        {sedeOption.descripcion}
                      </option>
                    ))}
                  </Form.Select>                
                </Col>              

              <Col xs={12} md={3} lg={3}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="orden">
                    <i class="fa fa-id-card"></i>
                  </InputGroup.Text>                  
                  <Form.Control
                    placeholder="No Orden"
                    aria-label="No Orden"
                    aria-describedby="No Orden"
                    value={relojeria.codigo_cliente}
                    name="codigo_cliente"
                    onChange={(e) => setRelojeria({...relojeria, [e.target.name]: e.target.value})}                        
                  />
                </InputGroup>               
              </Col> 



              <Col xs={12} md={12} lg={12}>
                <h5 className="mt-4">Problema del usuario</h5>
                <FloatingLabel controlId="floatingTextarea3" label="">
                  <Form.Control                  
                    className="textarea-save"
                    as="textarea"
                    value={relojeria.descripcion}   
                    name="descripcion" 
                    onChange={(e) => setRelojeria({...relojeria, [e.target.name]: e.target.value})}                        
                    style={{ height: "100px" }}
                  />
                </FloatingLabel>
              </Col>
           
            </Row>
            
            <div className="mt-3">
              <Button className="save pull-right" variant="primary" type="submit">
                GUARDAR TICKET
              </Button>{" "}
            </div>
          </Form>


        </Row>
        <ToastContainer />
      </Container>
    </>
  )
}

export default Crear;
