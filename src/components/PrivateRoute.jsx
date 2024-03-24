import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";
import TokenDesencriptadoContext from "./Context/TokenDesencriptadoContext";

const PrivateRoute = () => {
  const [datos, setDatos] = useState(null);
  
  useEffect(() => {
    function verificarToken() {
      // Obtén el token del localStorage
      const token = localStorage.getItem("userDataReact");

      if (token) {
        const tokenDecodificado = jwtDecode(token);
        const tokenExp = tokenDecodificado.exp;
        // console.log(tokenDecodificado);
        // alert(tokenExp);

        if (Date.now() >= tokenExp * 1000) {
          localStorage.removeItem("userDataReact");
        } else {
          setDatos(tokenDecodificado);
        }
      }
    }

    verificarToken();
  }, []);

  let usuario = localStorage.getItem("userDataReact") == null ? false : true;

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  return (
    <TokenDesencriptadoContext.Provider value={datos}>
      <Outlet />
    </TokenDesencriptadoContext.Provider>
  );
};

export default PrivateRoute;