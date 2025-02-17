import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface SortProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: SelectChangeEvent<string>) => void;
}

const Sort = ({ value, options, onChange }: SortProps) => {
  return (
    <Select value={value} onChange={onChange} displayEmpty>
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default Sort;
