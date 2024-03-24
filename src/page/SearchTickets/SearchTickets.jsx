import { useState } from 'react';
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import "./searchticket.css";
import { Link } from "react-router-dom";
import { Buscar } from "../../services";
// import { changeLinkColor } from '../../utils';

const SearchTickets = () => {
  
  const [searchText, setSearchText] = useState({ descripcion: ""}); 
  const [ticket, setTicket] = useState([]);
  const [noResults, setNoResults] = useState(false);

  // useEffect(() => {  
  // }, []);

  const actualizarStatus = (nuevoTicket) => {
    setTicket([nuevoTicket]);
  };
  

  const handleSearch = (e) => {
    e.preventDefault();        
    const form = new FormData();      
    form.append("descripcion", searchText.descripcion);    
    
    Buscar(form).then(function ({data}) {
      if (data && data.length > 0) {          
        setNoResults(false);                           
        const nuevoTicket = {
          id: data[0].id,
          codigo_cliente: data[0].codigo_cliente,
          telefono: data[0].telefono,
          nombre: data[0].nombre,
          fecha_apertura: data[0].fecha_apertura,
          fecha_cierre: data[0].fecha_cierre,
          fecha_entrega: data[0].fecha_entrega,
          tiempo_estimado: data[0].tiempo_estimado,
          cotizacion: data[0].cotizacion,
          status: data[0].status 
        };        
        actualizarStatus(nuevoTicket);        

      } else {        
        setTicket(0);
        setNoResults(true);
           
      }
    }).catch((error) => {
      console.log(error);
    });   

  };

  const showTable = () => {  

    if (ticket.length === 0) {
      return null; // 
    }
    
      const row = {
        id: ticket[0].id,
        codigo_cliente: ticket[0].codigo_cliente,
        telefono: ticket[0].telefono,
        nombre: ticket[0].nombre,
        fecha_apertura: ticket[0].fecha_apertura,
        fecha_cierre: ticket[0].fecha_cierre,
        fecha_entrega: ticket[0].fecha_entrega,
        tiempo_estimado: ticket[0].tiempo_estimado,
        cotizacion: ticket[0].cotizacion,
        status: ticket[0].status
      };

      return (
        <tr>
          <td className="text-xs">{row.codigo_cliente}</td>
          <td className="text-xs">{row.telefono}</td>
          <td className="text-xs">{row.nombre}</td>
          <td className="text-xs text-center">{row.fecha_apertura}</td>          
          <td className="text-xs text-center">{row.fecha_entrega}</td>
          <td className="text-xs text-center">{row.tiempo_estimado}</td>
          <td className="text-xs text-center">{row.cotizacion ? `$${row.cotizacion}`: ''}</td>     
          <td className="text-xs text-center">
              <Link  className="btn-link" to={`/detail/${row.id}`}><span>Ver</span></Link>              
            </td>     
          <td className="text-xs">
          {row.status === "RECEPCION" ? (
              <Badge pill bg="primary">
                {row.status}
              </Badge>
            ) : row.status === "DIAGNOSTICO" ? (
              <Badge pill bg="secondary">
                {row.status}
              </Badge>
            ) : row.status === "COTIZACION" ? (
              <Badge pill bg="warning">
                {row.status}
              </Badge>
            ) : row.status === "EJECUCION" ? (
              <Badge pill bg="info">
                {row.status}
              </Badge>
            ) : row.status === "PENDIENTE" ? (
              <Badge pill bg="dark">
                {row.status}
              </Badge>
            ) : row.status === "CANCELADO" ? (
                <Badge pill bg="danger">
                  {row.status}
                </Badge>
            ) : (
              <Badge pill bg="success">
                {row.status}
              </Badge>
            )}
          </td>
          <td></td>
        </tr>
      );      
  };  


  return (
    <Container className="px-4">
      <Row className="justify-content-md-center mt-3">
        <Col xs lg="2"></Col>        
        <Col md="auto">
          <h2 className="mt-4 buscarTicket">BUSCAR TICKET</h2>
        </Col>
        <Col xs lg="2"></Col>
      </Row>

      <Row className="justify-content-md-center mt-3">
        <Col xs lg="2"></Col>
        <Col md="4">        

          <Form onSubmit={handleSearch} className="form-search">
            <InputGroup className="mb-3">              
              <Form.Control
                placeholder="Buscar..."
                aria-label="Buscar"
                aria-describedby="basic-addon1"
                className="input-search-2"
                
                name="descripcion"
                type="text"
                value={searchText.descripcion}
                onChange={(e) => setSearchText({...searchText, [e.target.name]: e.target.value})}                                        
              />
            </InputGroup>
          </Form>

        </Col>
        <Col xs lg="2"></Col>
      </Row>

      {ticket.length > 0 &&  (
        <Row>
          <Col xs={12} md={10} lg={10}>
            <h2 className="mt-4">RESULTADOS</h2>
          </Col>
          <Col xs={12} md={2} lg={2}></Col>        
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
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Fecha Apertura
                      </th>                      
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
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

                  <tbody className="">
                    {showTable()}
                  </tbody>
                </table>
              </div>
            </div>
                    
        </Row>
      )}


      {noResults && (
        <Row className="justify-content-md-center mt-3">
          <Col xs lg="2"></Col>        
          <Col md="auto">
            <h2 className="mt-4 buscarTicket">No se encontraron resultados</h2>
          </Col>
          <Col xs lg="2"></Col>
        </Row>        
      )}


    </Container>
  );
};
export default SearchTickets;
