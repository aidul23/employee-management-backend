import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerRoute } from "../Utils/ApiRoutes.js";

function Register() {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [userInfo, setUserInfo] = useState();

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      const response = await axios.post(registerRoute, {
        username,
        password
      });
      console.log(response.data);
      setUserInfo(response.data); 
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input type="text" {...register("username", { required: true })} />
        {errors.username && <p>username is required.</p>}
        <label>Password</label>
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <p>password is required</p>}
        <button type="submit">Register</button>
        <span>Already have account?</span>
        <span>
          <Link to="/login">Login</Link>
        </span>
      </form>
    </>
  );
}

export default Register;
