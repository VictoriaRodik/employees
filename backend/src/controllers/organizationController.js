const Organization = require("../models/organizationModel");

async function getOrganizations(req, res) {
  try {
    const organizations = await Organization.getAllOrganizations();
    res.json(organizations);
  } catch (err) {
    res.status(500).send("Error retrieving organizations");
  }
}

async function createOrganization(req, res) {
  try {
    const newOrganizationId = await Organization.addOrganization(req.body);
    res
      .status(201)
      .json({ id: newOrganizationId, message: "Organization added successfully" });
  } catch (err) {
    res.status(500).send("Error adding organization");
  }
}

async function editOrganization(req, res) {
  try {
    const updatedRows = await Organization.updateOrganization(req.params.id, req.body);
    if (updatedRows > 0) {
      res.json({ message: "Organization updated successfully" });
    } else {
      res.status(404).send("Organization not found");
    }
  } catch (err) {
    res.status(500).send("Error updating organization");
  }
}

async function removeOrganization(req, res) {
  try {
    const deletedRows = await Organization.deleteOrganization(req.params.id);
    if (deletedRows > 0) {
      res.json({ message: "Organization deleted successfully" });
    } else {
      res.status(404).send("Organization not found");
    }
  } catch (err) {
    res.status(500).send("Error deleting organization");
  }
}

module.exports = { getOrganizations, createOrganization, editOrganization, removeOrganization };
