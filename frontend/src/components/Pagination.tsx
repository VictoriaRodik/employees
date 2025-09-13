import { Pagination as MuiPagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  baseUrl?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  baseUrl = "",
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const handleChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      color="primary"
      size="large"
      style={{ position: "sticky", bottom: 0, left: 0, right: 0 }}
      showFirstButton
      showLastButton
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${baseUrl}?page=${item.page}`}
          {...item}
        />
      )}
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: 3,
        marginBottom: 2,
      }}
    />
  );
};

export default Pagination;
