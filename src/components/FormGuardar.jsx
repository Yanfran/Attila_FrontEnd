import React, {Fragment} from 'react';
import { useForm } from 'react-hook-form';

const FormGuardar = (props) => {

	const { register, handleSubmit, formState: { errors } } = useForm();

	const onSubmit = (data, evento) => {
		//console.log(data);

		props.nuevoUsuario(data);
		
		evento.target.reset();//Esto solo limpia los campos mas no limpia el formData
	}

	return (
		<Fragment>
		<div>
			<h4>Formulario Guardar</h4>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>Nombre</label>
				<input
		          name="nombre"
		          type="text"
		          className="form-control"
		          {...register("nombre", {
		            required: {value:true,message:'Requerido'},
		          })}
		        />

				{ errors.nombre &&  <div className="alert alert-danger" style={{marginTop: '10px'}}> {errors.nombre.message} </div>}


				<label className="mt-1">Apellido</label>
				<input
					type="text"
					name="apellido"
					className="form-control"
					{...register("apellido", {
			            required: {value:true,message:'Requerido'},
			        })}
				></input>

				{ errors.apellido &&  <div className="alert alert-danger" style={{marginTop: '10px'}}> {errors.apellido.message} </div>}

				<label className="mt-1">Descripción</label>
				<input
					type="text"
					name="descripcion"
					className="form-control"
					{...register("descripcion", {
			            required: {value:true,message:'Requerido'},
			        })}
				></input>

				{ errors.descripcion &&  <div className="alert alert-danger" style={{marginTop: '10px'}}> {errors.descripcion.message} </div>}

				<button type="submit" className="btn btn-primary btn-sm mt-2"

				>Guardar cambios</button>
			</form>
			</div>
		</Fragment>
	);
}

export default FormGuardar;