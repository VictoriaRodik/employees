const express = require("express");
const router = express.Router();
const {
  getEmployees,
  createEmployee,
  editEmployee,
  removeEmployee,
} = require("../controllers/employeeController");

router.get("/", getEmployees);
router.post("/", createEmployee);
router.put("/:id", editEmployee);
router.delete("/:id", removeEmployee);

module.exports = router;
