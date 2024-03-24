import Home from './page/Home/Home';
import Login from './page/Login/Login';
import RecuperarClave from './page/RecuperarClave/RecuperarClave';
import ChangeClave from './page/ChangeClave/ChangeClave';
import Perfil from './page/Perfil/Perfil';
import SearchTickets from './page/SearchTickets/SearchTickets';
import Empleados from './page/Empleados/Listar/Empleados';
import EmpleadosEdit from './page/Empleados/Editar/Editar';
import CrearEmpleados from './page/Empleados/Crear/Crear';
import Clientes from './page/Clientes/Listar/Clientes';
import ClientesEdit from './page/Clientes/Editar/Editar';
import CrearClientes from './page/Clientes/Crear/Crear';
import CrearEncuesta from './page/Encuesta/Crear/Crear';
import Success from './page/Encuesta/Success/Success';
import Asistencias from './page/Asistencias/Listar/Asistencias'
import {
  BrowserRouter as Router,  
  Routes,
  Route,   
} from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import PrivateRoute from './components/PrivateRoute';
import TicketsDetails from './page/TicketsDetails/TicketsDetails';
import Tickets  from './page/Tickets/Listar/Tickets';
import CrearTicket from './page/Tickets/Crear/Crear';
import { ToastContainer } from 'react-toastify';

function App() {  

  return (    
    <Router>            
        <div className=''> 
        <ToastContainer />
          <Routes>           
            <Route exact path="/" element={<Login/>} />              
            <Route exact path="/updatePassword" element={<RecuperarClave/>} />              
            <Route exact path="/changePassword/:token" element={<ChangeClave/>} />              
            <Route path="/encuesta" element={<CrearEncuesta/>}/>                    
            <Route path="/encuesta/success" element={<Success/>}/>                    
            <Route path="/" element={<PrivateRoute/>}>  
            {/* <Route element={<Sidebar/>}>                 */}              
                  <Route element={<NavBar/>}>                
                    <Route path="/home" element={<Home/>}/>            
                    <Route path="/perfil" element={<Perfil/>}/> 
                    <Route path="/buscar" element={<SearchTickets/>}/> 
                    <Route path="/detail/:id" element={<TicketsDetails/>}/>
                    <Route path="/tickets" element={<Tickets/>}/>
                    <Route path="/create_tickets" element={<CrearTicket/>}/>
                    <Route path="/empleados" element={<Empleados/>}/>
                    <Route path="/empleados/crear" element={<CrearEmpleados/>}/>
                    <Route path="/empleados/editar/:id" element={<EmpleadosEdit/>}/>
                    <Route path="/clientes" element={<Clientes/>}/>
                    <Route path="/clientes/crear" element={<CrearClientes/>}/>
                    <Route path="/clientes/editar/:id" element={<ClientesEdit/>}/>                    
                    <Route path="/asistencias" element={<Asistencias/>}/>
                  </Route>                                                                             
            </Route>       
            
            <Route path="*" element={<Login/>} />  
          </Routes> 
        </div>           
    </Router>  
  );
}

export default App;

