import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleAiInsights } from "../../redux/actions/aiAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getSingleFamilyMember } from "../../redux/actions/familyMemberActions";
import { deleteReport } from "../../redux/actions/reportActions";
import { notify } from "../../utils/HelperFunctions";
// import { getSingleAiInsights } from "../../redux/aiSlice"; // update path

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ReportDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { aiInsight, aiLoading } = useSelector((state) => state.ai);
   const { familyMember } = useSelector(
      (state) => state.familyMember
    );
    

  const [language, setLanguage] = useState("english");
  const [numPages, setNumPages] = useState(null);

  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getSingleAiInsights(id))
    console.log(aiInsight);
    
  }, [dispatch, id]);

  if (aiLoading || !aiInsight)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );

  const report = aiInsight?.fileId;

  return (
    <Box sx={{ p: { xs: 1, md: 5 }, width: "100%", mx: "auto",background: "linear-gradient(135deg, #6ad8a2, #6bc1dd)" }}>
      {/* ====== Report Header ====== */}
 
  <Paper
      sx={{
        p: {xs:2,sm:3,md:3},
        mb: 3,
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {/* Left Section — Report Info + Family Details */}
      <Box>
        {/* Report Info */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {report?.reportName?.charAt(0)?.toUpperCase() + report?.reportName?.slice(1) || "Medical Report"}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Doctor: {report?.doctor || "Unknown"}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Hospital: {report?.hospital || "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Created On: {new Date(report?.createdAt).toLocaleDateString()}
        </Typography>

        {/* Divider-like spacing */}
        <Box
          sx={{
            mt: 2,
            mb: 1,
            height: "1px",
            backgroundColor: "#eee",
            width: "80%",
          }}
        />

        {/* Family Member Info */}
        {report?.familyMemberId && (
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Family Member Details
            </Typography>
            <Typography variant="body1">
              <strong>Name:</strong> {aiInsight?.fileId.familyMemberId?.memberName || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Relation:</strong> {aiInsight?.fileId.familyMemberId?.relation || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Age:</strong> {aiInsight?.fileId.familyMemberId?.age || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Gender:</strong> {aiInsight?.fileId.familyMemberId?.gender || "N/A"}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Right Section — Action Buttons */}
      <Box display="flex" gap={1} alignItems="center">
      
        {/* Delete */}
        <Tooltip title="Delete Report" arrow>
          <IconButton
            onClick={() => dispatch( deleteReport(report?._id)).then(()=> {
              notify("success", "report deleted successfully")
              navigate(-1)
            })}
            sx={{
              backgroundColor: "#ffebee",
              color: "#d32f2f",
              "&:hover": {
                backgroundColor: "#ffcdd2",
              },
              width: 45,
              height: 45,
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>


      {/* ====== PDF Viewer ====== */}
      <Paper
        sx={{
          p: {xs:1,sm:3,md:3},
          mb: 3,
          borderRadius: 3,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Report PDF
        </Typography>
        {report?.reportPdf ? (
          <>
            <Box
              sx={{
                maxHeight: "70vh",
                overflowY: "auto",
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 1,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Document
                file={report?.reportPdf}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    width={800}
                    
                  />
                ))}
              </Document>
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2,background: "linear-gradient(135deg, #40b77d, #34a3c8)" }}
              href={report?.reportPdf}
              target="_blank"
            >
              Open Full PDF
            </Button>
          </>
        ) : (
          <Typography>No PDF available</Typography>
        )}
      </Paper>

      {/* ====== Summary Section ====== */}
      <Paper
        sx={{
          p: {xs:1,sm:3,md:3},
          mb: 3,
          borderRadius: 3,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Box display="flex" flexWrap={"wrap"} gap={1} justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Summary
          </Typography>
          <Button
            size="small"
            variant="outlined"
            sx={{background: "linear-gradient(135deg, #40b77d, #34a3c8)", color:"#fff"}}
            onClick={() =>
              setLanguage(language === "english" ? "roman" : "english")
            }
          >
            {language === "english" ? "Show Roman Urdu" : "Show English"}
          </Button>
        </Box>
        <Typography sx={{ mt: 2, lineHeight: {xs:1.4,sm:1.5,md:1.7} }}>
          {language === "english"
            ? aiInsight?.summaryEnglish
            : aiInsight?.summaryRomanUrdu}
        </Typography>
      </Paper>

      {/* ====== Abnormal Values ====== */}
      {aiInsight?.abnormalValues?.length > 0 && (
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Abnormal Values
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Parameter</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aiInsight.abnormalValues.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.parameter}</TableCell>
                  <TableCell>{item.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* ====== Doctor Questions ====== */}
      {aiInsight?.doctorQuestions?.length > 0 && (
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Questions for Doctor
          </Typography>
          {aiInsight.doctorQuestions.map((q, i) => (
            <Box key={i} display="flex" alignItems="start" mb={1}>
              <Typography color="primary" mr={1}>
                •
              </Typography>
              <Typography>{q}</Typography>
            </Box>
          ))}
        </Paper>
      )}

      {/* ====== AI Suggestions ====== */}
      {aiInsight?.suggestions?.length > 0 && (
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            AI Suggestions
          </Typography>
          {aiInsight.suggestions.map((s, i) => (
            <Box key={i} display="flex" alignItems="center" mb={1}>
              <Typography color="success.main" mr={1}>
                ✔
              </Typography>
              <Typography>{s}</Typography>
            </Box>
          ))}
        </Paper>
      )}

      {/* ====== Disclaimer ====== */}
      <Paper
        sx={{
          p: 2,
          borderRadius: 3,
          boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
          backgroundColor: "#f7f7f7",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ fontStyle: "italic" }}
        >
          ⚠️ {aiInsight?.disclaimer}
        </Typography>
      </Paper>
    </Box>
  );
}
