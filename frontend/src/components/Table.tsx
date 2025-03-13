import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface TableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  renderActions?: (item: T) => React.ReactNode;
}

const GeneralTable = <T,>({ data, columns, renderActions }: TableProps<T>) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.key as string}>{col.label}</TableCell>
            ))}
            {renderActions && <TableCell>Дії</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((col) => (
                <TableCell key={col.key as string}>
                  {String(row[col.key])}
                </TableCell>
              ))}
              {renderActions && <TableCell>{renderActions(row)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GeneralTable;
