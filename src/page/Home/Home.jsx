import { useEffect, useState } from 'react';
import { Container, Row, Card, Col, Badge, Form } from "react-bootstrap";
import "./home.css";
import { Link } from "react-router-dom";
import { changeLinkColor } from '../../utils';
import { Listar } from "../../services";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { CSVLink } from 'react-csv';


const Home = () => {
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
        const response = await Listar();
        setData(response.data);  
        setOriginalData(response.data);                
        setIsLoading(false);            
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();

    // initializeDataTable();

  }, []);
  

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
          (item.telefono && item.telefono.includes(searchText)) ||
          (item.codigo_cliente && item.codigo_cliente.includes(searchText)) ||
          (item.fecha_apertura && item.fecha_apertura.includes(searchText)) ||
          (item.nombre && item.nombre.toLowerCase().includes(searchText.toLowerCase())) ||
          (item.fecha_cierre && item.fecha_cierre.includes(searchText)) ||
          (item.entrega && item.entrega.toLowerCase().includes(searchText.toLowerCase())) ||
          (item.tiempo_estimado && item.tiempo_estimado.includes(searchText)) ||
          (item.cotizacion && item.cotizacion.includes(searchText)) ||
          item.status.toLowerCase().includes(searchText.toLowerCase())
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
            <td className="text-xs">{item.codigo_cliente}</td>
            <td className="text-xs">{item.telefono}</td>
            <td className="text-xs">{item.nombre}</td>
            <td className="text-xs text-center">{item.fecha_apertura}</td>            
            <td className="text-xs text-center">{item.entrega}</td>
            <td className="text-xs text-center">{item.tiempo_estimado}</td>
            <td className="text-xs text-center">{item.cotizacion ? `$${item.cotizacion}` : ''}</td>
            <td className="text-xs text-center">
              <Link  className="btn-link" to={`/detail/${item.id}`}><span>Ver</span></Link>              
            </td>
            <td className="text-xs">
            {item.status === "RECEPCION" ? (
              <Badge pill bg="primary">
                {item.status}
              </Badge>
            ) : item.status === "DIAGNOSTICO" ? (
              <Badge pill bg="secondary">
                {item.status}
              </Badge>
            ) : item.status === "COTIZACION" ? (
              <Badge pill bg="warning">
                {item.status}
              </Badge>
            ) : item.status === "EJECUCION" ? (
              <Badge pill bg="info">
                {item.status}
              </Badge>
            ) : item.status === "PENDIENTE" ? (
              <Badge pill bg="dark">
                {item.status}
              </Badge>
            ) : item.status === "CANCELADO" ? (
                <Badge pill bg="danger">
                  {item.status}
                </Badge>
            ) : item.status === "ENTREGA" ? (
                  <Badge pill bg="dark">
                    {item.status}
                  </Badge>
            ) : (
              <Badge pill bg="success">
                {item.status}
              </Badge>
            )}

            </td>
            <td></td>
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
          <Col xs={12} md={10} lg={10}>
            <h2 className="mt-4">Tickets recientes</h2>
          </Col>
          <Col xs={12} md={2} lg={2}> 
            <Link className="btn-link ml-2 buscar-boton" to="/buscar">
              <button
                className="btn btn-outline-primary mt-4"
                onMouseOver={() => changeLinkColor(true)}
                onMouseOut={() => changeLinkColor(false)}
                type="button"
              >
                Buscar tickets
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
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        N0.
                      </th>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Teléfono
                      </th>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Cliente
                      </th>
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Fecha Apertura
                      </th>                      
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Tipo de Entrega
                      </th>
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Estimación (días)
                      </th>
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Cotización ($)
                      </th>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">                        
                        Análisis
                      </th>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Estatus
                      </th>
                      <th></th>
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

export default Home;
