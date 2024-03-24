import React, {Fragment} from 'react';
import { useForm } from 'react-hook-form';

const FormEditar = (props) => {

	const { register, handleSubmit, setValue, formState: { errors } } = useForm({
		defaultValues: props.currentUser
	});

	setValue('nombre', props.currentUser.nombre);
	setValue('apellido', props.currentUser.apellido);
	setValue('descripcion', props.currentUser.descripcion);

	const onSubmit = (data, evento) => {
		//console.log(data);

		props.editaUsuario(props.currentUser.id, data);
		
		evento.target.reset();//Esto solo limpia los campos mas no limpia el formData
	}

	return (
		<Fragment>
		<div>
			<h4>Formulario Editar</h4>
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

export default FormEditar;