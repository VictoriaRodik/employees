import { ReactNode } from "react";
import { Box, Container, SelectChangeEvent } from "@mui/material";
import Search from "./Search";
import Sort from "./Sort";
import Button from "./Button";
import Pagination from "./Pagination";
import { useUrlSearchParams } from "../hooks/useUrlSearchParams";

interface ListProps<T extends string> {
  label: string;
  sortOptions: { value: T; label: string }[];
  children: ReactNode;
  onAdd: () => void;
  searchKey: T;
  extraToolbar?: ReactNode;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

const List = <T extends string>({
  label,
  sortOptions,
  onAdd,
  children,
  extraToolbar,
  pagination,
}: ListProps<T>) => {
  const { searchParams, setUrlSearchParams } = useUrlSearchParams();

  const search = searchParams.get("search") || "";
  const sort = (searchParams.get("sort") as T) || sortOptions[0].value;

  const handleSearch = (e: SelectChangeEvent<string>) => {
    setUrlSearchParams({ search: e.target.value });
  };

  const handleSort = (e: SelectChangeEvent<string>) => {
    setUrlSearchParams({ sort: e.target.value as T });
  };

  const handlePageChange = (page: number) => {
    if (pagination) {
      pagination.onPageChange(page);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "column", gap: 4 }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
      <Search value={search} onChange={handleSearch} />
      <Sort<T> value={sort} onChange={handleSort} options={sortOptions} />
      {extraToolbar}
      </Box>
      <Button onClick={onAdd}>Додати {label}</Button>
      {children}
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default List;
