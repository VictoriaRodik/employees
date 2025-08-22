import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FieldDefinitionInterface } from "../../types/fieldDefinition";
import ReferenceFieldSelect from "./ReferenceFieldSelect";

interface DynamicFieldProps {
  fieldDefinition: FieldDefinitionInterface;
  value: string;
  valueId: number;
  onChange: (value: string, valueId: number) => void;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

const DynamicField = ({
  fieldDefinition,
  value,
  valueId,
  onChange,
  required = false,
  disabled = false,
  error = false,
  helperText,
}: DynamicFieldProps) => {
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value, 0); // valueId = 0 для текстових полів
  };

  const handleReferenceChange = (newValue: string, newValueId: number) => {
    onChange(newValue, newValueId);
  };

  switch (fieldDefinition.fieldType) {
    case "text":
      return (
        <TextField
          fullWidth
          label={fieldDefinition.fieldName}
          value={value}
          onChange={handleTextChange}
          required={required}
          disabled={disabled}
          error={error}
          helperText={helperText}
        />
      );

    case "number":
      return (
        <TextField
          fullWidth
          type="number"
          label={fieldDefinition.fieldName}
          value={value}
          onChange={handleTextChange}
          required={required}
          disabled={disabled}
          error={error}
          helperText={helperText}
        />
      );

    case "date":
      return (
        <TextField
          fullWidth
          type="date"
          label={fieldDefinition.fieldName}
          value={value}
          onChange={handleTextChange}
          required={required}
          disabled={disabled}
          error={error}
          helperText={helperText}
          InputLabelProps={{
            shrink: true,
          }}
        />
      );

    case "reference":
      if (!fieldDefinition.referenceSourceId) {
        return (
          <TextField
            fullWidth
            label={fieldDefinition.fieldName}
            value={value}
            onChange={handleTextChange}
            required={required}
            disabled={disabled}
            error={error}
            helperText={helperText || "Довідник не налаштований"}
          />
        );
      }
      return (
        <ReferenceFieldSelect
          referenceSourceId={fieldDefinition.referenceSourceId}
          value={value}
          valueId={valueId}
          onChange={handleReferenceChange}
          label={fieldDefinition.fieldName}
          required={required}
          disabled={disabled}
        />
      );

    default:
      return (
        <TextField
          fullWidth
          label={fieldDefinition.fieldName}
          value={value}
          onChange={handleTextChange}
          required={required}
          disabled={disabled}
          error={error}
          helperText={helperText}
        />
      );
  }
};

export default DynamicField;
