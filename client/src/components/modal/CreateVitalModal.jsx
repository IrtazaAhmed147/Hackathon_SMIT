import { Box, Button, CircularProgress, Divider, Grid, Modal, Paper, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';

function CreateVitalModal({ open, onClose, onSubmit, loading }) {

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

        onSubmit(formRef.current)
    };
    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { xs: "90%", sm: 600 },
                        outline: "none",
                    }}
                >
                    <Paper
                        elevation={5}
                        sx={{
                            p: {xs:1,md:5},
                            borderRadius: 4,
                            background: "#fdfefe",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                            border: "1px solid #e0e0e0",
                        }}
                    >
                        {/* Header */}
                        <Box mb={3} textAlign="center">
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                sx={{ color: "#00796b", mb: 1, fontSize: "1.2rem" }}
                            >
                                Add Your Health Vitals
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Enter your latest health measurements to track your wellness.
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        {/* Form */}
                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {/* Blood Pressure */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required={true}
                                        fullWidth
                                        name="bloodPressure"
                                        label="Blood Pressure (mmHg)"
                                        placeholder="120/80"
                                        onChange={handleChange}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>

                                {/* Heart Rate */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required={true}
                                        fullWidth
                                        name="heartRate"
                                        label="Heart Rate (bpm)"
                                        placeholder="72"
                                        type="number"
                                        onChange={handleChange}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>

                                {/* Body Temperature */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        name="temperature"
                                        label="Body Temperature (°F)"
                                        placeholder="98.6"
                                        type="number"
                                        onChange={handleChange}
                                        variant="outlined"
                                        size="small"
                                        required={true}
                                    />
                                </Grid>

                                {/* Blood Sugar */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required={true}
                                        fullWidth
                                        name="bloodSugar"
                                        label="Blood Sugar (mg/dL)"
                                        placeholder="100"
                                        type="number"
                                        onChange={handleChange}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>

                                {/* Weight */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required={true}
                                        fullWidth
                                        name="weight"
                                        label="Weight (kg)"
                                        placeholder="70"
                                        type="number"
                                        onChange={handleChange}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>

                                {/* Height */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required={true}
                                        fullWidth
                                        name="height"
                                        label="Height (cm)"
                                        placeholder="175"
                                        type="number"
                                        onChange={handleChange}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>

                                {/* Notes */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="note"
                                        label="Notes / Observations"
                                        placeholder="Any special condition or comments..."
                                        multiline
                                        rows={3}
                                        onChange={handleChange}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                            </Grid>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{
                                    mt: 4,
                                    py: 1.2,
                                    lineHeight:{xs:1,md:1.75},
                                    borderRadius: 3,
                                    fontWeight: 600,
                                    fontSize: {xs:"12px",md:"0.95rem"},
                                    background: "linear-gradient(135deg, #40b77d, #34a3c8)",
                                    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #34a3c8, #40b77d)",
                                    },
                                }}
                                disabled={loading}
                                startIcon={
                                    loading ? <CircularProgress size={20} color="inherit" /> : null
                                }
                            >
                                {loading ? "Saving..." : "Save Vitals"}
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Modal>

        </>
    )
}

export default CreateVitalModal