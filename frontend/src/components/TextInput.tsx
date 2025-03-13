import { TextField } from "@mui/material";
import { useField } from "formik";

interface TextInputProps {
  name: string;
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ 
  name, 
  label, 
  type = "text",
  multiline = false,
  rows = 1,
  fullWidth = true,
}) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      {...field}
      type={type}
      label={label}
      multiline={multiline}
      rows={rows}
      fullWidth={fullWidth}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export default TextInput;
