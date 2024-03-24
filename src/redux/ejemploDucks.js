import {Listar, Guardar, Editar, Delete} from '../services'

//Constantes (Variables y/o estados)

const dataInicial = {
	array : []
};


//types
const consulta_exito = 'consulta_exito';

//Reducer
export default function ejemploReducer(state = dataInicial, action){
	switch(action.type){
		case consulta_exito:
			return {...state, array : action.payload};
		default:
			return state;
	}
}


//Acciones
export const consultaAccion = () => async (dispatch, getState) => {

	try{

		Listar().then( function (response) {
      
	      const resultado = response.data;
		      dispatch({
				type: consulta_exito,
				payload: resultado
		  });

		  console.log(resultado);

	    }).catch(error => {
	      console.log(error);
	    });

		
		
	}catch (error){
		console.log(error);
	}
}