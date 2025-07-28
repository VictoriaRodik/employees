import * as fieldDefinitionService from "../services/fieldDefinitionService.js";

const getFieldDefinitions = async (req, res) => {
  const fieldDefinitions = await fieldDefinitionService.getAllFieldDefinitions();
  res.json(fieldDefinitions);
};

const getFieldDefinition = async (req, res) => {
  const fieldDefinitions = await fieldDefinitionService.getFieldDefinitionById(req.params.id);
  if (fieldDefinitions) {
    res.json(fieldDefinitions);
  } else {
    res.status(404).json({ message: "FieldDefinition not found" });
  }
};

const createFieldDefinition = async (req, res) => {
  const newFieldDefinition = await fieldDefinitionService.createFieldDefinition(req.body);
  res.status(201).json(newFieldDefinition);
};

const updateFieldDefinition = async (req, res) => {
  const success = await fieldDefinitionService.updateFieldDefinition(req.params.id, req.body);
  if (success) {
    res.json({ message: "FieldDefinition updated" });
  } else {
    res.status(404).json({ message: "FieldDefinition not found" });
  }
};

const deleteFieldDefinition = async (req, res) => {
  const success = await fieldDefinitionService.deleteFieldDefinition(req.params.id);
  if (success) {
    res.json({ message: "FieldDefinition deleted" });
  } else {
    res.status(404).json({ message: "FieldDefinition not found" });
  }
};

export default {
  getFieldDefinitions,
  getFieldDefinition,
  createFieldDefinition,
  updateFieldDefinition,
  deleteFieldDefinition,
};
