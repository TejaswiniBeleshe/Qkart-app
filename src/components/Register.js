import { FaceRetouchingNatural } from "@mui/icons-material";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState} from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import {Link,useHistory} from "react-router-dom";
const Register = () => {
  
  const { enqueueSnackbar } = useSnackbar();
  let [formData,setFormData] = useState({username:'',password:'',confirmPassword:''});
  let [load,setLoad] = useState(false);
  const history = useHistory();

  //console.log(config.endpoint);
  // useEffect(()=>{
  //   async function getData(){
  //     let res = await fetch(`${config.endpoint}/auth/register`,{
  //       method:'POST',
  //       body:JSON.stringify({username:'crio.do',password:'learnbydoing'}),
  //       headers:{
  //        'Content-Type':'application/json',
  //       }
  //      });
  //     // console.log(res);
  //     let data = await res.json();
  //     console.log(data)


  //   }
  //   getData();
   
  // },[])


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    
    
    try{
      let response = await axios.post(`${config.endpoint}/auth/register`,JSON.stringify({username:formData.username,password:formData.password}),{
        headers:{
          'Content-Type':'application/json'
        }
      })
      
        enqueueSnackbar('Registered Successfully');
        setLoad(false);
        history.push('/login');
    }
    catch(err){
        
        
        if(err.response.status === 400){
          enqueueSnackbar(err.response.data.message);
          setLoad(false);
          return;
        }
        enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON');
        setLoad(false);
        return;
      
    }
    
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    
    let check = true;
    if(data.username === ''){
      enqueueSnackbar('Username is a required field');
      check = false;
      return;
    }
    if(data.username.length < 6 ){
      enqueueSnackbar('Username must be at least 6 characters');
      check = false;
      return;
    }
    if(data.password === ''){
      enqueueSnackbar('Password is required field');
      check = false;
      return;
    }
    if(data.password.length < 6){
      enqueueSnackbar('Password must be at least 6 characters');
      check = false;
      return;
    }
    if(data.confirmPassword !== data.password){
      enqueueSnackbar('Passwords do not match');
      check = false;
      return;
    }
    if(check){
      setLoad(true);
      register(formData)
    }
 };
  console.log(formData)
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
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={(e)=>setFormData((prev)=>({...prev,username:e.target.value}))}
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={formData.password}
            onChange={(e)=>setFormData((prev)=>({...prev,password:e.target.value}))}

          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={formData.confirmPassword}
            onChange={(e)=>setFormData((prev)=>({...prev,confirmPassword:e.target.value}))}
          />
          {load?<CircularProgress color="inherit" id="loader"/>:<Button className="button" variant="contained" onClick={()=>validateInput(formData)}>
            Register Now
           </Button>}
           
          <p className="secondary-action">
            Already have an account?{" "}
             <Link className="link" to='/login'>
              Login here
             </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
