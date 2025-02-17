import { Button as MUIButton } from "@mui/material";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  color?: "primary" | "secondary" | "error";
}

const Button: React.FC<ButtonProps> = ({ onClick, children, color = "primary" }) => {
  return (
    <MUIButton variant="contained" color={color} onClick={onClick}>
      {children}
    </MUIButton>
  );
};

export default Button;
