import axios from 'axios'


const apiClient = axios.create({
	// baseURL: 'http://localhost/ReferidosBack/',
	// baseURL: 'http://localhost:8080/ReferidosBack/',
	baseURL: 'http://187.188.105.205:8082/ReferidosBack/',		
	withCredentials: false,
	headers : {		
		Accept: 'application/json',
		'Content-Type': 'application/json',		
	}
});



apiClient.interceptors.request.use(
	(config) => {
	  const token = localStorage.getItem('userDataReact');
  
	  if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	  }
  
	  return config;
	},
	(error) => {
	  return Promise.reject(error);
	}
);



// LOGIN



// TICKETS
export function CrearTicket(post){
	return apiClient.post('admin/tickets/guardar.php',post);
}

export function Listar(){	
	return apiClient.get('admin/tickets/listar.php');
}

export function ListarDetalle(post){
	return apiClient.post('admin/tickets/listar_detalles.php',post);
}

export function CrearRecepcion(post){
	return apiClient.post('admin/tickets/recepcion.php',post);
}

export function CrearDiagnostico(post){
	return apiClient.post('admin/tickets/diagnostico.php',post);
}

export function CrearCotizacion(post){
	return apiClient.post('admin/tickets/cotizacion.php',post);
}

export function NextEjecucion(post){
	return apiClient.post('admin/tickets/next_ejecucion.php',post);
}

export function NextCerrar(post){
	return apiClient.post('admin/tickets/next_cerrar.php',post);
}

export function CrearComentarios(post){
	return apiClient.post('admin/tickets/agregar_comentarios.php',post);
}

export function Ejecucion(post){
	return apiClient.post('admin/tickets/ejecucion.php',post);
}

export function CrearEntrega(post){
	return apiClient.post('admin/tickets/entrega.php',post);
}

export function Entregado(post){
	return apiClient.post('admin/tickets/entregado.php',post);
}

export function RetornarEstatus(post){
	return apiClient.post('admin/tickets/retornar_recepcion.php',post);
}

export function Buscar(post){
	return apiClient.post('admin/tickets/buscar.php',post);
}



// EMPLEADOS
export function CrearEmpleado(post){
	return apiClient.post('admin/empleados/guardar.php',post);
}

export function ListarEmpleados(){	
	return apiClient.get('admin/empleados/listar.php');
}

export function EditarEmpleado(post){	
	return apiClient.post('admin/empleados/editar.php',post);
}

export function UpdateEmpleado(post){	
	return apiClient.post('admin/empleados/update.php',post);
}

export function DeleteEmpleado(post){	
	return apiClient.post('admin/empleados/delete.php',post);
}


// CLIENTES
export function CrearCliente(post){
	return apiClient.post('cliente/guardar.php',post);
}

export function ListarClientes(){		
	return apiClient.get('cliente/listar.php');
}

export function EditarCliente(post){	
	return apiClient.post('cliente/editar.php',post);
}

export function UpdateCliente(post){	
	return apiClient.post('cliente/update.php',post);
}

export function DeleteCliente(post){	
	return apiClient.post('cliente/delete.php',post);
}



// SEDES 
export function ListarSedes(){		
	return apiClient.get('sede/listar.php');
}


// ENCUESTA 
export function CrearEncuesta(post){		
	return apiClient.post('encuesta/guardar.php',post);
}



// ASISTENCIAS
export function ListarAsistencias(){	
	return apiClient.get('admin/asistencias/listar.php');
}

// export function EditarEmpleado(post){	
// 	return apiClient.post('admin/empleados/editar.php',post);
// }

// export function UpdateEmpleado(post){	
// 	return apiClient.post('admin/empleados/update.php',post);
// }

// export function DeleteEmpleado(post){	
// 	return apiClient.post('admin/empleados/delete.php',post);
// }