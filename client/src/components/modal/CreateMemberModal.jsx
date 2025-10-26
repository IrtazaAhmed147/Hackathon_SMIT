import React from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CreateMemberModal = ({
  open,
  handleClose,
  formData = {}, // ✅ default to avoid undefined
  handleChange,
  handleSubmit,
  familyLoading,
}) => {
  // ✅ Ensure controlled inputs have default values
  const safeForm = {
    name: formData.name || "",
    relation: formData.relation || "",
    age: formData.age || "",
    gender: formData.gender || "",
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 3,
          p: 4,
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" fontWeight="bold">
            Add Family Member
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form */}
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Member Name"
            name="name"
            value={safeForm.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Relation"
            name="relation"
            value={safeForm.relation}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={safeForm.age}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            select
            label="Gender"
            name="gender"
            value={safeForm.gender}
            onChange={handleChange}
            sx={{ mb: 3 }}
            required
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            disabled={familyLoading}
            fullWidth
            sx={{
              backgroundColor: "#34a3c8",
              textTransform: "none",
              fontWeight: "bold",
              py: 1.2,
              "&:hover": { backgroundColor: "#2d8ab0" },
            }}
          >
            {familyLoading ? "Saving..." : "Save Member"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateMemberModal;
