import * as organizationService from "../services/organizationService.js";

const getOrganizations = async (req, res) => {
  const organizations = await organizationService.getAllOrganizations();
  res.json(organizations);
};

const getOrganization = async (req, res) => {
  const organization = await organizationService.getOrganizationById(
    req.params.id
  );
  if (organization) {
    res.json(organization);
  } else {
    res.status(404).json({ message: "Organization not found" });
  }
};

const createOrganization = async (req, res) => {
  const newOrganization = await organizationService.createOrganization(
    req.body
  );
  res.status(201).json(newOrganization);
};

const updateOrganization = async (req, res) => {
  const success = await organizationService.updateOrganization(
    req.params.id,
    req.body
  );
  if (success) {
    res.json({ message: "Organization updated" });
  } else {
    res.status(404).json({ message: "Organization not found" });
  }
};

const deleteOrganization = async (req, res) => {
  const success = await organizationService.deleteOrganization(req.params.id);
  if (success) {
    res.json({ message: "Organization deleted" });
  } else {
    res.status(404).json({ message: "Organization not found" });
  }
};

export default {
  getOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};
