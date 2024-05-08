const Employee = require("../models/employeeModel");
const mongoose = require("mongoose");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}).sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No employee with id: ${id} found!`);

  try {
    const employee = await Employee.findById(id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createEmployee = async (req, res) => {
  const { name, username, password, email, phone } = req.body;

  try {
    const newEmployee = await Employee.create({
      name,
      username,
      password,
      email,
      phone,
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, username, password, email, phone } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No employee with id: ${id} found!`);

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, username, password, email, phone },
      { new: true }
    );
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No employee with id: ${id} found!`);
  try {
    const employee = await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
