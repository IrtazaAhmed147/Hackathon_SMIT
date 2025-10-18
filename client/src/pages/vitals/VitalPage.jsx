import React, { useRef, useState } from "react";
import {
  Container,
  TextField,
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { createVital } from "../../redux/actions/vitalActions";
import { useDispatch } from "react-redux";
import { notify } from "../../utils/HelperFunctions";

export default function AddVitals() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    formRef.current = {
      ...formRef.current,
      [name]: value,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formRef.current);
    

    dispatch(createVital(formRef.current))
      .then((msg) => notify("success", msg))
      .catch((err) => notify("error", err));
      
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          mt: 4,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          fontWeight="bold"
          gutterBottom
        >
          Add Manual Vitals
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          mb={3}
        >
          Track your health vitals without a lab report.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="bloodPressure"
            label="Blood Pressure (BP)"
            placeholder="e.g. 120/80"
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            name="sugar"
            label="Sugar (mg/dL)"
            placeholder="e.g. 95"
            type="number"
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            name="weight"
            label="Weight (kg)"
            placeholder="e.g. 70"
            type="number"
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            name="note"
            label="Notes"
            placeholder="Any extra notes..."
            multiline
            rows={3}
            margin="normal"
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2, py: 1.2 }}
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {loading ? "Saving..." : "Save Vitals"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
