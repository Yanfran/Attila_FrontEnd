import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import PrivateRoute from '../components/PrivateRoute';
import Home from '../page/Home/Home';
import Login from '../page/Login/Login';
import RecuperarClave from '../page/RecuperarClave/RecuperarClave';
import Perfil from '../page/Perfil/Perfil';
import SearchTickets from '../page/SearchTickets/SearchTickets';
import Empleados from '../page/Empleados/Listar/Empleados';
import EmpleadosEdit from '../page/Empleados/Editar/Editar';
import CrearEmpleados from '../page/Empleados/Crear/Crear';
import TicketsDetails from '../page/TicketsDetails/TicketsDetails';
import Tickets from '../page/Tickets/Listar/Tickets';
import CrearTicket from '../page/Tickets/Crear/Crear';


const AppRoutes = () => {
  return (
    // <Router>
    //   <NavBar />
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/updatePassword" element={<RecuperarClave />} />
    //     <PrivateRoute authenticated={true}>
    //       <Route path="/">
    //         <Route path="/home" element={<Home />} />
    //         <Route path="/perfil" element={<Perfil />} />
    //         <Route path="/buscar" element={<SearchTickets />} />
    //         <Route path="/detail/:id" element={<TicketsDetails />} />
    //         <Route path="/tickets" element={<Tickets />} />
    //         <Route path="/create_tickets" element={<CrearTicket />} />
    //         <Route path="/empleados" element={<Empleados />} />
    //         <Route path="/empleado/crear" element={<CrearEmpleados />} />
    //         <Route path="/empleado/editar" element={<EmpleadosEdit />} />
    //       </Route>
    //     </PrivateRoute>
    //     <Route path="*" element={<Login />} />
    //   </Routes>
    // </Router>

    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/updatePassword" element={<RecuperarClave />} />
      <PrivateRoute>
        <Route element={<NavBar />}>
          <Route path="/home" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/buscar" element={<SearchTickets />} />
          <Route path="/detail/:id" element={<TicketsDetails />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/create_tickets" element={<CrearTicket />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/empleado/crear" element={<CrearEmpleados />} />
          <Route path="/empleado/editar" element={<EmpleadosEdit />} />
        </Route>
      </PrivateRoute>
      <Route path="*" element={<Login />} />
    </Routes>
  </Router>
  );
};

export default AppRoutes;