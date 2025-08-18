import WorkScheduleList from "../components/workScheduleComponents/WorkScheduleList";
import { Typography, Box, Paper } from "@mui/material";

const WorkSchedulesPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Графіки роботи
      </Typography>
      <Paper
        sx={{
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <WorkScheduleList />
      </Paper>
    </Box>
  );
};

export default WorkSchedulesPage;
