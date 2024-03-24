import React, { Fragment, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  let history = useNavigate();
  const [data, setData] = useState({
      email: "",
      password: ""
  })
  const handleChange=(e)=>{
      setData({...data, [e.target.name]: e.target.value});
      // console.log(data)
  }

  const submitForm=(e)=>{
    e.preventDefault();
    const form = new FormData();
        form.append('email', data.email);
        form.append('password', data.password);   
    
    axios.post('http://localhost/vue_api/php/saveUsuario.php',form)
    .then((resultado)=>{

        console.log(resultado.data)
        if(resultado.data.result == false){
          alert("Error");
        } else {
          history('/home');
        }
      })
    }
  return (
    <Fragment>
      <div className="container" style={{marginTop: "50px"}}>
        <div className="row justify-content-md-center">
          <div className="col col-md-2">            
          </div>

          <div className="card" style={{width: "22rem"}}>
            <h1 className='text-center'>Registro</h1>
            <div className="col-md-auto">            
              <form onSubmit={submitForm}>

                <div className="form-group">
                  {/* <label for="exampleInputEmail1">Email address</label> */}
                  <input type="email" className="form-control" id="exampleInputEmail1" 
                  name="email"
                  onChange={handleChange} value={data.email}
                  />                  
                </div>
                <div className="form-group">
                  {/* <label for="exampleInputPassword1">Password</label> */}
                  <input type="password" className="form-control" id="exampleInputPassword1" 
                  name="password"
                  onChange={handleChange} value={data.password}
                  />
                </div>
                                
                <button type="submit" className="btn btn-primary">Submit</button>
                
              </form>
            </div>
          </div>

          <div className="col col-md-2">            
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Register