const express = require('express');
const passport = require('passport');
const checkRoles = require('../middleware/checkRoles');
const router = express.Router();

const {getAllEmployees,createEmployee,updateEmployee,getEmployee,deleteEmployee} = require('../controllers/employeeController');

router.get("/", passport.authenticate("jwt", {session: false}), getAllEmployees);
router.get("/:id", passport.authenticate("jwt", {session: false}), getEmployee);
router.post("/",passport.authenticate("jwt", {session: false}), checkRoles(['admin']), createEmployee);
router.patch("/:id",passport.authenticate("jwt", {session: false}), checkRoles(['admin']), updateEmployee);
router.delete("/:id",passport.authenticate("jwt", {session: false}), checkRoles(['admin']), deleteEmployee);

module.exports = router;
