import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [load, setLoad] = useState(false);
  const history = useHistory();

  // Perform the Login API call
  const login = async (formData) => {
    let url = config.endpoint;
    setLoad(true);

    try {
      let response = await axios.post(`${url}/auth/login`, formData);
      console.log(response.data);

      if (response.data.success) {
        enqueueSnackbar("Logged in successfully", { variant: 'success' });
        let { token, username, balance } = response.data;
        persistLogin(token, username, balance);
        history.push('/');
      }
    } catch (err) {
      if (err.response) {
        enqueueSnackbar(err.response.data.message, { variant: 'error' });
      } else {
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.", { variant: 'error' });
      }
    } finally {
      setLoad(false);
    }
  };

  // Validate the input values
  const validateInput = ({ username, password }) => {
    if (username === "") {
      enqueueSnackbar("Username is a required field", { variant: 'warning' });
      return false;
    }
    if (password === "" || password.length < 6) {
      enqueueSnackbar("Password is a required field", { variant: 'warning' });
      return false;
    }
    return true;
  };

  // Persist user's login information
  const persistLogin = (token, username, balance) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("balance", balance);
  };

  const handleLogin = () => {
    const formData = { username, password };
    if (validateInput(formData)) {
      login(formData);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            type="text"
            value={username}
            onChange={(e) => updateUsername(e.target.value)}
            fullWidth
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => updatePassword(e.target.value)}
            fullWidth
          />
          {load ? (
            <CircularProgress color="inherit" id="loader" />
          ) : (
            <Button
              variant="contained"
              className="button"
              onClick={handleLogin}
            >
              LOGIN TO QKART
            </Button>
          )}
          <p className="secondary-action">
            Don’t have an account?{" "}
            <Link to="/register" className="link">
              Register now
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
