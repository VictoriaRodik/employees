import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface SortProps<T extends string = string> {
  value: T;
  options: { value: T; label: string }[];
  onChange: (e: SelectChangeEvent<T>) => void;
  placeholder?: string;
}

const Sort = <T extends string>({
  value,
  options,
  onChange,
  placeholder = "Сортувати",
}: SortProps<T>) => {
  return (
    <Select value={value} onChange={onChange} displayEmpty sx={{ flexGrow: 1 }}>
      <MenuItem value="" disabled>
        {placeholder}
      </MenuItem>
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default Sort;
