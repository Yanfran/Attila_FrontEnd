import { useContext } from "react";
import "./perfil.css";
import { Container, Row, Col, Form} from "react-bootstrap";
import TokenDesencriptadoContext from "../../components/Context/TokenDesencriptadoContext";
const Perfil = () => {
    
  const datos = useContext(TokenDesencriptadoContext);
  // const { nombre, apellido, correo, telefono } = datos || {};
  // console.log(datos)

  return (
    <Container className="px-4">
      <Row className="justify-content-md-center mt-3">
        <Col xs lg="2"></Col>
        <Col md="auto">
          <h2 className="mt-4 buscarTicket">PERFIL</h2>
        </Col>
        <Col xs lg="2"></Col>
      </Row>

      <Row className="justify-content-md-center mt-3">
        <Col xs lg="2"></Col>
        <Col md="8">
          <Form className="form-search">            

            <Form.Group as={Row} className="mb-3" controlId="formNombre">
              <Form.Label column sm="2">
                Nombre
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="" value={datos?.data?.nombre || ''} onChange={() => {}} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formApellido">
              <Form.Label column sm="2">
                Apellido
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="" value={datos?.data?.apellido || ''} onChange={() => {}} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formApellido">
              <Form.Label column sm="2">
                DNI
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="" value={datos?.data?.dni || ''} onChange={() => {}} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formCorreo">
              <Form.Label column sm="2">
                Correo
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="" value={datos?.data?.correo || ''} onChange={() => {}} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formTelefono">
              <Form.Label column sm="2">
                Teléfono
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="" value={datos?.data?.telefono || ''} onChange={() => {}} />
              </Col>
            </Form.Group>

          </Form>
        </Col>
        <Col xs lg="2"></Col>
      </Row>

      {/* <Row>
        <Col xs={12} md={10} lg={10}>
          <h2 className="mt-4">RESULTADOS</h2>
        </Col>
        <Col xs={12} md={2} lg={2}></Col>                          
      </Row> */}
    </Container>
  )
}

export default Perfil