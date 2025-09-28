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
  renderExtraActions?: (item: T) => React.ReactNode;
}

const GeneralTable = <T,>({ data, columns, renderActions, renderExtraActions }: TableProps<T>) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.key as string}>{col.label}</TableCell>
            ))}
            {renderActions && <TableCell>Дії</TableCell>}
            {renderExtraActions && <TableCell>Друк</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => {
            const rowData = row as T & { _onClick?: () => void; _isSelected?: boolean; _key?: string | number };
            return (
              <TableRow 
                key={rowData._key || index}
                hover
                selected={rowData._isSelected}
                onClick={rowData._onClick}
                sx={{ 
                  cursor: rowData._onClick ? 'pointer' : 'default',
                  '&:hover': {
                    backgroundColor: rowData._onClick ? 'action.hover' : 'inherit'
                  }
                }}
              >
                {columns.map((col) => (
                  <TableCell key={col.key as string}>
                    {row[col.key] ? String(row[col.key]) : '-'}
                  </TableCell>
                ))}
                {renderActions && <TableCell>{renderActions(row)}</TableCell>}
                {renderExtraActions && <TableCell>{renderExtraActions(row)}</TableCell>}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GeneralTable;
