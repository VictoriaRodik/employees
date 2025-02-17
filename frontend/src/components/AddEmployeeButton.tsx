import Button from "./Button";

interface AddEmployeeButtonProps {
  onClick: () => void;
}

const AddEmployeeButton: React.FC<AddEmployeeButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}>Додати співробітника</Button>;
};

export default AddEmployeeButton;
