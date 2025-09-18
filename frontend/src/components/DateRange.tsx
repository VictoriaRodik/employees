import { Box, TextField, Typography } from "@mui/material";

interface DateRangeProps {
  startDate: string | null;
  endDate: string | null;
  onStartDateChange: (date: string | null) => void;
  onEndDateChange: (date: string | null) => void;
  label?: string;
}

const DateRange = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  label = "Фільтр по датах",
}: DateRangeProps) => {
  // Встановлюємо значення за замовчуванням якщо поля порожні
  const getDefaultStartDate = () => {
    if (startDate) return startDate;
    const currentYear = new Date().getFullYear();
    return `${currentYear}-01-01`;
  };

  const getDefaultEndDate = () => {
    if (endDate) return endDate;
    const currentYear = new Date().getFullYear();
    return `${currentYear}-12-31`;
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStartDateChange(e.target.value || null);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEndDateChange(e.target.value || null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 200 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          label="Від"
          type="date"
          size="medium"
          value={getDefaultStartDate()}
          onChange={handleStartDateChange}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{ flexGrow: 1 }}
        />

        <TextField
          label="До"
          type="date"
          size="medium"
          value={getDefaultEndDate()}
          onChange={handleEndDateChange}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{ flexGrow: 1 }}
        />
      </Box>
    </Box>
  );
};

export default DateRange;
