import axios from 'axios'


const apiClient = axios.create({
	baseURL: 'http://187.188.105.205:8082/ReferidosBack/',
	withCredentials: false,
	headers : {		
		Accept: 'application/json',
		'Content-Type': 'application/json',		
	}
});



// apiClient.interceptors.request.use(
// 	(config) => {
// 	  const token = localStorage.getItem('userDataReact');
  
// 	  if (token) {
// 		config.headers['Authorization'] = `Bearer ${token}`;
// 	  }
  
// 	  return config;
// 	},
// 	(error) => {
// 	  return Promise.reject(error);
// 	}
// );


// RECUPERAR CLAVE   
export function ActualizarClave(post){
	return apiClient.post('admin/sesion/sendEmail.php',post);
}


export function CambiarClave(post){
	return apiClient.post('admin/sesion/cambiarClave.php',post);
}