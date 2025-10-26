import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
  Tooltip,
  Chip,
  Button,
  CircularProgress,
  List,
  ListItem,
  ToggleButton,
  ToggleButtonGroup,
  Card,
} from "@mui/material";
import {
  ArrowBack,
  FileDownload,
  DeleteOutline,
  EditNote,
  Share,
} from "@mui/icons-material";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleAiInsights } from "../../redux/actions/aiAction";
import { motion } from "framer-motion";
import { deleteReport } from "../../redux/actions/reportActions";
import { notify } from "../../utils/HelperFunctions";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ReportDetailPage() {
  const [language, setLanguage] = useState("english");
  const [numPages, setNumPages] = useState(null);
  const { aiInsight, aiLoading } = useSelector((state) => state.ai);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleAiInsights(id));
  }, [dispatch, id]);

  const report = aiInsight?.fileId;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #e0f7fa 0%, #e3f2fd 40%, #f1f8e9 100%)",
        p: { xs: 2, md: 5 },
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            bgcolor: "white",
            boxShadow: 2,
            "&:hover": { bgcolor: "#e3f2fd" },
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(90deg, #00796b, #0288d1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {report?.reportName || "Medical Report Details"}
        </Typography>
      </Stack>

      {aiLoading ? (
        <Stack alignItems="center" mt={10}>
          <CircularProgress />
          <Typography mt={2}>Loading report...</Typography>
        </Stack>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 4,
          }}
        >
          {/* LEFT: Information + AI Summary */}
          <Stack flex={1} spacing={3}>
            {/* Report Information Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                sx={{
                  backdropFilter: "blur(12px)",
                  background: "rgba(255, 255, 255, 0.75)",
                  borderRadius: 4,
                  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  p: 3,
                }}
              >
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Report Overview
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Typography variant="body1" mb={1}>
                  <strong>Doctor:</strong> {report?.doctor || "N/A"}
                </Typography>
                <Typography variant="body1" mb={1}>
                  <strong>Hospital:</strong> {report?.hospital || "N/A"}
                </Typography>
                <Typography variant="body1" mb={1}>
                  <strong>Date:</strong>{" "}
                  {new Date(report?.createdAt).toLocaleDateString()}
                </Typography>

                <Stack direction="row" spacing={1.5} mt={3}>
                  <Tooltip title="Download PDF">
                    <IconButton
                      onClick={() => window.open(report?.reportPdf, "_blank")}
                      sx={{
                        bgcolor: "#e8f5e9",
                        "&:hover": { bgcolor: "#c8e6c9" },
                      }}
                      color="success"
                    >
                      <FileDownload />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Report">
                    <IconButton
                      sx={{
                        bgcolor: "#fff3e0",
                        "&:hover": { bgcolor: "#ffe0b2" },
                      }}
                      color="warning"
                    >
                      <EditNote />
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Delete Report">
                    <IconButton
                      onClick={() => dispatch(deleteReport(id)).then((msg) => {
                        notify("success", msg)
                        navigate(-1)
                      }).catch((err) => notify("error", err))
                      }
                      sx={{
                        bgcolor: "#ffebee",
                        "&:hover": { bgcolor: "#ffcdd2" },
                      }}
                      color="error"
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Card>
            </motion.div>

            {/* AI Summary */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Card
                sx={{
                  backdropFilter: "blur(12px)",
                  background: "rgba(255, 255, 255, 0.7)",
                  borderRadius: 4,
                  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  p: 3,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="h6" fontWeight="bold">
                    AI Health Summary
                  </Typography>
                  <ToggleButtonGroup
                    size="small"
                    exclusive
                    value={language}
                    onChange={(e, val) => val && setLanguage(val)}
                  >
                    <ToggleButton value="english">English</ToggleButton>
                    <ToggleButton value="urdu">Roman Urdu</ToggleButton>
                  </ToggleButtonGroup>
                </Stack>

                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    color: "#333",
                    whiteSpace: "pre-line",
                  }}
                >
                  {language === "english"
                    ? aiInsight?.summaryEnglish
                    : aiInsight?.summaryRomanUrdu}
                </Typography>

                {aiInsight?.doctorQuestions?.length > 0 && (
                  <Box mt={3}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                      Suggested Questions for Doctor
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {aiInsight.doctorQuestions.map((q, i) => (
                        <Chip
                          key={i}
                          label={q}
                          variant="outlined"
                          sx={{
                            borderColor: "#0288d1",
                            color: "#0288d1",
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                )}

                {aiInsight?.suggestions?.length > 0 && (
                  <Box mt={3}>
                    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                      Health Suggestions
                    </Typography>
                    <List dense>
                      {aiInsight.suggestions.map((s, i) => (
                        <ListItem key={i}>
                          <Typography variant="body2" color="text.secondary">
                            • {s}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {aiInsight?.disclaimer && (
                  <Typography
                    variant="caption"
                    color="error"
                    display="block"
                    mt={2}
                    sx={{ opacity: 0.8 }}
                  >
                    ⚠️ {aiInsight.disclaimer}
                  </Typography>
                )}
              </Card>
            </motion.div>
          </Stack>

          {/* RIGHT: PDF Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                flex: { lg: "0 0 45%" },
                position: { lg: "sticky" },
                top: 100,
                borderRadius: 4,
                overflow: "hidden",
                bgcolor: "#1a1a1a",
                p: 2,
                boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                mb={2}
                color="white"
                align="center"
              >
                PDF Report Preview
              </Typography>

              <Document
                file={report?.reportPdf}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                loading={
                  <Typography color="white" align="center">
                    Loading PDF...
                  </Typography>
                }
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={400}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                ))}
              </Document>
            </Box>
          </motion.div>
        </Box>
      )}
    </Box>
  );
}
