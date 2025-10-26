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
import {  useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { createReport, getFamilyMemberReports } from "../../redux/actions/reportActions.js";
import CreateReportModal from "../../components/modal/CreateReportModal.jsx";
import { notify } from "../../utils/HelperFunctions.js";
import { getSingleFamilyMember } from "../../redux/actions/familyMemberActions.js";
import { analyzeReport } from "../../redux/actions/aiAction.js";
import CreateVitalModal from "../../components/modal/CreateVitalModal.jsx";
import { createVital, getMemberVitals } from "../../redux/actions/vitalActions.js";
import ReportTable from "../../components/tables/ReportTable.jsx";
import VitalCard from "../../components/cards/vitalCard.jsx";

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
  const { vitals, vitalLoading } = useSelector(
    (state) => state.vital
  );


  const handleSubmitVital = async (formData) => {

    console.log(formData);
    formData.memberId = memberId;
    await dispatch(createVital(formData)).then((msg) => notify("success", msg));
    setOpenVitalModal(false);
  };
  const handleSubmitReport = async (formData) => {
    formData.append("memberId", memberId);
    await dispatch(createReport(formData)).then((id) => dispatch(analyzeReport(id))).then((msg) => notify("success", msg)).catch((msg) => notify("error", msg));
    setOpenModal(false);
  };

  useEffect(() => {
    if (memberId) {
      dispatch(getFamilyMemberReports(memberId));
      dispatch(getSingleFamilyMember(memberId));
      dispatch(getMemberVitals(memberId));


    }
  }, [dispatch, memberId]);

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, bgcolor: "#f8fafb", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          {familyMember?.memberName}'s Reports
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
              borderRadius: 2,
              px: 3,
              "&:hover": {
                background: "linear-gradient(135deg, #34a3c8, #40b77d)",
              },
            }}
          >
            Upload Report
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenVitalModal(true)} // 👈 Route for that family member’s vitals
            sx={{
              background: "linear-gradient(135deg, #1f9a1bff, #2455aaff)",
              textTransform: "none",
              borderRadius: 2,
              px: 3,
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
      />}

      {/* familyMember Info Card */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          p: 3,
          mb: 5,
        }}
      >
        <Typography variant="subtitle1">
          <strong>Name:</strong> {familyMember?.memberName}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Relation:</strong> {familyMember?.relation}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Age:</strong> {familyMember?.age}
        </Typography>
        <Typography variant="subtitle1">
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
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Report Name
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Doctor
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Hospital
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Action
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
      <Box sx={{ mt: 7 }}>
        <Typography
          variant="h4"
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
            gap: 3,
          }}
        >
          {vitals.map((vital, index) => (
            <VitalCard vital={vital} />
          ))}
        </Box>
      </Box>

    </Box>
  );
};

export default FamilyMemberReports;
