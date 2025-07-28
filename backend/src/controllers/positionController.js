import * as positionService from "../services/positionService.js";

const getPositions = async (req, res) => {
  const positions = await positionService.getAllPositions();
  res.json(positions);
};

const getPosition = async (req, res) => {
  const positions = await positionService.getPositionById(req.params.id);
  if (positions) {
    res.json(positions);
  } else {
    res.status(404).json({ message: "Position not found" });
  }
};

const createPosition = async (req, res) => {
  const newPosition = await positionService.createPosition(req.body);
  res.status(201).json(newPosition);
};

const updatePosition = async (req, res) => {
  const success = await positionService.updatePosition(req.params.id, req.body);
  if (success) {
    res.json({ message: "Position updated" });
  } else {
    res.status(404).json({ message: "Position not found" });
  }
};

const deletePosition = async (req, res) => {
  const success = await positionService.deletePosition(req.params.id);
  if (success) {
    res.json({ message: "Position deleted" });
  } else {
    res.status(404).json({ message: "Position not found" });
  }
};

export default {
  getPositions,
  getPosition,
  createPosition,
  updatePosition,
  deletePosition,
};
