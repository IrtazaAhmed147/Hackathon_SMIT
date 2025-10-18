import React, { useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography,
  CircularProgress, Button,
  Box
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getReports } from '../../redux/actions/reportActions';
import ReportCard from '../../components/cards/ReportCard';
import PdfModal from '../../components/modal/PdfModal';

function ReportTable() {
  const dispatch = useDispatch();
  const { reports, reportLoading, reportError,pdfModal } = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  if (reportLoading)
    return (
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <CircularProgress />
      </div>
    );

  if (reportError)
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        Error: {reportError}
      </Typography>
    );

  return (
    <Box  sx={{ mt: 4, borderRadius: 2,padding:'20px',position:"relative" ,height:'100%'}}>
      <Typography variant="h5" sx={{ m: 1 }}>
        All Reports
      </Typography>
      <Table>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><strong>Report Name</strong></TableCell>
            <TableCell><strong>Doctor</strong></TableCell>
            <TableCell><strong>Hospital</strong></TableCell>
            <TableCell><strong>Uploaded On</strong></TableCell>
            <TableCell><strong>PDF File</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {reports && reports.length > 0 ? (
            reports.map((report) => (
              <ReportCard {...report}  key={report._id}/>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No reports found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {pdfModal && <PdfModal/>}
    </Box>
  );
}

export default ReportTable;
