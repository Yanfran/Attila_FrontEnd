import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencilAlt,faTimes} from '@fortawesome/free-solid-svg-icons'; //Fas, Far
//import {faFacebook} from '@fortawesome/free-brands-svg-icons'; //Fab

import {useDispatch, useSelector} from 'react-redux';
import { consultaAccion } from '../redux/ejemploDucks';


const Tabla = (props) => {

	const dispatch = useDispatch();

	return (
		<div>

			<button className='btn btn-primary' style={{width: '100%', marginButton: '10px'}} onClick={
				() => dispatch(consultaAccion())
			}>Cargar</button>

			<table className="table">
			  <thead className="thead-dark">
			    <tr>
			      <th scope="col">#</th>
			      <th scope="col">Nombre</th>
			      <th scope="col">Apellido</th>
				  <th scope="col">Descripcion</th>
			      <th scope="col">Opciones</th>
			    </tr>
			  </thead>
			  <tbody>

			  {
			  	props.users.length > 0 ?
			  	props.users.map(user => (
					<tr key={user.id}>
				      <td>{user.id}</td>
				      <td>{user.nombre}</td>
				      <td>{user.apellido}</td>
					  <td>{user.descripcion}</td>
				      <td>
					      <button className="btn btn-primary btn-sm" style={{width: '30px'}}
					      	onClick={() => {props.editRow(user)}}
					      >
					      	<FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
					      </button>

					      <button className="btn btn-danger btn-sm ml-3" style={{width: '30px'}}
					      	onClick={() => {props.eliminarUsuario(user.id)}}
					      >
					      	<FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
					      </button>
				      </td>
				    </tr>
				)) : (
					<tr>
						<td colSpan={4} className='text-center'>No se encontraron resultados</td>
					</tr>
				)
			  }


			    
			    
			  </tbody>
			</table>
		</div>
	);
}

export default Tabla;