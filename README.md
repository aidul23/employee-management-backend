# Employee Management API

This API provides endpoints to manage employees and user authentication. It is built with Express.js and uses MongoDB as the database. The authentication is handled using Passport.js, and JSON Web Tokens (JWT) are used for securing the API.

## Table of Contents
- [Installation](#installation)
- [Endpoints](#endpoints)
  - [Employee Endpoints](#employee-endpoints)
  - [Authentication Endpoints](#authentication-endpoints)
- [Models](#models)
- [Error Handling](#error-handling)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/employee-management-api.git
   cd employee-management-api
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the server:
   ```sh
   npm start
   ```

## Endpoints

### Employee Endpoints

- **Get All Employees**
  - **URL:** `/api/employees`
  - **Method:** `GET`
  - **Description:** Retrieves a list of all employees.
  - **Response:** 
    ```json
    [
      {
        "_id": "employee_id",
        "name": "John Doe",
        "username": "johndoe",
        "email": "john@example.com",
        "phone": "1234567890",
        "createdAt": "2024-05-18T14:48:00.000Z",
        "updatedAt": "2024-05-18T14:48:00.000Z"
      }
    ]
    ```

- **Get Employee by ID**
  - **URL:** `/api/employees/:id`
  - **Method:** `GET`
  - **Description:** Retrieves an employee by their ID.
  - **Response:**
    ```json
    {
      "_id": "employee_id",
      "name": "John Doe",
      "username": "johndoe",
      "email": "john@example.com",
      "phone": "1234567890",
      "createdAt": "2024-05-18T14:48:00.000Z",
      "updatedAt": "2024-05-18T14:48:00.000Z"
    }
    ```

- **Create Employee**
  - **URL:** `/api/employees`
  - **Method:** `POST`
  - **Description:** Creates a new employee.
  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "username": "johndoe",
      "password": "password123",
      "email": "john@example.com",
      "phone": "1234567890"
    }
    ```
  - **Response:**
    ```json
    {
      "_id": "employee_id",
      "name": "John Doe",
      "username": "johndoe",
      "email": "john@example.com",
      "phone": "1234567890",
      "createdAt": "2024-05-18T14:48:00.000Z",
      "updatedAt": "2024-05-18T14:48:00.000Z"
    }
    ```

- **Update Employee**
  - **URL:** `/api/employees/:id`
  - **Method:** `PUT`
  - **Description:** Updates an employee's information.
  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "username": "johndoe",
      "password": "newpassword123",
      "email": "john@example.com",
      "phone": "1234567890"
    }
    ```
  - **Response:**
    ```json
    {
      "_id": "employee_id",
      "name": "John Doe",
      "username": "johndoe",
      "email": "john@example.com",
      "phone": "1234567890",
      "createdAt": "2024-05-18T14:48:00.000Z",
      "updatedAt": "2024-05-18T14:48:00.000Z"
    }
    ```

- **Delete Employee**
  - **URL:** `/api/employees/:id`
  - **Method:** `DELETE`
  - **Description:** Deletes an employee by their ID.
  - **Response:**
    ```json
    {
      "message": "Product deleted successfully"
    }
    ```

### Authentication Endpoints

- **Register User**
  - **URL:** `/api/auth/register`
  - **Method:** `POST`
  - **Description:** Registers a new user.
  - **Request Body:**
    ```json
    {
      "username": "johndoe",
      "password": "password123"
    }
    ```
  - **Response:**
    ```json
    {
      "_id": "user_id",
      "username": "johndoe",
      "password": "$2b$10$...",
      "createdAt": "2024-05-18T14:48:00.000Z",
      "updatedAt": "2024-05-18T14:48:00.000Z"
    }
    ```

- **Login User**
  - **URL:** `/api/auth/login`
  - **Method:** `POST`
  - **Description:** Logs in a user and returns a JWT token.
  - **Request Body:**
    ```json
    {
      "username": "johndoe",
      "password": "password123"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "jwt_token"
    }
    ```

## Models

### Employee Model

- **Schema:**
  ```js
  const mongoose = require('mongoose');

  const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
  }, { timestamps: true });

  module.exports = mongoose.model('Employee', employeeSchema);
  ```

### User Model

- **Schema:**
  ```js
  const mongoose = require('mongoose');

  const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  }, { timestamps: true });

  module.exports = mongoose.model('User', userSchema);
  ```

## Error Handling

- All endpoints return appropriate HTTP status codes and error messages in case of failures.
- Common error responses include:
  ```json
  {
    "message": "Error message here"
  }
  ```
