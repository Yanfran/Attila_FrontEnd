import { Container, Row, Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import miImagen from "../../../assets/iconos/logo@2x.png";

const Success = () => {
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

        <Row className="justify-content-md-center">
          <Col xs lg="2">
            
          </Col>
          <Col md="auto" style={{marginTop: "150px"}}>
            <h1 className="mt-4 center">Gracias por respuesta.</h1>
            <div className="text-center">
              <i className="fa fa-check" style={{fontSize: "50px"}}></i>              
            </div>
          </Col>
          <Col xs lg="2">
            
          </Col>
        </Row>
        
      </Container>
    </>
  )
}
export default Success