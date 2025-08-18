import QualificationGradeList from "../components/qualificationGradeComponents/QualificationGradeList";
import { Typography, Box, Paper } from "@mui/material";

const QualificationGradesPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Розряди
      </Typography>
      <Paper
        sx={{
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <QualificationGradeList />
      </Paper>
    </Box>
  );
};

export default QualificationGradesPage;
