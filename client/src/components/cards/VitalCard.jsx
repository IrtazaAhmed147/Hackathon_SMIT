import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OpacityIcon from "@mui/icons-material/Opacity";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StraightenIcon from "@mui/icons-material/Straighten";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function VitalCard({ vital,handleDeleteVital,handleUpdateVital }) {
  const {
    bloodPressure = "-",
    heartRate = "-",
    temperature = "-",
    bloodSugar = "-",
    weight = "-",
    height = "-",
    note = "",
    createdAt,
  } = vital || {};

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : "—";

  const vitalsList = [
    { icon: <OpacityIcon sx={{ color: "#00796b", fontSize: 18 }} />, label: "Blood Pressure", value: `${bloodPressure} mmHg` },
    { icon: <FavoriteIcon sx={{ color: "#e53935", fontSize: 18 }} />, label: "Heart Rate", value: `${heartRate} bpm` },
    { icon: <DeviceThermostatIcon sx={{ color: "#ff9800", fontSize: 18 }} />, label: "Temperature", value: `${temperature} °F` },
    { icon: <BloodtypeIcon sx={{ color: "#8e24aa", fontSize: 18 }} />, label: "Blood Sugar", value: `${bloodSugar} mg/dL` },
    { icon: <FitnessCenterIcon sx={{ color: "#0288d1", fontSize: 18 }} />, label: "Weight", value: `${weight} kg` },
    { icon: <StraightenIcon sx={{ color: "#43a047", fontSize: 18 }} />, label: "Height", value: `${height} cm` },
  ];

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        background: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        border: "1px solid #e0e0e0",
         position: "relative",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        },
      }}
    >
       <Box
        sx={{
          position: "absolute",
          top: 6,
          right: 6,
          display: "flex",
          gap: 0.5,
        }}
      >
        <IconButton
          size="small"
          color="primary"
          onClick={() => handleUpdateVital(vital._id)}
          sx={{ p: 0.4 }}
        >
          <EditIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={() => handleDeleteVital(vital._id)}
          sx={{ p: 0.4 }}
        >
          <DeleteIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
      <CardContent sx={{ p:{xs:1,md: 2.5} }}>
        {/* Header */}
        <Box textAlign="center" mb={1}>
          <Typography variant="caption" color="text.secondary">
            {formattedDate}
          </Typography>
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        {/* Vertical Vitals List */}
        <Stack spacing={1}>
          {vitalsList.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1,
                py: 0.6,
                gap:1,
                borderRadius: 2,
                backgroundColor: "#fafafa",
                "&:hover": { backgroundColor: "#f3f3f3" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {item.icon}
                <Typography variant="body2" sx={{ fontSize: "0.8rem", fontWeight: 600 }}>
                  {item.label}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }} color="text.secondary">
                {item.value}
              </Typography>
            </Box>
          ))}
        </Stack>

        {/* Notes */}
        {note && (
          <Box mt={1.5}>
            <Divider sx={{ mb: 0.5 }} />
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ fontSize: "0.8rem" }}
            >
              <strong>Note:</strong> {note}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
