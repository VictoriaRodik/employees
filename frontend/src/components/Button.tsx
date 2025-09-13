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
      sx={{
        width: "fit-content",
        alignSelf: "flex-end",
        textTransform: "uppercase",
        fontWeight: "bold",
      }}
    >
      {children}
    </MUIButton>
  );
};

export default Button;
