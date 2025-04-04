const express = require("express");
const router = express.Router();
const {
  getOrganizations,
  createOrganization,
  editOrganization,
  removeOrganization,
} = require("../controllers/organizationController");

router.get("/", getOrganizations);
router.post("/", createOrganization);
router.put("/:id", editOrganization);
router.delete("/:id", removeOrganization);

module.exports = router;
