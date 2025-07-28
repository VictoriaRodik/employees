import * as referenceSourceService from "../services/referenceSourceService.js";

const getReferenceSources = async (req, res) => {
  const referenceSources = await referenceSourceService.getAllReferenceSources();
  res.json(referenceSources);
};

const getReferenceSource = async (req, res) => {
  const referenceSources = await referenceSourceService.getReferenceSourceById(req.params.id);
  if (referenceSources) {
    res.json(referenceSources);
  } else {
    res.status(404).json({ message: "ReferenceSource not found" });
  }
};

const createReferenceSource = async (req, res) => {
  const newReferenceSource = await referenceSourceService.createReferenceSource(req.body);
  res.status(201).json(newReferenceSource);
};

const updateReferenceSource = async (req, res) => {
  const success = await referenceSourceService.updateReferenceSource(req.params.id, req.body);
  if (success) {
    res.json({ message: "ReferenceSource updated" });
  } else {
    res.status(404).json({ message: "ReferenceSource not found" });
  }
};

const deleteReferenceSource = async (req, res) => {
  const success = await referenceSourceService.deleteReferenceSource(req.params.id);
  if (success) {
    res.json({ message: "ReferenceSource deleted" });
  } else {
    res.status(404).json({ message: "ReferenceSource not found" });
  }
};

export default {
  getReferenceSources,
  getReferenceSource,
  createReferenceSource,
  updateReferenceSource,
  deleteReferenceSource,
};
