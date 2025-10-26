import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

function FeatureCard({icon, title, desc}) {
  return (
  <>
  <Card
              sx={{
                borderRadius: 3,
                boxShadow: 2,
                width: { xs: "100%", sm: "80%", md: "28%" },
                textAlign: "center",
                transition: "transform 0.2s ease",
                "&:hover": { transform: "translateY(-6px)" },
              }}
            >
              <CardContent sx={{ py: 4 }}>
                {icon}
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {title}
                </Typography>
                <Typography
                  color="text.secondary"
                  mb={2}
                  sx={{ fontSize: "0.9rem" }}
                >
                  {desc}
                </Typography>
              
              </CardContent>
            </Card>
  </>
  )
}

export default FeatureCard