import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  CircularProgress,
  Divider,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OpacityIcon from "@mui/icons-material/Opacity";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { useDispatch, useSelector } from "react-redux";
import { getVitals } from "../../redux/actions/vitalActions";

export default function Home() {
  const dispatch = useDispatch();
  const { vitals, vitalLoading } = useSelector((state) => state.vital);

  useEffect(() => {
    dispatch(getVitals());
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" color="textSecondary" gutterBottom>
        Health Vitals Dashboard 
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        Track and monitor your latest health vitals.
      </Typography>

      {vitalLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {vitals && vitals.length > 0 ? (
            vitals.map((vital, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
                  }}
                >
                  <Typography variant="h6" color="primary" mb={1}>
                    Record #{index + 1}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Box display="flex" alignItems="center" mb={1}>
                    <FavoriteIcon color="error" sx={{ mr: 1 }} />
                    <Typography>BP: {vital.bloodPressure || "—"}</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={1}>
                    <OpacityIcon color="info" sx={{ mr: 1 }} />
                    <Typography>Sugar: {vital.sugar || "—"} mg/dL</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={1}>
                    <FitnessCenterIcon color="success" sx={{ mr: 1 }} />
                    <Typography>Weight: {vital.weight || "—"} kg</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mt={1}>
                    <NoteAltIcon color="disabled" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {vital.note || "No notes"}
                    </Typography>
                  </Box>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mt: 2 }}
                  >
                    {new Date(vital.createdAt).toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" textAlign="center" width="100%">
              No vitals found. Please add one.
            </Typography>
          )}
        </Grid>
      )}
    </Container>
  );
}
