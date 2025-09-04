import * as workScheduleService from "../services/workScheduleService.js";

const getWorkSchedules = async (req, res) => {
  const workSchedules = await workScheduleService.getAllWorkSchedules();
  res.json(workSchedules);
};

const getWorkSchedule = async (req, res) => {
  const workSchedules = await workScheduleService.getWorkScheduleById(req.params.id);
  if (workSchedules) {
    res.json(workSchedules);
  } else {
    res.status(404).json({ message: "WorkSchedule not found" });
  }
};

const createWorkSchedule = async (req, res) => {
  const newWorkSchedule = await workScheduleService.createWorkSchedule(req.body);
  res.status(201).json(newWorkSchedule);
};

const updateWorkSchedule = async (req, res) => {
  const success = await workScheduleService.updateWorkSchedule(req.params.id, req.body);
  if (success) {
    res.json({ message: "WorkSchedule updated" });
  } else {
    res.status(404).json({ message: "WorkSchedule not found" });
  }
};

const deleteWorkSchedule = async (req, res) => {
  const success = await workScheduleService.deleteWorkSchedule(req.params.id);
  if (success) {
    res.json({ message: "WorkSchedule deleted" });
  } else {
    res.status(404).json({ message: "WorkSchedule not found" });
  }
};

export default {
  getWorkSchedules,
  getWorkSchedule,
  createWorkSchedule,
  updateWorkSchedule,
  deleteWorkSchedule,
};
