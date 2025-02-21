const Contract = require("../models/contractModel");

async function getContracts(req, res) {
  try {
    const contracts = await Contract.getAllContracts();
    res.json(contracts);
  } catch (err) {
    res.status(500).send("Error retrieving contracts");
  }
}

async function createContract(req, res) {
  try {
    const newContractId = await Contract.addContract(req.body);
    res
      .status(201)
      .json({ id: newContractId, message: "Contract added successfully" });
  } catch (err) {
    res.status(500).send("Error adding contact");
  }
}

async function updateContract(req, res) {
  try {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    
    const existingContract = await Contract.getContractById(id);
    if (!existingContract) {
      return res.status(404).send('Contract not found');
    }

    const result = await Contract.updateContract(id, updatedData);
    
    if (result) {
      const updated = await Contract.getContractById(id);
      res.json(updated);
    } else {
      res.status(404).send('Contract not found');
    }
  } catch (error) {
    console.error('Error updating contract:', error);
    res.status(500).send('Error updating contract');
  }
}

async function removeContract(req, res) {
  try {
    const deletedRows = await Contract.deleteContract(req.params.id);
    if (deletedRows > 0) {
      res.json({ message: "Contract deleted successfully" });
    } else {
      res.status(404).send("Contract not found");
    }
  } catch (err) {
    res.status(500).send("Error deleting contract");
  }
}

module.exports = { getContracts, createContract, updateContract, removeContract };
