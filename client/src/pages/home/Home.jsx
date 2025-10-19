import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getVitals } from "../../redux/actions/vitalActions";
import VitalCard from "../../components/cards/VitalCard.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const { vitals, vitalLoading } = useSelector((state) => state.vital);

  useEffect(() => {
    dispatch(getVitals());
  }, [dispatch]);

  return (
    <Box  sx={{ padding:'20px' }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        color="textSecondary"
        gutterBottom
      >
        Health Vitals Dashboard
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        Track and monitor your latest health vitals.
      </Typography>

      {vitalLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          // height="50vh"
        >
          <CircularProgress color="primary" />
        </Box>
      ) : vitals && vitals.length > 0 ? (
        vitals.map((vital, index) => (
        <VitalCard {...vital} key={index}/>
        ))
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          width="100%"
        >
          No vitals found. Please add one.
        </Typography>
      )}
    </Box>
  );
}
