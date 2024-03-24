import { Container, Row, Col, Form, Button, InputGroup, FloatingLabel, } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams  } from "react-router-dom";
import { EditarEmpleado, UpdateEmpleado, ListarSedes } from '../../../services';
import { changeLinkColor } from '../../../utils';
import "./editar.css";

const Editar = () => {  

  const { id } = useParams();  

  let navigate = useNavigate();
  
  const [editarEmpleado, setEditarEmpleado] = useState({ nombre: "", codigo_empleado: "", sede: "", status: "" });
  const [sede, setSede] = useState([]);  
  

  useEffect(() => {       
     
    const fetchData = (id) => {
      const form = new FormData();
      form.append("id", id);
      EditarEmpleado(form).then(function ({data}) {        
        if (data) {
          // setTicket(data);             
          setEditarEmpleado({ 
            nombre: data[0].nombre, 
            codigo_empleado: data[0].codigo_empleado, 
            status: data[0].status,
            sede: data[0].id_sede, 
          });                         
        } else {
          alert("Ups error");
        }
      }).catch((error) => {
        console.log(error);
      });    
    };    

    
    
    const fetchSede = async () => {
      try {        
        const response = await ListarSedes();
        setSede(response.data);                  
        // setIsLoading(false);            
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData(id);   
    fetchSede();

          

  }, []);
  

  const handleEditar  = (e) => {
    e.preventDefault();  

    if (editarEmpleado.nombre === '' || editarEmpleado.codigo_empleado === '' || editarEmpleado.status === '') {
      toast.error('Debe llenar todos los campos.', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }


    const form = new FormData();
    form.append('nombre', editarEmpleado.nombre);
    form.append('codigo_empleado', editarEmpleado.codigo_empleado);
    form.append('status', editarEmpleado.status);
    form.append('sede', editarEmpleado.sede);
    form.append('id', id);
        

    UpdateEmpleado(form).then(function ({data}) {
      if (data.result == true) {              

        toast.info(data.msg, {
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
            <h2 className="mt-4">Editar Empleado</h2>
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

          <Form onSubmit={handleEditar} className="form">
            <input type="hidden" name="id" value={ id } />
            <Row className="mt-5">
              <Col xs={12} md={3} lg={3}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="telefono">
                    <i class="fa fa-user"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Nombre"
                    aria-label="Nombre"
                    aria-describedby="basic-addon1"
                    value={editarEmpleado.nombre}
                    name="nombre"
                    onChange={(e) =>
                      setEditarEmpleado({
                        ...editarEmpleado,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </Col>
              <Col xs={12} md={3} lg={3}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="telefono">                    
                    <i class="fa fa-id-card"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Codigo empleado"
                    aria-label="Codigo empleado"
                    aria-describedby="Codigo empleado"
                    value={editarEmpleado.codigo_empleado}
                    name="codigo_empleado"
                    onChange={(e) =>
                      setEditarEmpleado({
                        ...editarEmpleado,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </Col>

              <Col xs={12} md={3} lg={3}>                
                <Form.Select 
                  value={editarEmpleado.sede} 
                  onChange={(e) => setEditarEmpleado({...editarEmpleado, [e.target.name]: e.target.value})} 
                  name="sede"
                  aria-label="Default select example"
                >
                  <option value="">Sede</option>                    
                  {sede.map((sedeOption) => (
                    <option
                      key={sedeOption.id}
                      value={sedeOption.id}                      
                    >
                      {sedeOption.descripcion}
                    </option>
                  ))}
                </Form.Select>                             
              </Col>


              <Col xs={12} md={3} lg={3}>
                <Form.Select
                  value={editarEmpleado.status}
                  onChange={(e) =>
                    setEditarEmpleado({
                      ...editarEmpleado,
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
                ACTUALIZAR EMPLEADO
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
