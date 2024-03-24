import { Container, Row, Col, Form, Button, InputGroup, FloatingLabel, } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CrearEmpleado, ListarSedes } from '../../../services';
import { changeLinkColor } from '../../../utils';
import "./crear.css";

const Crear = () => {

  let navigate = useNavigate();

  const [empleado, setEmpleado] = useState({ nombre: "", codigo_empleado: "", sede: "", status: "" });
  const [sede, setSede] = useState([]);  
  
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

  const Guardar = (e) => {
    e.preventDefault();

    if (empleado.nombre == "" ||  empleado.codigo_empleado == "" || empleado.sede == "" || empleado.status == "") {
      toast.error("Debe llenar todos los campos.", {
        position: toast.POSITION.TOP_RIGHT
      });  
      return;
    }

    const form = new FormData();
    form.append("nombre", empleado.nombre);
    form.append("codigo_empleado", empleado.codigo_empleado);
    form.append("status", empleado.status);    
    form.append("sede", empleado.sede);    

    CrearEmpleado(form).then(function ({data}) {
      if (data.result == true) {                

        toast.success(data.msg, {
          position: toast.POSITION.TOP_RIGHT
        });

        navigate("/empleados");

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
            <h2 className="mt-4">Crear Empleados</h2>
          </Col>
          <Col xs={12} md={2} lg={2}>
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
          </Col>

          <Form onSubmit={Guardar} className="form">
            <Row className="mt-5">
              <Col xs={12} md={3} lg={3}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="telefono">
                    <i class="fa fa-phone"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Nombre"
                    aria-label="Nombre"
                    aria-describedby="basic-addon1"
                    value={empleado.nombre}
                    name="nombre"
                    onChange={(e) =>
                      setEmpleado({
                        ...empleado,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </Col>
              <Col xs={12} md={3} lg={3}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="telefono">
                    <i class="fa fa-user"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Codigo empleado"
                    aria-label="Codigo empleado"
                    aria-describedby="Codigo empleado"
                    value={empleado.codigo_empleado}
                    name="codigo_empleado"
                    onChange={(e) =>
                      setEmpleado({
                        ...empleado,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </Col>

              <Col xs={12} md={3} lg={3}>                
                  <Form.Select 
                    value={empleado.sede} 
                    onChange={(e) => setEmpleado({...empleado, [e.target.name]: e.target.value})} 
                    name="sede"
                    aria-label="Default select example"
                  >
                    <option value="">Sede</option>                    
                    {sede.map((sedeOption) => (
                      <option value={sedeOption.id}>
                        {sedeOption.descripcion}
                      </option>
                    ))}
                  </Form.Select>                
                </Col> 

              <Col xs={12} md={3} lg={3}>
                <Form.Select
                  value={empleado.status}
                  onChange={(e) =>
                    setEmpleado({
                      ...empleado,
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
