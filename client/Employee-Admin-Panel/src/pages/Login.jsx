import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../components/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginRoute } from "../Utils/ApiRoutes.js";

function Login() {
  axios.defaults.withCredentials = true;
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { username, password } = data;
    console.log(data);
    try {
      const response = await axios.post(loginRoute, {
        username,
        password,
      });
      console.log(response.data);
      setUserInfo(response.data);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      console.error("Authentication failed:", error);
      setToken(null);
      localStorage.removeItem("token");
      if (error.response && error.response.data) {
        setError(error.response.data); // Set the error message if present in the error response
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input type="text" {...register("username", { required: true })} />
        {errors.username && <p>username is required.</p>}
        <label>Password</label>
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <p>password is required</p>}
        <button type="submit">Login</button>
        <span>Create an account?</span>
        <span>
          <Link to="/register">Registration</Link>
        </span>
      </form>
    </>
  );
}

export default Login;
