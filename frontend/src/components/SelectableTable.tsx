import React from "react";
import GeneralTable from "./Table";

interface SelectableTableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  onRowSelect?: (item: T) => void;
  selectedItem?: T | null;
  getRowId?: (item: T) => string | number;
  renderActions?: (item: T) => React.ReactNode;
  renderExtraActions?: (item: T) => React.ReactNode;
}

const SelectableTable = <T,>({ 
  data, 
  columns, 
  onRowSelect, 
  selectedItem,
  getRowId = (item: T) => (item as T & { id?: number }).id || 0,
  renderActions,
  renderExtraActions
}: SelectableTableProps<T>) => {
  const handleRowClick = (item: T) => {
    if (onRowSelect) {
      onRowSelect(item);
    }
  };

  const isSelected = (item: T) => {
    if (!selectedItem) return false;
    const itemId = getRowId(item);
    const selectedId = getRowId(selectedItem);
    return itemId === selectedId;
  };

  const dataWithInteractivity = data.map((row) => ({
    ...row,
    _onClick: () => handleRowClick(row),
    _isSelected: isSelected(row),
    _key: getRowId(row)
  }));

  return (
    <GeneralTable
      data={dataWithInteractivity}
      columns={columns}
      renderActions={renderActions}
      renderExtraActions={renderExtraActions}
    />
  );
};

export default SelectableTable;