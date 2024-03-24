import axios from 'axios'


const apiClient = axios.create({
	// baseURL: 'http://localhost:3010/',
	baseURL: 'http://187.188.105.205:3010/',
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

// TICKETS
export function MsgCotizacion(post){	
	return apiClient.post('sendWS',post);
}
