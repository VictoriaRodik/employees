import { Button as MUIButton } from "@mui/material";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  color?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  color = "primary",
}) => {
  return (
    <MUIButton
      variant="contained"
      color={color}
      onClick={onClick}
      size="large"
      fullWidth
      sx={{
        width: "fit-content",
        alignSelf: {xs: "center", md: "stretch"},
        textTransform: "uppercase",
        fontWeight: "bold",
      }}
    >
      {children}
    </MUIButton>
  );
};

export default Button;
