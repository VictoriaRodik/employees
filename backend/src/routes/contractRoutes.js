const express = require("express");
const router = express.Router();
const {
  getContracts,
  createContract,
  editContract,
  removeContract,
} = require("../controllers/contractController");

router.get("/", getContracts);
router.post("/", createContract);
router.put("/:id", editContract);
router.delete("/:id", removeContract);

module.exports = router;
