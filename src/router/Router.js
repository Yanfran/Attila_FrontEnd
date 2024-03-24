// import React, {useState, useEffect} from 'react';
// // import Header from './components/Header';
// import Home from '../page/Home';
// import Login from '../page/Login';
// import Perfil from '../page/Perfil';
// import Register from '../page/Register';
// import {
//   BrowserRouter as Router,  
//   Routes,
//   Route,   
// } from "react-router-dom";
// import Sidebar from '../components/Sidebar';
// import PrivateRoute from '../components/PrivateRoute';
// import jwtDecode from 'jwt-decode';

// const route = () => {


//     const  [isLoggedIn, setIsLoggedIn] = useState(false);  
//     useEffect(() => {
  
//         if (!localStorage.getItem("userDataReact")) {
//             // isLoggedIn(null) 
//             // history('/');           
//         } else {            
//             const storage = (localStorage.getItem('userDataReact'))
//             let token = storage
//             let decode = jwtDecode(token)  
//             // console.log(decode)            
//             let a = decode.data.acceso            
//             if (a == true) {              
//               setIsLoggedIn(a)              
//             } else {
//               setIsLoggedIn(false)              
//             }
//         }
  
//     },[]);
        
  
  
//     // const login = () => {setIsLoggedIn(true)}
//     // const logout = () => {setIsLoggedIn(false)}
  
//     console.log(isLoggedIn)
  
//     // const login = () => setIsLoggedIn({ id: '1', name: 'robin',  permissions: ['analyze'], roles: ['admin'], });
//     // const logout = () => setIsLoggedIn(null);


//   return (
//     <Router>     
//       <div className=''> 

//           {/* {isLoggedIn ? (
//               <button onClick={logout}>Logout</button>
//           ) : (
//               <button onClick={login}>Login</button>
//           )} */}

//           <Routes> 


//             {
//               isLoggedIn ? 
//               (
//               <Route element={<Sidebar/>}>     
//                   <Route element={<PrivateRoute isLoggedIn={!!isLoggedIn} />}>
//                   <Route exact path="/home" element={<Home/>}/>            
//                   <Route exact path="/perfil" element={<Perfil/>}/>            
//                   {/* <Route path="/" element={
//                     <PrivateRoute isLoggedIn={isLoggedIn}>
//                       <Home/>
//                     </PrivateRoute> }/>

//                   <Route path="/perfil" element={
//                     <PrivateRoute isLoggedIn={isLoggedIn}>
//                       <Perfil/>
//                     </PrivateRoute>}/>               */}
//                 </Route>
//               </Route>          

//               ) : (
//                 <Route>
//                 <Route exact path="/login" element={<Login/>}/>            
//                 <Route exact path="/register" element={<Register/>}/>
//                 <Route exact path="*" element={<Login/>} />
//                 </Route>
//               )
//             }                     

//         </Routes>                    
//       </div>
//    </Router>
//   )
// }

// export default route