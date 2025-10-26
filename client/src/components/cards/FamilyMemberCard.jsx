import { Card, CardContent, Typography, Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function FamilyMemberCard({ memberName, relation, _id }) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: 180,
        height: 140,
        borderRadius: 3,
        boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderTop: "5px solid #34a3c8", // colored top border for modern look
      }}
      onClick={() => navigate(`/reports/family-member/${_id}`)}
    >
      <CardContent sx={{ textAlign: "center", p: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "600", color: "#212121", mb: 0.5 }}
        >
          {memberName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.875rem" }}
        >
          {relation}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FamilyMemberCard;
