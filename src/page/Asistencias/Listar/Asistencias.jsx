import { useEffect, useState } from "react";
import { Container, Row, Card, Col, Badge, Modal, Button, Form  } from "react-bootstrap";
import "./asistencias.css";
import { ListarAsistencias } from "../../../services";
// import { ToastContainer, toast } from 'react-toastify';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { CSVLink } from 'react-csv';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import miMarker from "../../../assets/iconos/location-pin.png";

const Asistencias = () => {

  const customIcon = new L.Icon({
    iconUrl: miMarker,
    iconSize: [32, 32], 
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Cambia esto según tus necesidades
  const [originalData, setOriginalData] = useState([]);
  

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


  
  
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (photoUrl) => {
    setSelectedPhoto(photoUrl);
    setShow(true);
  };



  const [mapInfo, setMapInfo] = useState({ latitud: 0, longitud: 0 });   
  const [showMapModal, setShowMapModal] = useState(false);
  const handleShowMap = (latitud, longitud) => {
    setMapInfo({latitud, longitud});
    setShowMapModal(true)
  };  




  useEffect(() => {    

    const fetchData = async () => {
      try {        
        const response = await ListarAsistencias();
        setData(response.data);     
        setOriginalData(response.data);                
        setIsLoading(false);            
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
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
            
        return currentItems.map((item, index) => {
        return (
          <tr key={index}>
            <td className="text-xs text-center">{item.id}</td>            
            <td className="text-xs text-center">{item.nombre}</td>            
            <td className="text-xs text-center">{item.codigo_empleado}</td>
            <td className="text-xs text-center">{item.descripcion}</td>            
            <td className="text-xs text-center">{item.fecha}</td>            
            <td className="text-xs text-center">{item.hora}</td>            
            <td class="text-center">
              <Button
                variant="outline-primary"
                onClick={() => handleShow(item.nombre_imagen)} // Reemplaza 'item.urlFoto' con la propiedad correcta de tu objeto 'item' que contiene la URL de la foto
              >
                <i class="fa fa-eye"></i>
              </Button>
            </td>
            <td class="text-center">
              <Button 
                variant="outline-primary"                 
                onClick={() => handleShowMap(item.latitud, item.longitud)}
              >
                <i class="fa fa-map"></i>   
              </Button>                           
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
            <h2 className="mt-4">Asistencias</h2>
          </Col>
          <Col xs={12} md={3} lg={3}>          
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
                        ID.
                      </th>
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Nombre
                      </th>                     
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Codigo Empleado
                      </th>
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Sede
                      </th>
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Fecha
                      </th>
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Hora
                      </th>
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">Foto</th>
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">Map</th>
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

        <Modal 
          show={show}
          // size="lg"
          centered
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Foto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <center>
            {selectedPhoto && <img src={"http://187.188.105.205:8082/ReferidosBack/assets/" + selectedPhoto} alt="Foto" width={400} height={500} />}
            </center>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>            
          </Modal.Footer>
        </Modal>


        <Modal
          show={showMapModal}
          size="lg"
          centered
          onHide={() => setShowMapModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Mapa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MapContainer center={[mapInfo.latitud, mapInfo.longitud]} zoom={15} style={{ height: '400px', width: '100%' }} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker icon={customIcon} position={[mapInfo.latitud, mapInfo.longitud]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowMapModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>


      </Container>      
    </>
  );
};
export default Asistencias;
