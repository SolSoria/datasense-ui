import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginSession } from "../../reducers/slices/authSlice";
import { Box, Spinner, Center } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";

function OAuth2(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasCalledAPI = useRef(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasCalledAPI.current) {
      return;
    }

    // Obtener la URL actual
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    // Iterar sobre los parámetros y almacenarlos en un objeto
    for (const [key, value] of urlParams.entries()) {
      params[key] = value;
    }
    console.log(params);
    const code = params["code"];

    // Enviar el código de autorización al servidor
    if (isLoggedIn) {
      setLoading(false);
      navigate("/dashboard");
      return;
    } else {
      axios
        .post("http://datasense-project.com/auth/login/google", { code: code })
        .then((response) => {
          const token = response.data.token;
          //decode token
          const decodedToken = jwtDecode(token);
          dispatch(
            setLoginSession({
              user: decodedToken,
              token: token,
              isLoggedIn: true,
            })
          );
          // esperar 2 segundos
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error(error);
          navigate("/login");
        })
        .finally(() => {
          setLoading(false);
        });
    }

    hasCalledAPI.current = true;
  }, [navigate, dispatch, isLoggedIn]);

  return (
    <Box>
      {loading ? (
        <Center height="100vh">
          <Spinner size="xl" />
        </Center>
      ) : null}
    </Box>
  );
}

export default OAuth2;
