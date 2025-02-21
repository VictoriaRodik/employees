const express = require("express");
const router = express.Router();
const {
  getContracts,
  createContract,
  updateContract,
  removeContract,
} = require("../controllers/contractController");

router.get("/", getContracts);
router.post("/", createContract);
router.put("/:id", updateContract);
router.delete("/:id", removeContract);

module.exports = router;
