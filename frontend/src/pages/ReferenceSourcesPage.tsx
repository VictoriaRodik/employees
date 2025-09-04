import ReferenceSourceList from "../components/referenceSourceComponents/ReferenceSourceList";
import { Typography, Box, Paper } from "@mui/material";

const ReferenceSourcesPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Reference Sources
      </Typography>
      <Paper
        sx={{
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <ReferenceSourceList />
      </Paper>
    </Box>
  );
};

export default ReferenceSourcesPage;
