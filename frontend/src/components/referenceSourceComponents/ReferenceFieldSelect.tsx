import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
  Box,
} from "@mui/material";
import { useReferenceItems } from "../../hooks/useReferenceItems";

interface ReferenceFieldSelectProps {
  referenceSourceId: number | null;
  value: string;
  valueId: number;
  onChange: (value: string, valueId: number) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

const ReferenceFieldSelect = ({
  referenceSourceId,
   valueId,
  onChange,
  label = "Значення",
  required = false,
  disabled = false,
  error = false,
  helperText,
}: ReferenceFieldSelectProps) => {
  const {
    data: referenceItems = [],
    isLoading,
    error: queryError,
  } = useReferenceItems(referenceSourceId);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value;
    const selectedItem = referenceItems.find(
      (item) => item.id.toString() === selectedId
    );

    if (selectedItem) {
      const fields = Object.entries(selectedItem)
        .filter(([key]) => key !== "id")
        .map(([_key, value]) => `${value}`)
        .join(", ");

      const displayName = fields || selectedItem.id.toString();
      onChange(displayName, selectedItem.id);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={2}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (queryError) {
    return (
      <Box p={2} color="error.main">
        Помилка завантаження довідника
      </Box>
    );
  }

  return (
    <FormControl
      fullWidth
      required={required}
      disabled={disabled}
      error={error}
    >
      <InputLabel>{label}</InputLabel>
      <Select value={valueId.toString()} label={label} onChange={handleChange}>
        {referenceItems.map((item) => {
          const fields = Object.entries(item)
            .filter(([key]) => key !== "id")
            .map(([_key, value]) => `${value}`)
            .join(", ");

          const displayName = fields || item.id.toString();
          return (
            <MenuItem key={item.id} value={item.id.toString()}>
              {displayName}
            </MenuItem>
          );
        })}
      </Select>
      {helperText && (
        <Box
          sx={{
            color: error ? "error.main" : "text.secondary",
            fontSize: "0.75rem",
            mt: 0.5,
          }}
        >
          {helperText}
        </Box>
      )}
    </FormControl>
  );
};

export default ReferenceFieldSelect;
