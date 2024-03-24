import { Container, Row, Col, Form, Button, InputGroup, FloatingLabel, } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CrearCliente } from '../../../services';
import { changeLinkColor } from '../../../utils';
import "./crear.css";

const Crear = () => {

  let navigate = useNavigate();

  const [cliente, setCliente] = useState({ nombre: "", telefono: "", status: "", correo: "" });
  

  const Guardar = (e) => {
    e.preventDefault();

    if (cliente.nombre == "" || cliente.telefono == "" || cliente.status == "") {
      toast.error("Debe llenar todos los campos.", {
        position: toast.POSITION.TOP_RIGHT
      });  
      return;
    }

    const form = new FormData();
    form.append("nombre", cliente.nombre);
    form.append("telefono", cliente.telefono);
    form.append("status", cliente.status); 
    form.append("correo", cliente.correo);    

    CrearCliente(form).then(function ({data}) {
      if (data.result == true) {   
                
        toast.success(data.msg, {
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
            <h2 className="mt-4">Crear Clientes</h2>
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

          <Form onSubmit={Guardar} className="form">
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
                    value={cliente.nombre}
                    name="nombre"
                    onChange={(e) =>
                      setCliente({
                        ...cliente,
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
                    placeholder="Telefono"
                    aria-label="Telefono"
                    aria-describedby="Telefono"
                    value={cliente.telefono}
                    name="telefono"
                    onChange={(e) =>
                      setCliente({
                        ...cliente,
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
                    value={cliente.correo}
                    name="correo"
                    onChange={(e) =>
                      setCliente({
                        ...cliente,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </Col>

              <Col xs={12} md={3} lg={3}>
                <Form.Select
                  value={cliente.status}
                  onChange={(e) =>
                    setCliente({
                      ...cliente,
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
                GUARDAR EMPLEADO
              </Button>{" "}
            </div>
          </Form>
        </Row>        
      </Container>
    </>
  );
};
export default Crear;
