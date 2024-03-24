import { Container, Row, Col, Form, Button, FloatingLabel, Badge } from "react-bootstrap";
import "./ticketsdetails.css";
import { useState, useEffect  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { 
    ListarDetalle, 
    CrearRecepcion, 
    CrearDiagnostico, 
    CrearCotizacion, 
    CrearComentarios, 
    CrearEntrega,
    Entregado,
    NextEjecucion,
    NextCerrar,
    Ejecucion,
    RetornarEstatus,
    } 
from "../../services";
import { MsgCotizacion } from "../../services/bot";
import { format } from "date-fns";
// import initializeDataTable from '../../datatable';

function TicketsDetails() {  

  let navigate = useNavigate();

  const location = useLocation();
  const id_ticket = location.pathname.split("/").pop();

  const [status, setStatus] = useState("");
  // const [id_ticket, setId_ticket] = useState(location.pathname.split("/").pop());
  const [ticket, setTicket] = useState([]);
  const [recepcion, setRecepcion] = useState({ descripcion: "", detalle_recepcion: "", id_ticket: ""}); 
  const [diagnostico, setDiagnostico] = useState({ diagnostico: "", piezas: "", id_ticket: ""});  
  const [cotizacion, setCotizacion] = useState({ diagnostico: "", piezas: "", id_ticket: ""});  
  const [ejecucion, setEjecucion] = useState({ id: "", fecha: "", descripcion: "", costo: "", sugerencia: "", fecha_sugerencia: "", costo_sugerencia: "", id_ticket: "", status: ""});    
  const [entrega, setEntrega] = useState({ observacion: "" });  
  const [addComentario, setAddComentario] = useState({ descripcion: "" });  
  const [comentarios, setComentarios] = useState([]);
  // const [sede, setSede] = useState([]); 
  

  const actualizarStatus1 = (nuevoTicket) => {
    setTicket([nuevoTicket]);
  };

  const actualizarStatus2 = (nuevoTicket) => {
    setTicket([nuevoTicket]);
  };

  const actualizarStatus3 = (nuevoTicket) => {
    setTicket([nuevoTicket]);
  };

  const actualizarStatusNext = (nuevoTicket) => {
    setTicket([nuevoTicket]);
  };

  const actualizarStatus4 = (nuevoTicket) => {
    setTicket([nuevoTicket]);
  };

  const actualizarStatus5 = (nuevoTicket) => {
    setTicket([nuevoTicket]);
  };

  const actualizarStatus6 = (nuevoTicket) => {
    setTicket([nuevoTicket]);
  };
        

  useEffect(() => {

    const id = location.pathname.split("/").pop();    
    const fetchData = (id) => {
      const form = new FormData();
      form.append("id", id);
      ListarDetalle(form).then(function ({data}) {

        // console.log(data);        

        if (data) {          
          setTicket(data);   
          setStatus(data[0].status);    
          setRecepcion({ descripcion: data[1].descripcion, detalle_recepcion: data[1].detalle_recepcion, id_ticket: data[1].id_ticket });     
          setCotizacion({ descripcion: data[2].descripcion, diagnostico: data[2].diagnostico, piezas: data[2].piezas })              
          setEjecucion({ 
            id: data[3].id, 
            descripcion: data[3].descripcion, 
            fecha: data[3].fecha, 
            costo: data[0].cotizacion, 
            sugerencia: data[3].sugerencia, 
            fecha_sugerencia: data[3].fecha_sugerencia, 
            costo_sugerencia: data[3].costo_sugerencia,
            status: data[3].status
          })              

          if (data.comentarios) {
            setComentarios(data.comentarios);
          } else {            
            setComentarios([]);
          } 

        } else {
          alert("Ups error");
        }

        // initializeDataTable();
        
      }).catch((error) => {
        console.log(error);
      });    
    };    

    fetchData(id);    
    
    
    // const sedes = async () => {
    //   try {        
    //     const response = await ListarSedes();
    //     setSede(response.data);                  
    //     // setIsLoading(false);            
    //   } catch (error) {
    //     console.error("Error al obtener los datos:", error);
    //   }
    // };

    // sedes();

  }, []);


  const calcularDuracion = (dias) => {
    if (dias < 1) {
      return 'Menos de 1 día';
    } else if (dias === 1) {
      return '1 día';
    } else if (dias >= 2 && dias < 7) {
      return `${dias} días`;
    } else if (dias >= 7 && dias < 30) {
      const semanas = Math.floor(dias / 7);
      const diasRestantes = dias % 7;
      let resultado = '';
      if (semanas > 0) {
        resultado += `${semanas} semana${semanas > 1 ? 's' : ''}`;
      }
      if (diasRestantes > 0) {
        resultado += ` ${diasRestantes} día${diasRestantes > 1 ? 's' : ''}`;
      }
      return resultado.trim();
    } else {
      const meses = Math.floor(dias / 30);
      const diasRestantes = dias % 30;
      const semanas = Math.floor(diasRestantes / 7);
      const diasExtras = diasRestantes % 7;
      let resultado = '';
      if (meses > 0) {
        resultado += `${meses} mes${meses > 1 ? 'es' : ''}`;
      }
      if (semanas > 0) {
        resultado += ` ${semanas} semana${semanas > 1 ? 's' : ''}`;
      }
      if (diasExtras > 0) {
        resultado += ` ${diasExtras} día${diasExtras > 1 ? 's' : ''}`;
      }
      return resultado.trim();
    }
  };

  
  const ProcesarRecepcion = (e) => {
    e.preventDefault();    
    const form = new FormData();
    form.append("descripcion", recepcion.descripcion);
    form.append("detalle_recepcion", recepcion.detalle_recepcion);
    form.append("id", recepcion.id_ticket);      
          

    CrearRecepcion(form).then(function ({data}) {
      if (data) {                                                       
        setStatus("DIAGNOSTICO");        

        const codigo = ticket[0].codigo_cliente;
        const detalleRecepcion = recepcion.detalle_recepcion;
        
        const nuevoTicket = {
          codigo_cliente: ticket[0].codigo_cliente,
          telefono: ticket[0].telefono,
          nombre: ticket[0].nombre,
          fecha_apertura: ticket[0].fecha_apertura,
          fecha_cierre: ticket[0].fecha_cierre,
          fecha_entrega: ticket[0].fecha_entrega,
          tiempo_estimado: ticket[0].tiempo_estimado,
          cotizacion: ticket[0].cotizacion,
          status: "DIAGNOSTICO"
        };        
        actualizarStatus1(nuevoTicket);



        
        const mensaje = `Ticket "######".⌚ Hemos recibido tu reloj en las siguientes condiciones: 

“DDDD”

Realizaremos un diagnóstico más detallado. El tiempo estimado de entrega de diagnóstico es de 10 - 15 días hábiles. ⏳`;
                  
        const newData  = {
          destino: ticket[0].telefono,
          mensaje: mensaje.replace("######", codigo).replace("DDDD", detalleRecepcion)            
        };
      

        MsgCotizacion(newData ).then(function (response) {

          console.log("Respuesta del servidor:", response.data);          

        }).catch((error) => {
          console.log(error);
        });

        toast.success("Ticket procesado con exito !", {
          position: toast.POSITION.TOP_RIGHT
        });

      } else {
        alert("Ups error");
      }
    }).catch((error) => {
      console.log(error);
    });   

  };

  const GuardarDiagnostico = (e) => {
    e.preventDefault();   

    if (diagnostico.diagnostico === "" || diagnostico.piezas === "") {
      toast.error("Debe llenar todos los campos.", {
        position: toast.POSITION.TOP_RIGHT
      });  
      return;
    }    

    const form = new FormData();      
    form.append("descripcion", recepcion.descripcion);
    form.append("diagnostico", diagnostico.diagnostico);
    form.append("piezas", diagnostico.piezas);        
    form.append("id_ticket", id_ticket);           
    
    CrearDiagnostico(form).then(function ({data}) {
      if (data) {                
        setStatus("COTIZACION");        
        setCotizacion({ descripcion: recepcion.descripcion, diagnostico: diagnostico.diagnostico, piezas: diagnostico.piezas })              
        // Crea un nuevo objeto `row` con los nuevos valores
        const nuevoTicket = {
          codigo_cliente: ticket[0].codigo_cliente,
          telefono: ticket[0].telefono,
          nombre: ticket[0].nombre,
          fecha_apertura: ticket[0].fecha_apertura,
          fecha_cierre: ticket[0].fecha_cierre,
          fecha_entrega: ticket[0].fecha_entrega,
          tiempo_estimado: ticket[0].tiempo_estimado,
          cotizacion: ticket[0].cotizacion,
          status: "COTIZACION"
        };        
        actualizarStatus2(nuevoTicket);

        toast.success("Datos guardados con exito !", {
          position: toast.POSITION.TOP_RIGHT
        });

      } else {
        alert("Ups error");
      }
    }).catch((error) => {
      console.log(error);
    });   

  };

  const GuardarCotizacion = (e) => {
    e.preventDefault();   

    if (ejecucion.descripcion === "" || ejecucion.costo === "" || ejecucion.fecha === "") {
      toast.error("Debe llenar todos los campos.", {
        position: toast.POSITION.TOP_RIGHT
      });  
      return;
    }    

    const form = new FormData();      
    form.append("descripcion", ejecucion.descripcion);
    form.append("costo", ejecucion.costo);
    form.append("fecha", ejecucion.fecha);    
    form.append("sugerencia", ejecucion.sugerencia);
    form.append("costo_sugerencia", ejecucion.costo_sugerencia);
    form.append("fecha_sugerencia", ejecucion.fecha_sugerencia);    
    form.append("id_ticket", id_ticket);
    form.append("telefono", ticket[0].telefono);
    form.append("codigo_cliente", ticket[0].codigo_cliente);               
    
    CrearCotizacion(form).then(function({data}) {
      if (data && data.result) {                
        // setStatus("EJECUCION");        
        setEjecucion({ descripcion: ejecucion.descripcion, fecha: ejecucion.descripcion })   
                
        
        const ticket = data.data[0].codigo_cliente;
        const costoReparacion = data.data[0].cotizacion;
        const tiempoEstimado = data.data[0].tiempo_estimado;        
        
        
        const detalle =  `${ejecucion.descripcion}`;          

        const duracionEstimada = calcularDuracion(tiempoEstimado);


        const nuevoTicket = {
          codigo_cliente: ticket[0].codigo_cliente,
          telefono: ticket[0].telefono,
          nombre: ticket[0].nombre,
          fecha_apertura: ticket[0].fecha_apertura,
          fecha_cierre: ticket[0].fecha_cierre,
          fecha_entrega: ticket[0].fecha_entrega,
          tiempo_estimado: ejecucion.fecha,
          cotizacion: ejecucion.costo,
          // status: "EJECUCION"
        };        
        actualizarStatus3(nuevoTicket);

        // console.log(data.msg);   
                          
          const mensaje = `¡Hola, buen día! Nos complace compartir contigo la cotización generada para el ticket "#####". 

Detalle: "DDDD". El costo de reparación es de "$$$$" y el tiempo estimado aproximado para completarla es de "TTTT". 🔋⚙️🔍

¿Deseas proceder con la reparación?\n1.- Sí\n2.- No`;
                  
          const newData  = {
            destino: data.data[0].telefono,
            mensaje: mensaje
                    .replace("#####", ticket)
                    .replace("DDDD", detalle)
                    .replace("$$$$", "$"+costoReparacion)
                    .replace("TTTT", duracionEstimada )            
          };

          MsgCotizacion(newData ).then(function (response) {

            console.log("Respuesta del servidor:", response.data);
            // alert("Mensaje enviado");

          }).catch((error) => {
            console.log(error);
          });          


          navigate("/home");

        toast.success("Datos guardados con exito !", {
          position: toast.POSITION.TOP_RIGHT
        });

      } else {
        alert("Ups error");
      }
    }).catch((error) => {
      console.log(error);
    });   



  };

  const Siguiente = (e) => {
    e.preventDefault(); 
    const form = new FormData();          
    form.append("id_ticket", id_ticket); 
    form.append("telefono", ticket[0].telefono);     
    
    NextEjecucion(form).then(function({data}) {
      if (data && data.result) {
        console.log(data.data[0]);
        setStatus("EJECUCION");                          
        // setEjecucion({ descripcion: ejecucion.descripcion, fecha: ejecucion.descripcion })                   
        // const ticket = data.data[0].codigo_cliente;
        // const costoReparacion = data.data[0].cotizacion;
        // const tiempoEstimado = data.data[0].tiempo_estimado;

        const nuevoTicket = {
          codigo_cliente: ticket[0].codigo_cliente,
          telefono: ticket[0].telefono,
          nombre: ticket[0].nombre,
          fecha_apertura: ticket[0].fecha_apertura,
          fecha_cierre: ticket[0].fecha_cierre,
          fecha_entrega: ticket[0].fecha_entrega,
          tiempo_estimado: ejecucion.fecha,
          cotizacion: ejecucion.costo,
          status: "EJECUCION"
        };        
        actualizarStatusNext(nuevoTicket);
        
                          
          // const mensaje = "¡Hola, buen día! Nos complace compartir contigo la cotización generada para el ticket '#####'. El costo de reparación es de '$$$$' y el tiempo estimado aproximado para completarla es de 'TTTT' (Meses-Semanas-Días). ¿Deseas proceder con la reparación?\n1.- Si\n2.- No";                  
          // const newData  = {
          //   destino: data.data[0].telefono,
          //   mensaje: mensaje.replace("#####", ticket).replace("$$$$", "$"+costoReparacion).replace("TTTT", tiempoEstimado)            
          // };
          // MsgCotizacion(newData ).then(function (response) {
          //   console.log("Respuesta del servidor:", response.data);            
          // }).catch((error) => {
          //   console.log(error);
          // });          

          

        toast.success("Ejecución !", {
          position: toast.POSITION.TOP_RIGHT
        });

      } else {
        alert("Ups error");
      }
    }).catch((error) => {
      console.log(error);
    });   
  } 
  
  
  const CerrarTicket = (e) => {
    e.preventDefault(); 
    const form = new FormData();          
    form.append("id_ticket", id_ticket); 
    form.append("telefono", ticket[0].telefono);     
    
    NextCerrar(form).then(function({data}) {
      if (data && data.result) {
        // console.log(data.data[0]);
        setStatus("ENTREGADO");                                  

        const nuevoTicket = {
          codigo_cliente: ticket[0].codigo_cliente,
          telefono: ticket[0].telefono,
          nombre: ticket[0].nombre,
          fecha_apertura: ticket[0].fecha_apertura,
          fecha_cierre: ticket[0].fecha_cierre,
          fecha_entrega: ticket[0].fecha_entrega,
          tiempo_estimado: ejecucion.fecha,
          cotizacion: ejecucion.costo,
          status: "ENTREGADO"
        };        
        actualizarStatusNext(nuevoTicket);

        // URLGLOBAL
                          
        const mensaje = `Valoramos enormemente tu opinión, por eso nos encantaría que llenaras la siguiente encuesta de satisfacción.

http://187.188.105.205:8082/encuesta
        
Tu opinión es fundamental para nosotros, ya que nos ayuda a mejorar continuamente nuestra calidad de servicio. Agradecemos tu tiempo y tus comentarios, y te aseguramos que tomaremos en cuenta cada sugerencia para brindarte una mejor experiencia en el futuro. 
¡Gracias por elegirnos y contribuir a nuestro crecimiento!`;                  
        const newData  = {
          destino: ticket[0].telefono,
          mensaje: mensaje            
        };
        MsgCotizacion(newData ).then(function (response) {
          console.log("Respuesta del servidor:", response.data);            
        }).catch((error) => {
          console.log(error);
        });          

          

        toast.success("Ticket cerrado con éxito !", {
          position: toast.POSITION.TOP_RIGHT
        });

      } else {
        alert("Ups error");
      }
    }).catch((error) => {
      console.log(error);
    });   
  } 

  const handleAgregarTextArea = () => {    

    const form = new FormData();          
    form.append("id_ticket", id_ticket);           

    Ejecucion(form).then(function ({data}) {
      if (data) {                
        setStatus("ENTREGA");                
        const nuevoTicket = {
          codigo_cliente: ticket[0].codigo_cliente,
          telefono: ticket[0].telefono,
          nombre: ticket[0].nombre,
          fecha_apertura: ticket[0].fecha_apertura,
          fecha_cierre: ticket[0].fecha_cierre,
          fecha_entrega: ticket[0].fecha_entrega,
          tiempo_estimado: ticket[0].tiempo_estimado,
          cotizacion: ticket[0].cotizacion,
          status: "ENTREGA",
          observacion: "",
        };        
        actualizarStatus5(nuevoTicket);

        toast.success("Ejecucion procesada con exito !", {
          position: toast.POSITION.TOP_RIGHT
        });

      } else {
        alert("Ups error");
      }
    }).catch((error) => {
      console.log(error);
    });   
  };
  
  const GuardarComentarios = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("descripcion", addComentario.descripcion);
    form.append("id_ticket", id_ticket);
    form.append("id_ejecucion", ejecucion.id);    
  

    try {
      const { data } = await CrearComentarios(form);

      if (data) {     

        
        const fechaActual = new Date();         

        setComentarios([...comentarios, { descripcion: addComentario.descripcion, fecha: formatHora(fechaActual)  }]);

        setAddComentario({ descripcion: "" });

        toast.success("Comentario agregado con exito !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        alert("Ups error");
      }
    } catch (error) {
      console.log(error);
    }

  };

  const GuardarEntrega = (e) => {
    e.preventDefault();           

    if (entrega.observacion === "") {
      toast.error("Debe agregar una observacion.", {
        position: toast.POSITION.TOP_RIGHT
      });  
      return;
    }     

    const form = new FormData();      
    form.append("observacion", entrega.observacion);                 
    form.append("id_ticket", id_ticket);           

    CrearEntrega(form).then(function ({data}) {
      if (data) {                
        const observacionGenerada =  `${entrega.observacion}`; 
        const ticketObsercacion = ticket[0].codigo_cliente;         

        const nuevoTicket = {
          codigo_cliente: ticket[0].codigo_cliente,
          telefono: ticket[0].telefono,
          nombre: ticket[0].nombre,
          fecha_apertura: ticket[0].fecha_apertura,
          fecha_cierre: ticket[0].fecha_cierre,
          fecha_entrega: ticket[0].fecha_entrega,
          tiempo_estimado: ticket[0].tiempo_estimado,
          cotizacion: ticket[0].cotizacion,
          status: "ENTREGA",
          observacion: entrega.observacion,
        };        
        actualizarStatus4(nuevoTicket);

        const mensaje = `¡Excelentes noticias! 🥳🤩
Nos complace informarte que en relación al ticket “#####”, se encuentra lista la pieza. A continuación, te proporcionamos la siguiente información para su entrega:
“OOOO”`;
                          
        const newData  = {
          destino: ticket[0].telefono,
          mensaje: mensaje
                  .replace("#####", ticketObsercacion)
                  .replace("OOOO", observacionGenerada)                            
        };

        MsgCotizacion(newData ).then(function (response) {

          console.log("Respuesta del servidor:", response.data);
          // alert("Mensaje enviado");

        }).catch((error) => {
          console.log(error);
        });     

        toast.success("Observación creada con éxito! ", {
          position: toast.POSITION.TOP_RIGHT
        });

        

      } else {
        alert("Ups error");
      }
    }).catch((error) => {
      console.log(error);
    });   

  };

  // const Entrega = (e) => {
  //   e.preventDefault();        
    
  //   const form = new FormData();          
  //   form.append("id_ticket", id_ticket);
    

  //   Entregado(form).then(function ({data}) {
  //     if (data) {                
  //       setStatus("ENTREGADO");        
  //       // setAddComentario({ descripcion: addComentario.descripcion })                              

  //       const nuevoTicket = {
  //         telefono: ticket[0].telefono,
  //         cliente: ticket[0].cliente,
  //         fecha_apertura: ticket[0].fecha_apertura,
  //         fecha_cierre: ticket[0].fecha_cierre,
  //         fecha_entrega: ticket[0].fecha_entrega,
  //         tiempo_estimado: ticket[0].tiempo_estimado,
  //         cotizacion: ticket[0].cotizacion,
  //         status: "ENTREGADO"
  //       };        
  //       actualizarStatus5(nuevoTicket);



  //       const mensaje = "Hola 👋, le notificamos que su ticket 🎫 ha sido entregado con exito!";
                  
  //       const newData  = {
  //         destino: ticket[0].telefono,
  //         mensaje: mensaje            
  //       };

  //       MsgCotizacion(newData ).then(function (response) {

  //         console.log("Respuesta del servidor:", response.data);
  //         // alert("Mensaje enviado");

  //       }).catch((error) => {
  //         console.log(error);
  //       });          


  //       toast.success("Entregado con éxito ! ", {
  //         position: toast.POSITION.TOP_RIGHT
  //       });

  //     } else {
  //       alert("Ups error");
  //     }
  //   }).catch((error) => {
  //     console.log(error);
  //   });   

  // };

  const RetornarRecepcion = (e) => {
    e.preventDefault();        
    
    const form = new FormData();          
    form.append("id_ticket", id_ticket);
    

    RetornarEstatus(form).then(function ({data}) {
      if (data) {                
        setStatus("RECEPCION");        
        // setAddComentario({ descripcion: addComentario.descripcion })                              

        const nuevoTicket = {
          telefono: ticket[0].telefono,
          nombre: ticket[0].nombre,
          fecha_apertura: '',
          fecha_cierre: '',
          fecha_entrega: '',
          tiempo_estimado: '',
          cotizacion: '',
          status: "RECEPCION"
        };        
        actualizarStatus6(nuevoTicket);



        const mensaje = "Hola 👋, le notificamos que su ticket 🎫 ha pasado de estatus cancelado a recepción.";
                  
        const newData  = {
          destino: ticket[0].telefono,
          mensaje: mensaje            
        };

        MsgCotizacion(newData ).then(function (response) {

          // console.log("Respuesta del servidor:", response.data);
          // // alert("Mensaje enviado");

        }).catch((error) => {
          console.log(error);
        });          


        toast.success("Entregado con éxito ! ", {
          position: toast.POSITION.TOP_RIGHT
        });

      } else {
        alert("Ups error");
      }
    }).catch((error) => {
      console.log(error);
    });   

  };
  
  const showTable = () => {  

    if (ticket.length === 0) {
      return null; // Si no hay elementos en el arreglo, no se muestra nada
    }
    
      const row = {
        codigo_cliente: ticket[0].codigo_cliente,
        telefono: ticket[0].telefono,
        nombre: ticket[0].nombre,
        fecha_apertura: ticket[0].fecha_apertura,
        fecha_cierre: ticket[0].fecha_cierre,
        entrega: ticket[0].entrega,
        tiempo_estimado: ticket[0].tiempo_estimado,
        cotizacion: ticket[0].cotizacion,
        status: ticket[0].status
      };

      return (
        <tr>
          <td className="text-xs">{row.codigo_cliente}</td>
          <td className="text-xs">{row.telefono}</td>
          <td className="text-xs">{row.nombre}</td>
          <td className="text-xs text-center">{row.fecha_apertura}</td>          
          <td className="text-xs text-center">{row.entrega}</td>
          <td className="text-xs text-center">{row.tiempo_estimado}</td>
          <td className="text-xs text-center">{row.cotizacion ? `$${row.cotizacion}`: ''}</td>          
          <td className="text-xs">
          {row.status === "RECEPCION" ? (
              <Badge pill bg="primary">
                {row.status}
              </Badge>
            ) : row.status === "DIAGNOSTICO" ? (
              <Badge pill bg="secondary">
                {row.status}
              </Badge>
            ) : row.status === "COTIZACION" ? (
              <Badge pill bg="warning">
                {row.status}
              </Badge>
            ) : row.status === "EJECUCION" ? (
              <Badge pill bg="info">
                {row.status}
              </Badge>
            ) : row.status === "PENDIENTE" ? (
              <Badge pill bg="dark">
                {row.status}
              </Badge>
            ) : row.status === "CANCELADO" ? (
                <Badge pill bg="danger">
                  {row.status}
                </Badge>
            ) : row.status === "ENTREGA" ? (
                  <Badge pill bg="dark">
                    {row.status}
                  </Badge>
            ) : (
              <Badge pill bg="success">
                {row.status}
              </Badge>
            )}

          </td>
          <td></td>
        </tr>
      );      
  };  

  const formatHora = (fecha) => {
    return format(new Date(fecha), 'yyyy-MM-dd h:mm a');
  };

  const renderContent = () => {
    if (status === "RECEPCION") {
      return (
        <div className="mt-5">
          <Form onSubmit={ProcesarRecepcion} className="form">
            <Form.Control type="hidden" name="id_ticket" value={recepcion.id_ticket} />            
            <h5>Problema del usuario</h5>
            <FloatingLabel controlId="floatingTextarea2" label="">
              <Form.Control
                readOnly 
                disabled
                className="textarea-save"
                as="textarea"                
                value={recepcion.descripcion}
                name="descripcion"
                onChange={(e) => setRecepcion({...recepcion, [e.target.name]: e.target.value})}                                
                style={{ height: "100px" }}
              />
            </FloatingLabel>

            <h5 className="mt-4">Detalle de recepción</h5>            
            <FloatingLabel controlId="floatingTextarea2" label="">
              <Form.Control                
                className="textarea-save"
                as="textarea"
                value={recepcion.detalle_recepcion}
                name="detalle_recepcion"
                onChange={(e) => setRecepcion({...recepcion, [e.target.name]: e.target.value})}                                
                style={{ height: "100px" }}
              />
            </FloatingLabel>

            <div className="mt-3">
              <Button className="save pull-right" variant="primary" type="submit">
                GUARDAR
              </Button>{" "}
            </div>
          </Form>
        </div>
      );
    } else if (status === "DIAGNOSTICO") {
      return (
        <div className="mt-5">
          <Form onSubmit={GuardarDiagnostico} className="form">   
            <Form.Control type="hidden" name="id_ticket" value={id_ticket} />         
            <h5>Problema de usuario</h5>          
            <FloatingLabel controlId="floatingTextarea2" label="">
              <Form.Control
                readOnly
                disabled
                className="textarea-save"
                as="textarea"
                value={recepcion.descripcion}   
                name="descripcion"                
                style={{ height: "100px" }}
              />
            </FloatingLabel>

            <h5 className="mt-4">Detalle de recepción</h5>          
            <FloatingLabel controlId="floatingTextarea2" label="">
              <Form.Control
                readOnly
                disabled
                className="textarea-save"
                as="textarea"
                value={recepcion.detalle_recepcion}   
                name="detalle_recepcion"                
                style={{ height: "100px" }}
              />
            </FloatingLabel>

            <h5 className="mt-4">Diagnóstico</h5>
            <FloatingLabel controlId="floatingTextarea3" label="">
              <Form.Control
                className="textarea-save"
                as="textarea"
                value={diagnostico.diagnostico}
                name="diagnostico"
                onChange={(e) => setDiagnostico({...diagnostico, [e.target.name]: e.target.value})}                
                style={{ height: "100px" }}
              />
            </FloatingLabel>

            <h5 className="mt-4">Piezas</h5>
            <FloatingLabel controlId="floatingTextarea4" label="">
              <Form.Control
                className="textarea-save"
                as="textarea"
                value={diagnostico.piezas}
                name="piezas"
                onChange={(e) => setDiagnostico({...diagnostico, [e.target.name]: e.target.value})}                
                style={{ height: "100px" }}
              />
            </FloatingLabel>

            <div className="mt-3">
              <Button className="save pull-right" variant="primary" type="submit">
                GUARDAR
              </Button>{" "}
            </div>
          </Form>
        </div>
      );
    } else if (status === "COTIZACION") {
      return (
        <div className="mt-5">
          <Form onSubmit={GuardarCotizacion} className="form">
          <h5>Problemas de usuario</h5>
            <Form.Control type="hidden" name="id_ticket" value={id_ticket} />
            <FloatingLabel controlId="floatingTextarea2" label="">
              <Form.Control
                readOnly
                disabled
                className="textarea-save"
                as="textarea"
                value={recepcion.descripcion}   
                name="descripcion"          
                style={{ height: "100px" }}
              />
            </FloatingLabel>

            <h5 className="mt-4">Detalle de recepción</h5>          
            <FloatingLabel controlId="floatingTextarea2" label="">
              <Form.Control
                readOnly
                disabled
                className="textarea-save"
                as="textarea"
                value={recepcion.detalle_recepcion}   
                name="detalle_recepcion"                
                style={{ height: "100px" }}
              />
            </FloatingLabel>

            <h5 className="mt-4">Diagnóstico</h5>
            <FloatingLabel controlId="floatingTextarea3" label="">
              <Form.Control
                readOnly
                disabled
                className="textarea-save"
                as="textarea"
                value={cotizacion.diagnostico}   
                name="diagnostico" 
                style={{ height: "100px" }}
              />
            </FloatingLabel>

            <h5 className="mt-4">Piezas</h5>
            <FloatingLabel controlId="floatingTextarea4" label="">
              <Form.Control
                readOnly
                disabled
                className="textarea-save"
                as="textarea"
                value={cotizacion.piezas}   
                name="piezas" 
                style={{ height: "100px" }}
              />
            </FloatingLabel>

            <h5 className="mt-4">Mensaje al usuario</h5>
            <FloatingLabel controlId="floatingTextarea5" label="">
              <Form.Control
                className="textarea-save"
                as="textarea"
                value={ejecucion.descripcion}
                name="descripcion"
                onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}                
                style={{ height: "100px" }}  
                disabled={ejecucion.status === "1"}
                readOnly={ejecucion.status === "1"}                   
              />
            </FloatingLabel>
           
            <h5 className="mt-4">Tiempo de reparación</h5>
            <Row className="mt-5">
              <Col xs={12} md={6} lg={6}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Tiempo de Reparación (días)"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"                    
                    value={ejecucion.fecha}
                    name="fecha"
                    maxLength={20}
                    onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}                        
                    onKeyPress={(e) => {
                      const charCode = e.which ? e.which : e.keyCode;
                      if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                        e.preventDefault();
                      }
                    }}     
                    disabled={ejecucion.status === "1"}
                    readOnly={ejecucion.status === "1"}                    
                  />
                </FloatingLabel>
              </Col>
              <Col xs={12} md={6} lg={6}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Coste ($)"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"                    
                    value={ejecucion.costo}
                    name="costo"
                    maxLength={10}                  
                    onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}    
                    onKeyPress={(e) => {
                      const charCode = e.which ? e.which : e.keyCode;
                      if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                        e.preventDefault();
                      }
                    }} 
                    disabled={ejecucion.status === "1"}
                    readOnly={ejecucion.status === "1"}                        
                  />
                </FloatingLabel>
              </Col>

              <h5 className="mt-4">Sugerencia</h5>
              <FloatingLabel controlId="floatingTextarea6" label="">
                <Form.Control                  
                  className="textarea-save"
                  as="textarea"
                  value={ejecucion.sugerencia}   
                  name="sugerencia" 
                  onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}                        
                  style={{ height: "100px" }}   
                  disabled={ejecucion.status === "1"}
                  readOnly={ejecucion.status === "1"}                    
                />
              </FloatingLabel>

              <Col xs={12} md={6} lg={6}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Tiempo de Reparación (días)"
                  className="mb-3 mt-4"
                >
                  <Form.Control
                    type="text"                    
                    value={ejecucion.fecha_sugerencia}
                    name="fecha_sugerencia"
                    maxLength={20}
                    onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}                        
                    onKeyPress={(e) => {
                      const charCode = e.which ? e.which : e.keyCode;
                      if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                        e.preventDefault();
                      }
                    }}  
                    disabled={ejecucion.status === "1"}
                    readOnly={ejecucion.status === "1"}                       
                  />
                </FloatingLabel>
              </Col>
              <Col xs={12} md={6} lg={6}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Coste ($)"
                  className="mb-3 mt-4"
                >
                  <Form.Control
                    type="text"                    
                    value={ejecucion.costo_sugerencia}
                    name="costo_sugerencia"
                    maxLength={10}
                    onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}    
                    onKeyPress={(e) => {
                      const charCode = e.which ? e.which : e.keyCode;
                      if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                        e.preventDefault();
                      }
                    }}   
                    disabled={ejecucion.status === "1"}
                    readOnly={ejecucion.status === "1"}                      
                  />
                </FloatingLabel>
              </Col>

            </Row>
            
            <div className="mt-3">
              {ejecucion.status === "1" &&  (
                <Button className="save pull-right ml-3" variant="primary" type="buttom" onClick={Siguiente}>
                  SIGUIENTE
                </Button>
              )}
              
              {ejecucion.status !== "1" &&  (
                <Button className="save pull-right" variant="primary" type="submit">
                  ENVIAR COTIZACIÓN Y GUARDAR
                </Button>
              )}


            </div>
          </Form>
        </div>
      );
    } else if (status === "EJECUCION") {
      return (
        <div className="mt-5">
          <Col md="{12}">
              <h5 className="mt-4">Problema del usuario</h5>                
              <FloatingLabel controlId="floatingTextarea2" label="">
                <Form.Control
                  readOnly
                  disabled
                  className="textarea-save"
                  as="textarea"
                  value={recepcion.descripcion}   
                  name="descripcion"          
                  style={{ height: "100px" }}
                />
              </FloatingLabel>

              <h5 className="mt-4">Diagnóstico</h5>
              <FloatingLabel controlId="floatingTextarea3" label="">
                <Form.Control
                  readOnly
                  disabled
                  className="textarea-save"
                  as="textarea"
                  value={cotizacion.diagnostico}   
                  name="diagnostico" 
                  style={{ height: "100px" }}
                />
              </FloatingLabel>

              <h5 className="mt-4">Piezas</h5>
              <FloatingLabel controlId="floatingTextarea4" label="">
                <Form.Control
                  readOnly
                  disabled
                  className="textarea-save"
                  as="textarea"
                  value={cotizacion.piezas}   
                  name="piezas" 
                  style={{ height: "100px" }}
                />
              </FloatingLabel>

              <h5 className="mt-4">Mensaje al usuario</h5>
              <FloatingLabel controlId="floatingTextarea3" label="">
                <Form.Control
                  readOnly
                  disabled
                  className="textarea-save"
                  as="textarea"
                  value={ejecucion.descripcion}
                  name="descripcion"
                  onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}                
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            
              <h5 className="mt-4">Tiempo de reparación</h5>
              <Row className="mt-5">
                <Col xs={12} md={6} lg={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Tiempo de Reparación (días)"
                    className="mb-3"
                  >
                    <Form.Control
                      readOnly
                      disabled
                      type="text"                    
                      value={ejecucion.fecha}
                      name="fecha"
                      onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}                        
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </FloatingLabel>
                </Col>
                <Col xs={12} md={6} lg={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Coste ($)"
                    className="mb-3"
                  >
                    <Form.Control
                      readOnly
                      disabled
                      type="text"                    
                      value={ejecucion.costo}
                      name="costo"
                      onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}    
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </FloatingLabel>
                </Col>

                <h5 className="mt-4">Sugerencia <b>"{ticket[0].sugerencia}"</b> </h5>
                <FloatingLabel controlId="floatingTextarea3" label="">
                  <Form.Control       
                    readOnly
                    disabled           
                    className="textarea-save"
                    as="textarea"
                    value={ejecucion.sugerencia}   
                    name="sugerencia" 
                    onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}                        
                    style={{ height: "100px" }}
                  />
                </FloatingLabel>

                <Col xs={12} md={6} lg={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Tiempo de Reparación (días)"
                    className="mb-3 mt-4"
                  >
                    <Form.Control
                      readOnly
                      disabled
                      type="text"                    
                      value={ejecucion.fecha_sugerencia}
                      name="fecha_sugerencia"
                      onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}                        
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </FloatingLabel>
                </Col>
                <Col xs={12} md={6} lg={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Coste ($)"
                    className="mb-3 mt-4"
                  >
                    <Form.Control
                      readOnly
                      disabled
                      type="text"                    
                      value={ejecucion.costo_sugerencia}
                      name="costo_sugerencia"
                      onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}    
                      onKeyPress={(e) => {
                        const charCode = e.which ? e.which : e.keyCode;
                        if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </FloatingLabel>
                </Col>

              </Row>
                            
          </Col>

          <br />
          <br />
          <hr />          
          {/* <h5 className="mt-4">Mensaje al usuario</h5> */}

          <Form onSubmit={GuardarComentarios} className="">            
            {/* <FloatingLabel controlId="floatingTextarea4" label="">
              <Form.Control
                disabled
                readOnly
                className="textarea-save"
                as="textarea"
                value={ejecucion.descripcion}
                style={{ height: "100px" }}
              />
            </FloatingLabel> */}

            {comentarios && Array.isArray(comentarios) && comentarios.length > 0 ? (
              comentarios.map((comentario, index) => (
                <div className="mt-4" key={index}>
                  <h5 className="mt-4">#{index + 2} Ejecución { formatHora(comentario.fecha) } </h5>
                  <FloatingLabel controlId={`floatingTextarea${index}`} label="">
                    <Form.Control
                      className="textarea-save"
                      as="textarea"
                      value={comentario.descripcion}
                      name={`descripcion${index}`}
                      style={{ height: "100px" }}
                      disabled
                      readOnly
                    />
                  </FloatingLabel>
                </div>
              ))
            ) : (
              <p></p>
            )}

            <h5 className="mt-4">Nueva ejecución</h5>
            <FloatingLabel controlId="floatingTextarea4" label="">
              <Form.Control
                className="textarea-save"
                as="textarea"
                value={addComentario.descripcion}
                name="descripcion"
                onChange={(e) => setAddComentario({...addComentario, [e.target.name]: e.target.value})}                
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          
          
                

              <Row className="mt-5">
                <Col xs={12} md={6} lg={6}>              
                </Col>                                
                <Col xs={12} md={4} lg={4}> 
                    
                      <Button
                        className="save ml-5"
                        variant="primary"
                        type="submit"                
                      >
                        AGREGAR COMENTARIO
                      </Button>{" "}                                                                                                             

                </Col>

                <Col xs={12} md={2} lg={2}>
                      <Button 
                        className="save" 
                        variant="primary"                 
                        type="button"
                        onClick={handleAgregarTextArea}
                      >
                        GUARDAR
                      </Button>{" "} 
                </Col>
              </Row>   


          </Form>          

        </div>
      );
    } else if (status === "ENTREGA") {
      return (
        <div className="mt-5">          
            <Form onSubmit={GuardarEntrega} className="form">
            <Row className="mt-1">
             
              <Col xs={12} md={10} lg={10}>
              </Col>
              <Col xs={12} md={2} lg={2}>
                <div className={(ticket[0].observacion !== '' ? 'd-block' : 'd-none')}>                
                  <Button className="save pull-right" variant="danger" onClick={CerrarTicket}>
                    CERRAR
                  </Button>{" "}
                </div>         
              </Col>

              <Col xs={12} md={12} lg={12}>              

              {ticket[0].observacion === '' ? (
                <>
                 <h5 className="mt-4">Observaciones</h5>
                 <FloatingLabel controlId="floatingTextarea3" label="">
                   <Form.Control                  
                     className="textarea-save"
                     as="textarea"
                     value={entrega.observacion}   
                     name="observacion" 
                     onChange={(e) => setEntrega({...entrega, [e.target.name]: e.target.value})}                                  
                     style={{ height: "100px" }}
                   />
                 </FloatingLabel>
                </>
              ) : (
                <>
                <h5 className="mt-4">Observaciones</h5>
                  <FloatingLabel controlId="floatingTextarea3" label="">
                    <Form.Control                  
                      readOnly
                      disabled
                      className="textarea-save"
                      as="textarea"
                      value={ticket[0].observacion}   
                      name="observacion" 
                      onChange={(e) => setEntrega({...entrega, [e.target.name]: e.target.value})}                                  
                      style={{ height: "100px" }}
                    />
                  </FloatingLabel>
                </>
              )}

             


              </Col>
            </Row>
              { ticket[0].observacion === '' ? (
                <div className="mt-5">
                  <Button className="save pull-right" variant="primary" type="submit">
                    GUARDAR
                  </Button>{" "}
                </div>
              ) : (
                <p></p>
              )}
          </Form>
        </div>
      );
    // } else if (status === "PENDIENTE") {
    // return (
    //   <div>
    //     <Container className="px-4">
    //       <Row className="justify-content-md-center">
    //         <Col xs lg="2">              
    //         </Col>
    //         <Col md="auto"> 

    //             <h1>Pendiente por entregar</h1>
    //             <div className="text-center mt-5">
    //               <Button  onClick={Entrega} className="save" variant="primary" type="submit">
    //                 RELOJ ENTREGADO
    //               </Button>{" "}
    //             </div>
              
    //         </Col>
    //         <Col xs lg="2">              
    //         </Col>
    //       </Row>                  
    //     </Container>
    //   </div>
    // );
    } else if (status === "ENTREGADO") {
      return (
        <div>
          <Container className="px-4">
            <Row className="justify-content-md-center">
              <Col xs lg="2">              
              </Col>
              <Col md="auto"> 
                  <h1>Reloj entregado</h1>                                
              </Col>
              <Col xs lg="2">              
              </Col>

              <Col md="{12}">
                  <h5 className="mt-4">Problema del usuario</h5>                
                  <FloatingLabel controlId="floatingTextarea2" label="">
                    <Form.Control
                      readOnly
                      disabled
                      className="textarea-save"
                      as="textarea"
                      value={ejecucion.descripcion}   
                      name="descripcion"          
                      style={{ height: "100px" }}
                    />
                  </FloatingLabel>

                  <h5 className="mt-4">Diagnóstico</h5>
                  <FloatingLabel controlId="floatingTextarea3" label="">
                    <Form.Control
                      readOnly
                      disabled
                      className="textarea-save"
                      as="textarea"
                      value={cotizacion.diagnostico}   
                      name="diagnostico" 
                      style={{ height: "100px" }}
                    />
                  </FloatingLabel>

                  <h5 className="mt-4">Piezas</h5>
                  <FloatingLabel controlId="floatingTextarea4" label="">
                    <Form.Control
                      readOnly
                      disabled
                      className="textarea-save"
                      as="textarea"
                      value={cotizacion.piezas}   
                      name="piezas" 
                      style={{ height: "100px" }}
                    />
                  </FloatingLabel>

                  <h5 className="mt-4">Mensaje al usuario</h5>
                  <FloatingLabel controlId="floatingTextarea3" label="">
                    <Form.Control
                      readOnly
                      disabled
                      className="textarea-save"
                      as="textarea"
                      value={ejecucion.descripcion}
                      name="descripcion"
                      onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}                
                      style={{ height: "100px" }}
                    />
                  </FloatingLabel>
                
                  <h5 className="mt-4">Tiempo de reparación</h5>
                  <Row className="mt-5">
                    <Col xs={12} md={6} lg={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Tiempo de Reparación (días)"
                        className="mb-3"
                      >
                        <Form.Control
                          readOnly
                          disabled
                          type="text"                    
                          value={ejecucion.fecha}
                          name="fecha"
                          onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}                        
                          onKeyPress={(e) => {
                            const charCode = e.which ? e.which : e.keyCode;
                            if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Coste ($)"
                        className="mb-3"
                      >
                        <Form.Control
                          readOnly
                          disabled
                          type="text"                    
                          value={ejecucion.costo}
                          name="costo"
                          onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}    
                          onKeyPress={(e) => {
                            const charCode = e.which ? e.which : e.keyCode;
                            if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </FloatingLabel>
                    </Col>

                    <h5 className="mt-4">Sugerencia <b>"{ticket[0].sugerencia}"</b> </h5>
                    <FloatingLabel controlId="floatingTextarea3" label="">
                      <Form.Control       
                        readOnly
                        disabled           
                        className="textarea-save"
                        as="textarea"
                        value={ejecucion.sugerencia}   
                        name="sugerencia" 
                        onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}                        
                        style={{ height: "100px" }}
                      />
                    </FloatingLabel>

                    <Col xs={12} md={6} lg={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Tiempo de Reparación (días)"
                        className="mb-3 mt-4"
                      >
                        <Form.Control
                          readOnly
                          disabled
                          type="text"                    
                          value={ejecucion.fecha_sugerencia}
                          name="fecha_sugerencia"
                          onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}                        
                          onKeyPress={(e) => {
                            const charCode = e.which ? e.which : e.keyCode;
                            if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Coste ($)"
                        className="mb-3 mt-4"
                      >
                        <Form.Control
                          readOnly
                          disabled
                          type="text"                    
                          value={ejecucion.costo_sugerencia}
                          name="costo_sugerencia"
                          onChange={(e) => setEjecucion({...ejecucion, [e.target.name]: e.target.value})}    
                          onKeyPress={(e) => {
                            const charCode = e.which ? e.which : e.keyCode;
                            if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </FloatingLabel>
                    </Col>

                  </Row>
                                
              </Col>

            </Row>                  
          </Container>
        </div>
      );
    } else if (status === "CANCELADO") {
      return (
        <div>
          <Container className="px-4">
            <Row className="justify-content-md-center">
              <Col xs lg="2">              
              </Col>
              <Col md="auto"> 
  
                  <h1>Ticket cancelado</h1>
                  <div className="text-center mt-5">
                    <Button  onClick={RetornarRecepcion} className="save" variant="primary" type="submit">                    
                      RETORNAR A RECEPCION
                    </Button>{" "}
                  </div>
                
              </Col>
              <Col xs lg="2">              
              </Col>
            </Row>                  
          </Container>
        </div>
      );
    } 
    return null;
  };

  return (
    <>
      <div className="detailTickets">
        <Container className="px-4">
          <Row className="mt-5">
            <Col xs={12} md={10} lg={10}>
              <h2 className="mt-4">TICKET #{ id_ticket }</h2>
            </Col>
            <Col xs={12} md={2} lg={2}></Col>
            <div className="container-fluid py-4">
              <div className="table-responsive p-0 pb-2">
                <table
                  id="myTable"
                  className="table align-items-center stripe cell-borde compact justify-content-center mb-0"
                >
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        N0.
                      </th>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Teléfono
                      </th>
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Cliente
                      </th>
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Fecha Apertura
                      </th>                      
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">                        
                        Tipo de Entrega
                      </th>
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Estimación (días)
                      </th>
                      <th className="text-uppercase text-center text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Cotización ($)
                      </th>              
                      <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                        Estatus
                      </th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody className="">{showTable()}</tbody>
                </table>
              </div>
            </div>
          </Row>
        </Container>
      </div>
      <div className="detailTicketsTrouble">
        <Container className="px-4">
          <Row className="mt-5">
            <Col xs={12} md={12} lg={12}>

            {status !== "PENDIENTE" && status !== "ENTREGADO" &&  (
              <div className="estatus-lineales">
                <div
                  className={`btn-link-fill ${
                    status === "RECEPCION" ? "activo" : ""
                  }`}
                >
                  01 RECEPCIÓN
                </div>
                <div
                  className={`btn-link-fill ${
                    status === "DIAGNOSTICO" ? "activo" : ""
                  }`}
                >
                  02 DIAGNÓSTICO
                </div>
                <div
                  className={`btn-link-fill ${
                    status === "COTIZACION" ? "activo" : ""
                  }`}
                >
                  03 COTIZACIÓN
                </div>
                <div
                  className={`btn-link-fill ${
                    status === "EJECUCION" ? "activo" : ""
                  }`}
                >
                  04 EJECUCIÓN
                </div>
                <div
                  className={`btn-link-fill ${
                    status === "ENTREGA" ? "activo" : ""
                  }`}
                >
                  05 ENTREGA
                </div>
              </div>
            )}

              <div>{renderContent()}</div>
            </Col>
            {/* <hr className="linea-vertical"/> */}
            {/* <Col xs={12} md={4} lg={4}>
              <h5>Diagnóstico</h5>
              <p>Alberto Guzmán</p>

              <h5>Cotización</h5>
              <p>Mario Sepúlveda Hernández</p>
            </Col> */}
          </Row>
        </Container>
        <ToastContainer />
      </div>
    </>
  );
}
export default TicketsDetails;
