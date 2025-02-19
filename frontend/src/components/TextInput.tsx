import { TextField } from "@mui/material";
import { useField } from "formik";

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      fullWidth
      label={label}
      {...field}
      {...props}
      slotProps={{
        inputLabel: props.type === "date" ? { shrink: true } : undefined,
      }}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export default TextInput;
