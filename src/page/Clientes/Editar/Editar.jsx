import { Container, Row, Col, Form, Button, InputGroup, FloatingLabel, } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams  } from "react-router-dom";
import { EditarCliente, UpdateCliente } from '../../../services';
import { changeLinkColor } from '../../../utils';
// import { useAlert } from "../../../components/Context/AlertContext";
import "./editar.css";

const Editar = () => {  
  
  // const { showNotificationMessage } = useAlert(); 

  const { id } = useParams();  

  let navigate = useNavigate();

  const [editar, setEditar] = useState({ nombre: "", telefono: "", status: "", correo: "" });
  

  useEffect(() => {       
     
    const fetchData = (id) => {
      const form = new FormData();
      form.append("id", id);
      EditarCliente(form).then(function ({data}) {        
        if (data) {
          // setTicket(data);             
          setEditar({ nombre: data[0].nombre, telefono: data[0].telefono, status: data[0].status, correo: data[0].correo});                                  
        } else {
          alert("Ups error");
        }
      }).catch((error) => {
        console.log(error);
      });    
    };    

    fetchData(id);         

  }, []);
  
  

  const Update = (e) => {
    e.preventDefault();    

    if (editar.nombre == "" ||editar.telefono == "" || editar.status == "") {
      toast.error("Debe llenar todos los campos.", {
        position: toast.POSITION.TOP_RIGHT
      });  
      return;
    }

    const form = new FormData();
    form.append("nombre", editar.nombre);
    form.append("telefono", editar.telefono);
    form.append("status", editar.status);  
    form.append("correo", editar.correo);     
    form.append("id", id); 
        

    UpdateCliente(form).then(function ({data}) {
      if (data.result == true) {                      

        toast.info(data.msg, {
          position: toast.POSITION.TOP_RIGHT
        });
      
        navigate("/clientes");

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
            <h2 className="mt-4">Editar Clientes</h2>
          </Col>
          <Col xs={12} md={2} lg={2}>
            <Link className="btn-link" to="/clientes">
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

          <Form onSubmit={Update} className="form">
            <input type="hidden" name="id" value={ id } />
            <Row className="mt-5">
              <Col xs={12} md={3} lg={3}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="nombre">
                    <i class="fa fa-user"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Nombre"
                    aria-label="Nombre"
                    aria-describedby="basic-addon1"
                    value={editar.nombre}
                    name="nombre"
                    onChange={(e) =>
                      setEditar({
                        ...editar,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </Col>
              <Col xs={12} md={3} lg={3}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="telefono">                    
                    <i class="fa fa-phone"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Codigo empleado"
                    aria-label="Codigo empleado"
                    aria-describedby="Codigo empleado"
                    value={editar.telefono}
                    name="telefono"
                    onChange={(e) =>
                      setEditar({
                        ...editar,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </Col>

              <Col xs={12} md={3} lg={3}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="correo">                    
                    <i class="fa fa-phone"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Correo"
                    aria-label="Correo"
                    aria-describedby="Correo"
                    value={editar.correo}
                    name="correo"
                    onChange={(e) =>
                      setEditar({
                        ...editar,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </Col>

              <Col xs={12} md={3} lg={3}>
                <Form.Select
                  value={editar.status}
                  onChange={(e) =>
                    setEditar({
                      ...editar,
                      [e.target.name]: e.target.value,
                    })
                  }
                  name="status"
                  aria-label="Default select example"
                >
                  <option value="">Estatus</option>
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>                  
                </Form.Select>
              </Col>

                        
            </Row>

            <div className="mt-3">
              <Button
                className="save pull-right"
                variant="primary"
                type="submit"
              >
                ACTUALIZAR CLIENTE
              </Button>{" "}
            </div>
          </Form>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
};
export default Editar;
