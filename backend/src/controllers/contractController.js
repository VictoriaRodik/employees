import * as contractService from "../services/contractService.js";

const getContracts = async (req, res) => {
  const contracts = await contractService.getAllContracts();
  res.json(contracts);
};

const getContract = async (req, res) => {
  const contract = await contractService.getContractById(req.params.id);
  if (contract) {
    res.json(contract);
  } else {
    res.status(404).json({ message: "Contract not found" });
  }
};

const createContract = async (req, res) => {
  const newContract = await contractService.createContract(req.body);
  res.status(201).json(newContract);
};

const updateContract = async (req, res) => {
  const success = await contractService.updateContract(req.params.id, req.body);
  if (success) {
    res.json({ message: "Contract updated" });
  } else {
    res.status(404).json({ message: "Contract not found" });
  }
};

const deleteContract = async (req, res) => {
  const success = await contractService.deleteContract(req.params.id);
  if (success) {
    res.json({ message: "Contract deleted" });
  } else {
    res.status(404).json({ message: "Contract not found" });
  }
};
export default {
  getContracts,
  getContract,
  createContract,
  updateContract,
  deleteContract,
};
