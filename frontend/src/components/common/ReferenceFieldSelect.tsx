import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchAll } from "../../api/apiService";

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

interface ReferenceItem {
  id: number;
  name: string;
}

const ReferenceFieldSelect = ({
  referenceSourceId,
  value,
  valueId,
  onChange,
  label = "Значення",
  required = false,
  disabled = false,
  error = false,
  helperText,
}: ReferenceFieldSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(value);

  // Визначаємо endpoint на основі referenceSourceId
  const getEndpoint = (sourceId: number | null): string => {
    if (!sourceId) return "positions";
    
    const endpoints: Record<number, string> = {
      1: "positions", // Припустимо, що 1 = positions
      2: "departments", // Припустимо, що 2 = departments
      3: "organizations", // Припустимо, що 3 = organizations
      // Додайте інші мапінги за потреби
    };
    return endpoints[sourceId] || "positions";
  };

  const endpoint = getEndpoint(referenceSourceId);

  const { data: referenceItems = [], isLoading, error: queryError } = useQuery({
    queryKey: ["reference", endpoint],
    queryFn: () => fetchAll<ReferenceItem>(endpoint),
    enabled: !!referenceSourceId && referenceSourceId > 0,
  });

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value;
    const selectedItem = referenceItems.find(item => item.id.toString() === selectedId);
    
    if (selectedItem) {
      setSelectedValue(selectedItem.name);
      onChange(selectedItem.name, selectedItem.id);
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
    <FormControl fullWidth required={required} disabled={disabled} error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={valueId.toString()}
        label={label}
        onChange={handleChange}
      >
        {referenceItems.map((item) => (
          <MenuItem key={item.id} value={item.id.toString()}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <Box sx={{ color: error ? 'error.main' : 'text.secondary', fontSize: '0.75rem', mt: 0.5 }}>
          {helperText}
        </Box>
      )}
    </FormControl>
  );
};

export default ReferenceFieldSelect;
