import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

function CreateVitalModal({ open, onClose, onSubmit, loading, vital = {} }) {
  const [form, setForm] = useState({
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    bloodSugar: "",
    weight: "",
    height: "",
  });

  // 🔁 Prefill when editing
  useEffect(() => {
    if (vital && Object.keys(vital).length > 0) {
      setForm({
        bloodPressure: vital.bloodPressure || "",
        heartRate: vital.heartRate || "",
        temperature: vital.temperature || "",
        bloodSugar: vital.bloodSugar || "",
        weight: vital.weight || "",
        height: vital.height || "",
      });
    } else {
      setForm({
        bloodPressure: "",
        heartRate: "",
        temperature: "",
        bloodSugar: "",
        weight: "",
        height: "",
      });
    }
  }, [vital]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 600 },
        }}
      >
        <Paper
          elevation={5}
          sx={{
            p: { xs: 2, md: 5 },
            borderRadius: 4,
            background: "#fdfefe",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            border: "1px solid #e0e0e0",
          }}
        >
          <Box textAlign="center" mb={3}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "#00796b", mb: 1, fontSize: "1.2rem" }}
            >
              {vital?._id ? "Update Vitals" : "Add Your Health Vitals"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {vital?._id
                ? "Edit your existing vital record."
                : "Enter your latest health measurements."}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
              <TextField
                label="Blood Pressure (mmHg)"
                name="bloodPressure"
                value={form.bloodPressure}
                onChange={handleChange}
                size="small"
                required
                fullWidth
              />
              <TextField
                label="Heart Rate (bpm)"
                name="heartRate"
                value={form.heartRate}
                onChange={handleChange}
                size="small"
                required
                fullWidth
              />
            </Box>

            <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
              <TextField
                label="Body Temperature (°F)"
                name="temperature"
                value={form.temperature}
                onChange={handleChange}
                size="small"
                required
                fullWidth
              />
              <TextField
                label="Blood Sugar (mg/dL)"
                name="bloodSugar"
                value={form.bloodSugar}
                onChange={handleChange}
                size="small"
                required
                fullWidth
              />
            </Box>

            <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
              <TextField
                label="Weight (kg)"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                size="small"
                required
                fullWidth
              />
              <TextField
                label="Height (cm)"
                name="height"
                value={form.height}
                onChange={handleChange}
                size="small"
                required
                fullWidth
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              sx={{
                mt: 2,
                borderRadius: 3,
                background: "linear-gradient(135deg, #40b77d, #34a3c8)",
                "&:hover": { background: "linear-gradient(135deg, #34a3c8, #40b77d)" },
              }}
            >
              {loading
                ? "Saving..."
                : vital?._id
                ? "Update Vital"
                : "Save Vitals"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}

export default CreateVitalModal;
