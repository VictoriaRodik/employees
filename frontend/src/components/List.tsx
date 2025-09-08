import { ReactNode } from "react";
import { Container, SelectChangeEvent } from "@mui/material";
import Search from "./Search";
import Sort from "./Sort";
import Button from "./Button";
import { useUrlSearchParams } from "../hooks/useUrlSearchParams";

interface ListProps<T extends string> {
  label: string;
  sortOptions: { value: T; label: string }[];
  children: ReactNode;
  onAdd: () => void;
  searchKey: T;
  extraToolbar?: ReactNode;
}

const List = <T extends string>({
  label,
  sortOptions,
  onAdd,
  children,
  extraToolbar,
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

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "column", gap: 4 }}
    >
      <Search value={search} onChange={handleSearch} />
      <Sort<T> value={sort} onChange={handleSort} options={sortOptions} />
      {extraToolbar}
      <Button onClick={onAdd}>Додати {label}</Button>
      {children}
    </Container>
  );
};

export default List;
