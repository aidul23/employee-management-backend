import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAllEmployee } from "../Utils/ApiRoutes.js";
import { AuthContext } from "../components/AuthContext";
import { jwtDecode } from "jwt-decode";

function Home() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const { token, loading } = useContext(AuthContext);
  let roleItem = [];

  const getTokenPayload = () => {
    // const token = localStorage.getItem('token');
    if (token) {
      return jwtDecode(token);
    }
    return null;
  };

  const tokenPayload = getTokenPayload();

  if (tokenPayload) {
    const { roles } = tokenPayload;
    roleItem = roles;
  }

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(getAllEmployee, config);
        console.log(response.data);
        setEmployees(response.data);
      } catch (error) {
        console.error(error.response.data);
        setError(error.response.data + " user");
      }
    };

    if (token) {
      getEmployees();
    }
  }, [token]);

  if (loading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <h1>All Employees of Company</h1>
      {error && <p style={{ textAlign: "center" }}>{error}</p>}
      {employees.length === 0 ? (
        <p style={{ textAlign: "center" }}>No user!</p>
      ) : (
        <ul>
          {employees.map((employee) => (
            <div key={employee._id} className="order">
              <h3>{employee._id}</h3>
              <h4>{"Name: " + employee.name}</h4>
              <h4>{"Email: " + employee.email}</h4>
              {roleItem.includes("admin") ? (
                <div className="btn-container">
                  <button>Update</button>
                  <button>Delete</button>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </ul>
      )}
    </>
  );
}

export default Home;
