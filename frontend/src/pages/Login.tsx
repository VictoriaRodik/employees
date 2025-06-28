import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Typography,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import axios from "../api/axiosInstance";

const LoginForm = () => {
  const [error, setError] = useState("");

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Обов’язкове поле"),
    password: Yup.string().required("Обов’язкове поле"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const res = await axios.post("/auth/login", values);
      localStorage.setItem("token", res.data.token);
      setError("");
      window.location.href = "/";
    } catch {
      setError("Невірний логін або пароль");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h5" textAlign="center" mb={2}>
        Вхід у систему
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, handleChange }) => (
          <Form>
            <TextField
              fullWidth
              name="username"
              label="Логін"
              margin="normal"
              onChange={handleChange}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />

            <TextField
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              margin="normal"
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            {error && <Alert variant="outlined" severity="error">{error}</Alert>}

            <Box mt={2} textAlign="center">
              {isSubmitting ? (
                <CircularProgress />
              ) : (
                <Button fullWidth variant="contained" type="submit">
                  Увійти
                </Button>
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
