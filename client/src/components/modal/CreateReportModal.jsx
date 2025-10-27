import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Paper,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const CreateReportModal = ({ open, onClose, onSubmit, aiLoading, reportLoading }) => {
  const [form, setForm] = useState({
    reportName: "",
    doctor: "",
    hospital: "",
    reportPdf: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "reportPdf" && files[0]) {
      const file = files[0];
      setForm({ ...form, reportPdf: file });
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    onSubmit(formData);
  };

  const isLoading = aiLoading || reportLoading;

  return (
    <Modal open={open} onClose={!isLoading ? onClose : undefined}>
      <Box
        component="form"
        onSubmit={handleSubmit}
       sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      borderRadius: 3,
      boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
      width: "90%",
      maxWidth: "1000px",
      maxHeight: "90vh", // 👈
      overflowY: "auto", // 👈
      scrollBehavior: "smooth",
      p: { xs: 1, md: 4 },
      display: "flex",
      flexDirection: "column",
      gap: { xs: 2, sm: 3, md: 3 },
      pointerEvents: isLoading ? "none" : "auto",
      opacity: isLoading ? 0.6 : 1,
    }}
      >
        {/* Loading overlay */}
        {isLoading && (
          <Backdrop
            open={true}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 10,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(255,255,255,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3,
            }}
          >
            <Box textAlign="center">
              <CircularProgress size={40} />
              <Typography mt={2} fontWeight={600}>
                {reportLoading
                  ? "Uploading report..."
                  : aiLoading
                  ? "Analyzing report with AI..."
                  : ""}
              </Typography>
            </Box>
          </Backdrop>
        )}

        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={600}>
            Upload Report
          </Typography>
          <IconButton onClick={onClose} disabled={isLoading}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Content */}
        <Box display="flex" sx={{flexDirection:{xs:"column",md:"row"},gap:{xs:2,sm:4,md:4}}} flexWrap={'wrap'}>
          {/* Left: Form Fields */}
          <Box flex={1} display="flex" flexDirection="column" sx={{gap:{xs:1,sm:2,md:2}}}>
            <TextField
              label="Report Name"
              name="reportName"
              value={form.reportName}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              disabled={isLoading}
              size="small"
             
            />
            <TextField
              label="Doctor Name"
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              disabled={isLoading}
              size="small"
            />
            <TextField
              label="Hospital Name"
              name="hospital"
              value={form.hospital}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              disabled={isLoading}
              size="small"
            />

            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{mt:{xs:1,sm:2,md:2}}}>
              <Typography variant="body1" fontWeight={500}>
                Upload Report (PDF)
              </Typography>
              <Button
                variant="contained"
                component="label"
                startIcon={<PictureAsPdfIcon />}
                disabled={isLoading}
                sx={{
                  background: "linear-gradient(135deg, #4caf50, #2196f3)",
                  textTransform: "none",
                  "&:hover": {
                    background: "linear-gradient(135deg, #2196f3, #4caf50)",
                  },
                }}
              >
                Choose File
                <input
                  type="file"
                  name="reportPdf"
                  accept="application/pdf"
                  hidden
                  onChange={handleChange}
                />
              </Button>
            </Box>
            {form.reportPdf && (
              <Typography variant="body2" color="text.secondary">
                Selected File: {form.reportPdf.name}
              </Typography>
            )}
          </Box>

          {/* Right: PDF Preview */}
          <Paper
            elevation={2}
            sx={{
              flex: 1,
              borderRadius: 2,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f9fafb",
            }}
          >
            {previewUrl ? (
              <iframe
                src={previewUrl}
                title="PDF Preview"
                width="100%"
                height="450px"
                style={{ border: "none" }}
              />
            ) : (
              <Box textAlign="center" p={3}>
                <PictureAsPdfIcon sx={{ fontSize: 60, color: "#9e9e9e", mb: 1 }} />
                <Typography color="text.secondary">
                  No PDF Selected — Preview will appear here
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>

        <Divider />

        {/* Buttons */}
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={isLoading}
            sx={{ textTransform: "none", px: 3 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              textTransform: "none",
              px: 3,
              background: "linear-gradient(135deg, #40b77d, #34a3c8)",
              "&:hover": {
                background: "linear-gradient(135deg, #34a3c8, #40b77d)",
              },
            }}
          >
            {reportLoading
              ? "Uploading..."
              : aiLoading
              ? "Analyzing with AI..."
              : "Upload Report"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateReportModal;
