import { useEffect, useState } from "react";
import { Container, Row, Card, Col, Badge, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { changeLinkColor } from '../../../utils';
import "./clientes.css";
import { ListarClientes, DeleteCliente } from "../../../services";
import { toast } from 'react-toastify';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { CSVLink } from 'react-csv';

const Clientes = () => {  

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Cambia esto según tus necesidades
  const [originalData, setOriginalData] = useState([]);
  

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem); 


  useEffect(() => {    

    const fetchData = async () => {
      try {        
        const response = await ListarClientes();
        setData(response.data);  
        setOriginalData(response.data);                  
        setIsLoading(false);            
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const deleteCliente = (id) => {                   

    const form = new FormData();
    form.append("id", id);      

    DeleteCliente(form).then(function ({data}) {
      if (data.result == true) {                

        toast.warning(data.msg, {
          position: toast.POSITION.TOP_RIGHT
        });  
        
        setData((prevData) => prevData.filter((cliente) => cliente.id !== id));

      } else {
        toast.error(data.msg, {
          position: toast.POSITION.TOP_RIGHT
        });      
      }
    }).catch((error) => {
      console.log(error);
    });

  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };


  const handleSearch = (searchText) => {
    if (searchText === "") {
      // Si el campo de búsqueda está vacío, muestra todos los datos originales
      setData(originalData); // originalData es el conjunto completo de datos
    } else {
      // Filtrar los elementos según el texto de búsqueda
      const filteredData = originalData.filter((item) => {
        return (          
          (item.nombre && item.nombre.includes(searchText)) ||
          (item.codigo_empleado && item.codigo_empleado.includes(searchText)) ||          
          (item.descripcion && item.descripcion.toLowerCase().includes(searchText.toLowerCase())) ||
          (item.fecha && item.fecha.includes(searchText))
          // Agrega más condiciones de filtrado según tus necesidades
        );
      });
  
      // Actualizar los datos mostrados
      setData(filteredData);
    }
  };


  const showTable = () => {
    try {

      if (isLoading) {
        return <div>Cargando...</div>;
      }

      // if (!Array.isArray(data)) {
      //   return null; // o un spinner de carga, por ejemplo
      // }

      // return data.map((item, index) => {
      return currentItems.map((item, index) => {
        return (
          <tr key={index}>
            <td className="text-xs text-center">{item.telefono}</td>
            <td className="text-xs text-center">{item.nombre}</td> 
            <td className="text-xs text-center">{item.correo}</td>                        
            <td className="text-xs text-center">
              {item.status === "1" ? (
                <Badge pill bg="primary">
                  Activo
                </Badge>
              ) : (
                <Badge pill bg="secondary">
                  Inactivo
                </Badge>              
              )}

            </td>
            <td class="text-center">

              <Link className="btn-link" to={`/clientes/editar/${item.id}`}>
                <button
                  className="btn btn-outline-primary"
                  onMouseOver={() => changeLinkColor(true)}
                  onMouseOut={() => changeLinkColor(false)}
                  type="button"
                >
                  Editar
                </button>
              </Link>{"  "}                   
              <button
                className="btn btn-outline-danger"
                onMouseOver={() => changeLinkColor(true)}
                onMouseOut={() => changeLinkColor(false)}
                type="button"
                onClick={() => deleteCliente(item.id)}
              >
                Eliminar
              </button>              
            </td>
          </tr>
        );
      });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <Container className="px-4 mt-4">
        <Row>
          <Col xs={12} md={9} lg={9}>
            <h2 className="mt-4">Clientes</h2>
          </Col>
          <Col xs={12} md={3} lg={3}>
            <Link className="btn-link" to="/clientes/crear">
              <button
                className="btn btn-outline-primary mt-4 pull-right"
                onMouseOver={() => changeLinkColor(true)}
                onMouseOut={() => changeLinkColor(false)}
                type="button"
              >
                Crear clientes
              </button>
            </Link>
          </Col>

          <Col xs={12} md={4} lg={4}>
            <div className="mt-4">
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  {/* <Form.Label>Email address</Form.Label> */}
                  <Form.Control type="text" placeholder="Buscar..." onChange={(e) => handleSearch(e.target.value)} />
                </Form.Group>              
              </Form>              
            </div>            
          </Col>
          <Col xs={12} md={8} lg={8}>
          <div className="d-flex pull-right">
            <ReactHTMLTableToExcel
              className="btn btn-outline-success mt-4 exel-boton"
              table="myTable"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Exportar a Excel"
            >
            </ReactHTMLTableToExcel>
            <CSVLink
              className="btn btn-outline-warning mt-4 ml-2 csv-boton"
              data={data}
              filename="tablecsv.csv"
              target="_blank"
            >
              Exportar a CSV
            </CSVLink>                          
          </div>         
          </Col>
          <Card className="card mt-2">
            <div className="container-fluid py-4">
              <div className="table-responsive p-0 pb-2">
                <table
                  id="myTable"
                  className="table align-items-center stripe cell-borde compact justify-content-center mb-0"
                >
                  <thead>
                    <tr>
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Telefono
                      </th>
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Nombre
                      </th>                     
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Correo
                      </th>                     
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Estatus
                      </th>
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">Acciones</th>
                    </tr>
                  </thead>

                  <tbody className="">{showTable()}</tbody>
                </table>

                <div className="botonera_paginado">
                  <div className="text-center pull-right">
                    <button
                      className="btn btn-outline-primary"
                      onClick={prevPage}
                      disabled={currentPage === 1}                      
                    >
                      Página anterior
                    </button>
                    <span className="mx-2">{currentPage}</span>
                    <button
                      className="btn btn-outline-primary mr-1"
                      onClick={nextPage}
                      disabled={indexOfLastItem >= data.length}                      
                    >
                      Página siguiente
                    </button>
                  </div>     
                </div>   

                <div className="text-center">
                  {!Array.isArray(data) && data.length === 0 && (
                    <div>No hay información disponible.</div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </Row>
      </Container>        
    </>
  );
};
export default Clientes;
