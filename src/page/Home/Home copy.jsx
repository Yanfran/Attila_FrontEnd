import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import DataTable from "react-data-table-component";
import FilterComponent from "../../components/Filter";

import "./home.css";
import { useMemo, useState } from "react";

const columns = [
  {
    name: "NO.",
    selector: (row) => row.id,
  },
  {
    name: "Telefono",
    selector: (row) => row.telefono,
  },
  {
    name: "cliente",
    selector: (row) => row.cliente,
  },
  {
    name: "Fecha Apertura",
    selector: (row) => row.fechaA,
  },
  {
    name: "Fecha Cierre",
    selector: (row) => row.fechaC,
  },
  {
    name: "Tiempo",
    selector: (row) => row.tiempo,
  },
  {
    name: "Cotización",
    selector: (row) => row.cotizacion,
  },
  {
    name: "Análisis",
    selector: (row) => row.analisis,
  },
  {
    name: "Estatus",
    selector: (row) => row.estatus,
  },
];

const data = [
  {
    id: "1",
    telefono: "Telefono",
    cliente: "Cliente",
    fechaA: "Fecha Apertura",
    fechaC: "Fecha Cierre",
    tiempo: "Tiempo Estimado",
    cotizacion: "Cotización",
    analisis: "Análisis",
    estatus: "Estatus",
  },
  {
    id: "2",
    telefono: "Telefono",
    cliente: "Jorge",
    fechaA: "Fecha Apertura",
    fechaC: "Fecha Cierre",
    tiempo: "Tiempo Estimado",
    cotizacion: "Cotización",
    analisis: "Análisis",
    estatus: "Estatus",
  },
  {
    id: "3",
    telefono: "Telefono",
    cliente: "German",
    fechaA: "Fecha Apertura",
    fechaC: "Fecha Cierre",
    tiempo: "Tiempo Estimado",
    cotizacion: "Cotización",
    analisis: "Análisis",
    estatus: "Estatus",
  },
  {
    id: "4",
    telefono: "Telefono",
    cliente: "Cliente",
    fechaA: "Fecha Apertura",
    fechaC: "Fecha Cierre",
    tiempo: "Tiempo Estimado",
    cotizacion: "Cotización",
    analisis: "Análisis",
    estatus: "Estatus",
  },
  {
    id: "5",
    telefono: "Telefono",
    cliente: "Cliente",
    fechaA: "Fecha Apertura",
    fechaC: "Fecha Cierre",
    tiempo: "Tiempo Estimado",
    cotizacion: "Cotización",
    analisis: "Análisis",
    estatus: "Estatus",
  },
  {
    id: "6",
    telefono: "Telefono",
    cliente: "Cliente",
    fechaA: "Fecha Apertura",
    fechaC: "Fecha Cierre",
    tiempo: "Tiempo Estimado",
    cotizacion: "Cotización",
    analisis: "Análisis",
    estatus: "Estatus",
  },
  {
    id: "7",
    telefono: "Telefono",
    cliente: "Cliente",
    fechaA: "Fecha Apertura",
    fechaC: "Fecha Cierre",
    tiempo: "Tiempo Estimado",
    cotizacion: "Cotización",
    analisis: "Análisis",
    estatus: "Estatus",
  },
  {
    id: "7",
    telefono: "Telefono",
    cliente: "Cliente",
    fechaA: "Fecha Apertura",
    fechaC: "Fecha Cierre",
    tiempo: "Tiempo Estimado",
    cotizacion: "Cotización",
    analisis: "Análisis",
    estatus: "Estatus",
  },
  {
    id: "7",
    telefono: "Telefono",
    cliente: "Cliente",
    fechaA: "Fecha Apertura",
    fechaC: "Fecha Cierre",
    tiempo: "Tiempo Estimado",
    cotizacion: "Cotización",
    analisis: "Análisis",
    estatus: "Estatus",
  },
  {
    id: "7",
    telefono: "Telefono",
    cliente: "Cliente",
    fechaA: "Fecha Apertura",
    fechaC: "Fecha Cierre",
    tiempo: "Tiempo Estimado",
    cotizacion: "Cotización",
    analisis: "Análisis",
    estatus: "Estatus",
  },
  {
    id: "7",
    telefono: "Telefono",
    cliente: "Cliente",
    fechaA: "Fecha Apertura",
    fechaC: "Fecha Cierre",
    tiempo: "Tiempo Estimado",
    cotizacion: "Cotización",
    analisis: "Análisis",
    estatus: "Estatus",
  },
  {
    id: "7",
    telefono: "Telefono",
    cliente: "Cliente",
    fechaA: "Fecha Apertura",
    fechaC: "Fecha Cierre",
    tiempo: "Tiempo Estimado",
    cotizacion: "Cotización",
    analisis: "Análisis",
    estatus: "Estatus",
  },
  {
    id: "7",
    telefono: "Telefono",
    cliente: "Cliente",
    fechaA: "Fecha Apertura",
    fechaC: "Fecha Cierre",
    tiempo: "Tiempo Estimado",
    cotizacion: "Cotización",
    analisis: "Análisis",
    estatus: "Estatus",
  },
  {
    id: "7",
    telefono: "Telefono",
    cliente: "Cliente",
    fechaA: "Fecha Apertura",
    fechaC: "Fecha Cierre",
    tiempo: "Tiempo Estimado",
    cotizacion: "Cotización",
    analisis: "Análisis",
    estatus: "Estatus",
  },
  {
    id: "7",
    telefono: "Telefono",
    cliente: "Cliente",
    fechaA: "Fecha Apertura",
    fechaC: "Fecha Cierre",
    tiempo: "Tiempo Estimado",
    cotizacion: "Cotización",
    analisis: "Análisis",
    estatus: "Estatus",
  },
];

const Home = () => {
  
  // const [filterText, setFilterText] = useState("");
  // const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  // const filteredItems = data.filter(
  //   (item) =>
  //     item.cliente && item.cliente.toLowerCase().includes(filterText.toLowerCase())
  // );


  // const subHeaderComponentMemo = useMemo(() => {
  //   const handleClear = () => {
  //     if (filterText) {
  //       setResetPaginationToggle(!resetPaginationToggle);
  //       setFilterText("");
  //     }
  //   };

  //   return (
  //     <FilterComponent
  //       onFilter={(e) => setFilterText(e.target.value)}
  //       onClear={handleClear}
  //       filterText={filterText}
  //     />
  //   );
  // }, [filterText, resetPaginationToggle]);

  return (
    <Container className="contenedor" fluid>
      <Row>
        <Card className="card">
          <DataTable             
          // title="Contact List"
          // columns={columns}
          // data={filteredItems}
          // pagination
          // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          // subHeader
          // subHeaderComponent={subHeaderComponentMemo}          
          // persistTableHead            

            pagination 
            columns={columns} 
            data={data} 
            />
        </Card>
      </Row>
    </Container>
  );
};

export default Home;
