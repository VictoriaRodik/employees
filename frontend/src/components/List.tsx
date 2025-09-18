import { ReactNode } from "react";
import { Box, Container, SelectChangeEvent } from "@mui/material";
import Search from "./Search";
import Sort from "./Sort";
import Button from "./Button";
import Pagination from "./Pagination";
import DateRange from "./DateRange";
import { useUrlSearchParams } from "../hooks/useUrlSearchParams";

interface ListProps<T extends string> {
  label: string;
  sortOptions: { value: T; label: string }[];
  children: ReactNode;
  onAdd: () => void;
  searchKey: T;
  extraToolbar?: ReactNode;
  dateRange?: {
    startDate: string | null;
    endDate: string | null;
    onStartDateChange: (date: string | null) => void;
    onEndDateChange: (date: string | null) => void;
    label?: string;
  };
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
  dateRange,
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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: { md: "center" },
          gap: { xs: 2, md: 4 },
        }}
      >
        <Search value={search} onChange={handleSearch} />
        <Sort<T> value={sort} onChange={handleSort} options={sortOptions} />
        {!dateRange && <Button onClick={onAdd}>Додати {label}</Button>}

        {extraToolbar}
      </Box>

      {dateRange && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "space-between" },
            alignItems: { md: "center" },
            gap: { xs: 2, md: 4 },
          }}
        >
          <DateRange
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onStartDateChange={dateRange.onStartDateChange}
            onEndDateChange={dateRange.onEndDateChange}
            label={dateRange.label}
          />
          <Button onClick={onAdd}>Додати {label}</Button>
        </Box>
      )}

      {extraToolbar}

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
