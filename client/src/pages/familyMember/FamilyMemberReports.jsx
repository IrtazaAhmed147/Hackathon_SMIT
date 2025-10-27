import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { createReport, getFamilyMemberReports } from "../../redux/actions/reportActions.js";
import CreateReportModal from "../../components/modal/CreateReportModal.jsx";
import { notify } from "../../utils/HelperFunctions.js";
import { getSingleFamilyMember } from "../../redux/actions/familyMemberActions.js";
import { analyzeReport } from "../../redux/actions/aiAction.js";
import CreateVitalModal from "../../components/modal/CreateVitalModal.jsx";
import { createVital, deleteVital, getMemberVitals, getSingleVital, updateVital } from "../../redux/actions/vitalActions.js";
import ReportTable from "../../components/tables/ReportTable.jsx";
import VitalCard from "../../components/cards/VitalCard.jsx";
import { clearVital } from "../../redux/slices/vitalSlice.js";

const FamilyMemberReports = () => {
  const dispatch = useDispatch();
  const { memberId } = useParams(); // 👈 from route /family/:memberId
  const [openModal, setOpenModal] = useState(false);
  const [openVitalModal, setOpenVitalModal] = useState(false);

  const { reports, reportLoading, reportError } = useSelector(
    (state) => state.report
  );
  const { familyMember } = useSelector(
    (state) => state.familyMember
  );
  const { aiLoading } = useSelector(
    (state) => state.ai
  );
  const {vital, vitals, vitalLoading } = useSelector(
    (state) => state.vital
  );

const handleSubmitVital = async (formData) => {
  if (
    !formData.bloodPressure.trim() ||
    !formData.bloodSugar.trim() ||
    !formData.heartRate.trim() ||
    !formData.height.trim() ||
    !formData.temperature.trim() ||
    !formData.weight.trim()
  ) {
    notify("error", "All fields are required");
    return;
  }

  formData.memberId = memberId;

  try {
    if (vital?._id) {
      // 🔁 Update existing vital
      await dispatch(updateVital(vital._id, formData));
      notify("success", "Vital updated successfully");
    } else {
      // ➕ Create new vital
      await dispatch(createVital(formData));
      notify("success", "Vital added successfully");
    }

    dispatch(getMemberVitals(memberId));
    setOpenVitalModal(false);
  } catch (err) {
    notify("error", "Failed to save vital");
  }
};


  const handleDeleteVital = async (vitalId) => {
    if (!window.confirm("Are you sure you want to delete this vital?")) return;

    try {
      await dispatch(deleteVital(vitalId));
      notify("success", "Vital deleted successfully");

      // 🔄 Re-fetch vitals after deletion
      dispatch(getMemberVitals(memberId));
    } catch (error) {
      notify("error", "Failed to delete vital");
    }
  };

  const handleUpdateVital = async (vitalId) => {
  try {
    await dispatch(getSingleVital(vitalId));
    setOpenVitalModal(true);
  } catch (error) {
    notify("error", "Failed to fetch vital data");
  }
};


  const handleSubmitReport = async (formData) => {
    formData.append("memberId", memberId);

    try {
      // Step 1: Create the report
      const id = await dispatch(createReport(formData));
      console.log(id);

      if (!id) {
        notify("error", "Failed to create report");
        return;
      }

      // Step 2: Analyze report only if creation succeeded
      try {
        await dispatch(analyzeReport(id));
        notify("success", "Report analyzed successfully");
        dispatch(getFamilyMemberReports(memberId));
      } catch (analyzeErr) {
        console.error(analyzeErr);
        notify("error", "Report created but analysis failed.");
      }
      setOpenModal(false);
    } catch (err) {
      console.error(err);
      notify("error", err || "Failed to create report");
    }
  };


  useEffect(() => {
    if (memberId) {
      dispatch(getFamilyMemberReports(memberId));
      dispatch(getSingleFamilyMember(memberId));
      dispatch(getMemberVitals(memberId));


    }
  }, [dispatch, memberId]);

  return (
    <Box sx={{ p: { xs: 1, md: 6 }, bgcolor: "#f8fafb", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: 2, sm: 4, md: 4 },
          flexWrap: "wrap",
          gap: { xs: 1, sm: 2, md: 2 },
        }}
      >
        <Typography sx={{ fontSize: { xs: '27px', md: '40px' } }} fontWeight="bold" color="text.primary">
          {familyMember?.memberName?.charAt(0)?.toUpperCase() + familyMember?.memberName?.slice(1)}'s Reports
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Upload Report Button */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
            sx={{
              background: "linear-gradient(135deg, #40b77d, #34a3c8)",
              textTransform: "none",
              fontSize: { xs: '12px', md: '16px' },
              borderRadius: 2,
              px: { xs: 1, md: 3 },
              "&:hover": {
                background: "linear-gradient(135deg, #34a3c8, #40b77d)",
              },
            }}
          >
            Upload Report
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(clearVital());
              setOpenVitalModal(true)}} // 👈 Route for that family member’s vitals
            sx={{
              background: "linear-gradient(135deg, #1f9a1bff, #2455aaff)",
              textTransform: "none",
              borderRadius: 2,
              fontSize: { xs: '12px', md: '16px' },
              px: { xs: 1, md: 3 },
              "&:hover": {
                background: "linear-gradient(135deg, #1b7e17ff, #174087ff)",
              },
            }}
          >
            Add Vitals
          </Button>
        </Box>
      </Box>

      {openModal && <CreateReportModal
        aiLoading={aiLoading}
        reportLoading={reportLoading}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmitReport}
        
      />}
      {openVitalModal && <CreateVitalModal
        // aiLoading={aiLoading}
        loading={vitalLoading}
        open={openVitalModal}
        onClose={() => setOpenVitalModal(false)}
        onSubmit={handleSubmitVital}
        vital={vital || {}}
      />
      }

      {/* familyMember Info Card */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: { xs: 1, md: 2 },
          backgroundColor: "white",
          borderRadius: 3,

          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          p: { xs: "10px", md: 3 },
          mb: { xs: 2, sm: 5, md: 5 },
        }}
      >
        <Typography variant="subtitle1" sx={{ fontSize: { xs: "13px", md: "15px" } }}>
          <strong>Name:</strong> {familyMember?.memberName}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontSize: { xs: "13px", md: "15px" } }}>
          <strong>Relation:</strong> {familyMember?.relation}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontSize: { xs: "13px", md: "15px" } }}>
          <strong>Age:</strong> {familyMember?.age}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontSize: { xs: "13px", md: "15px" } }}>
          <strong>Gender:</strong> {familyMember?.gender}
        </Typography>
      </Box>

      {/* Loading / Error / Empty States */}
      {reportLoading ? (
        <Box sx={{ textAlign: "center", mt: 10 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading Reports...</Typography>
        </Box>
      ) : reportError ? (
        <Typography color="error" align="center" mt={5}>
          Failed to load reports. Please try again later.
        </Typography>
      ) : reports?.length === 0 ? (
        <Typography align="center" mt={5}>
          No reports found for this member.
        </Typography>
      ) : (
        <Paper
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
          }}
        >
          <Table>
            <TableHead
              sx={{
                background: "linear-gradient(135deg, #40b77d, #34a3c8)",
              }}
            >
              <TableRow>
                <TableCell sx={{ p: { xs: 1, md: 2 }, fontSize: { xs: "10px", md: "15px" }, color: "white", fontWeight: "bold" }}>
                  Report Name
                </TableCell>
                <TableCell sx={{ p: { xs: 1, md: 2 }, fontSize: { xs: "10px", md: "15px" }, color: "white", fontWeight: "bold" }}>
                  Doctor
                </TableCell>
                <TableCell sx={{ p: { xs: 1, md: 2 }, fontSize: { xs: "10px", md: "15px" }, color: "white", fontWeight: "bold" }}>
                  Hospital
                </TableCell>
                <TableCell sx={{ p: { xs: 1, md: 2 }, fontSize: { xs: "10px", md: "15px" }, color: "white", fontWeight: "bold" }}>
                  Date
                </TableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              {reports.map((report, i) => (
                <ReportTable {...report} key={i} />
              ))}
            </TableBody>
          </Table>

        </Paper>
      )}
      <Box sx={{ mt: { xs: 3, sm: 4, md: 7 } }}>
        <Typography
          sx={{ fontSize: { xs: '27px', md: '40px' } }}
          fontWeight="bold"
          mb={3}
          color="text.primary"
        >
          Vitals
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: 'center', md: 'start' },
            gap: 3,
          }}
        >
          {vitals.length === 0 ? <Typography sx={{ fontSize: { xs: "10px", md: "15px" } }}>No Vitals Added</Typography> : vitals?.map((vital, index) => (
            <VitalCard vital={vital} handleUpdateVital={handleUpdateVital} key={index} handleDeleteVital={handleDeleteVital}
            />
          ))}
        </Box>
      </Box>

    </Box>
  );
};

export default FamilyMemberReports;
