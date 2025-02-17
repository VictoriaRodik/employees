import { TextField } from "@mui/material";

interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Search = ({ value, onChange, placeholder = "Пошук..." }: SearchProps) => {
  return (
    <TextField 
      fullWidth 
      label={placeholder} 
      variant="outlined" 
      value={value} 
      onChange={onChange} 
    />
  );
};

export default Search;
