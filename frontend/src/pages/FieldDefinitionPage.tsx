import FieldDefinitionList from "../components/fieldDefinitionComponents/FieldDefinitionList";
import { Typography, Box, Paper } from "@mui/material";

const FieldDefinitionsPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Типи полів
      </Typography>
      <Paper
        sx={{
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <FieldDefinitionList />
      </Paper>
    </Box>
  );
};

export default FieldDefinitionsPage;
