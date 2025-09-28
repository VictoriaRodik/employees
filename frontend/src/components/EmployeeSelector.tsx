import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { EmployeeInterface } from "../types/employee";
import EmployeeSelectionModal from "./EmployeeSelectionModal";

interface EmployeeSelectorProps {
  value: string;
  onChange: (employeeId: number, employeeName: string) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  disabled?: boolean;
}

const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({
  value,
  onChange,
  error = false,
  helperText,
  label = "Співробітник",
  disabled = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (!disabled) {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEmployeeSelect = (employee: EmployeeInterface) => {
    onChange(employee.id, employee.fullName);
    setModalOpen(false);
  };

  return (
    <Box>
      <TextField
        fullWidth
        label={label}
        value={value}
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleOpenModal}
                  disabled={disabled}
                  edge="end"
                  color="primary"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        error={error}
        helperText={helperText}
        disabled={disabled}
        placeholder="Оберіть співробітника..."
        sx={{
          '& .MuiInputBase-input': {
            cursor: disabled ? 'default' : 'pointer',
          },
        }}
        onClick={handleOpenModal}
      />
      
      <EmployeeSelectionModal
        open={modalOpen}
        onClose={handleCloseModal}
        onEmployeeSelect={handleEmployeeSelect}
      />
    </Box>
  );
};

export default EmployeeSelector;
