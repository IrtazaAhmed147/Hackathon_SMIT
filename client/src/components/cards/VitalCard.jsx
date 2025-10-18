import { Box, Divider, Paper, Typography } from '@mui/material'

import FavoriteIcon from "@mui/icons-material/Favorite";
import OpacityIcon from "@mui/icons-material/Opacity";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import React from 'react'

function VitalCard({bloodPressure, sugar, weight, note,createdAt}) {
  return (
    <Paper 
            elevation={3}
            sx={{
                width:'300px',
              p: 3,
              mb: 3,
              borderRadius: 3,
              transition: "0.3s",
              "&:hover": { transform: "scale(1.02)", boxShadow: 6 },
            }}
          >
          
            <Box display="flex" alignItems="center" mb={1}>
              <FavoriteIcon color="error" sx={{ mr: 1 }} />
              <Typography>BP: {bloodPressure || "—"}</Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={1}>
              <OpacityIcon color="info" sx={{ mr: 1 }} />
              <Typography>Sugar: {sugar || "—"} mg/dL</Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={1}>
              <FitnessCenterIcon color="success" sx={{ mr: 1 }} />
              <Typography>Weight: {weight || "—"} kg</Typography>
            </Box>

            <Box display="flex" alignItems="center" mt={1}>
              <NoteAltIcon color="disabled" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {note || "No notes"}
              </Typography>
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 2 }}
            >
              {new Date(createdAt).toLocaleString()}
            </Typography>
          </Paper>
  )
}

export default VitalCard