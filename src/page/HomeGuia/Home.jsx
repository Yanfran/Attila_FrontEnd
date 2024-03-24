import React, { useState, useEffect } from "react";
import Tabla from "../../components/Tabla";
import FormGuardar from "../../components/FormGuardar";
import FormEditar from "../../components/FormEditar";
import { Listar, Guardar, Editar, Delete } from "../../services";
import { Provider } from "react-redux";
import generateStore from "../../redux/store";

const Home = () => {
  const usersData = [
    /*{id: uuidv4(), nombre: 'Jorge', apellido: 'Vargas'},
        {id: uuidv4(), nombre: 'Jesus', apellido: 'Salazar'},
        {id: uuidv4(), nombre: 'Ronny', apellido: 'Laya'}*/
  ];
  const store = generateStore();
  const [users, setUsers] = useState(usersData);
  //Esta funcion podria servirnos para realizar una llamada api dentro, ya que se ejecuta al cargar la pagina
  useEffect(() => {
    consultar();
  }, []); //este corchete vacio indica que lo que esta dentro se ejecutara una sola vez
  const consultar = () => {
    Listar()
      .then(function (response) {
        const resultado = response.data;
        setUsers(resultado);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Agregar
  const nuevoUsuario = (user) => {
    const form = new FormData();
    form.append("nombre", user.nombre);
    form.append("apellido", user.apellido);
    form.append("descripcion", user.descripcion);

    Guardar(form)
      .then(function (response) {
        if (response.data.result) {
          let id = response.data.id;

          user.id = id;
          setUsers([...users, user]);
        } else {
          alert("No pudo ser guardado");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Eliminar usuarios
  const eliminarUsuario = (id) => {
    const form = new FormData();
    form.append("id", id);

    Delete(form)
      .then(function (response) {
        if (response.data.result) {
          const filtrado = users.filter((user) => user.id !== id);
          setUsers(filtrado);
        } else {
          alert("No pudo ser guardado");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Editar usuario
  const [editing, setEditing] = useState(false); //Esta variable se usa solo para visualizar el formulario que corresponde

  const [currentUser, setcurrentUser] = useState({
    id: null,
    nombre: "",
    apellido: "",
    descripcion: "",
  });

  const editRow = (user) => {
    setEditing(true);
    setcurrentUser({
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      descripcion: user.descripcion,
    });
  };

  const editaUsuario = (id, data) => {
    const form = new FormData();
    form.append("id", data.id);
    form.append("nombre", data.nombre);
    form.append("apellido", data.apellido);
    form.append("descripcion", data.descripcion);

    Editar(form)
      .then(function (response) {
        if (response.data.result) {
          setEditing(false);
          setUsers(users.map((user) => (user.id === id ? data : user)));
        } else {
          alert("No pudo ser guardado");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Provider store={store}>
      <div className="">
        <div className="row mt-5">
          <div className="col-md-5">
            {editing ? (
              <FormEditar
                currentUser={currentUser}
                editaUsuario={editaUsuario}
              ></FormEditar>
            ) : (
              <FormGuardar nuevoUsuario={nuevoUsuario}></FormGuardar>
            )}
          </div>
          <div className="col-md-7">
            <Tabla
              users={users}
              eliminarUsuario={eliminarUsuario}
              editRow={editRow}
            ></Tabla>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default Home;
