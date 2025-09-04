import React from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { WorkScheduleInterface } from "../../types/workSchedule";

interface workScheduleTableProps {
  workSchedules: WorkScheduleInterface[];
  onEdit: (workSchedule: WorkScheduleInterface) => void;
  onCopy: (workSchedule: WorkScheduleInterface) => void;
  onDelete: (id: number) => void;
}

const workScheduleTable: React.FC<workScheduleTableProps> = ({
  workSchedules,
  onEdit,
  onCopy,
  onDelete,
}) => {
  const columns = [
    { key: "workScheduleName" as keyof WorkScheduleInterface, label: "Назва" },
    { key: "hoursPerWeek" as keyof WorkScheduleInterface, label: "Годин на тиждень" },
  ];

  return (
    <GeneralTable
      data={workSchedules}
      columns={columns}
      renderActions={(workSchedule) => (
        <Actions
          onEdit={() => onEdit(workSchedule)}
          onCopy={() => onCopy(workSchedule)}
          onDelete={() => onDelete(workSchedule.id)}
          editTitle="Edit"
          copyTitle="Copy"
          deleteTitle="Delete"
        />
      )}
    />
  );
};

export default workScheduleTable;
