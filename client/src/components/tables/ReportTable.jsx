
import { Button,  TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ReportTable(report) {
  const navigate = useNavigate()
  return (
    <>

      <TableRow
        key={report._id}
        hover
        sx={{
          "&:hover": { backgroundColor: "#f9f9f9" },
          cursor: "pointer",
        }}
      >
        <TableCell>{report.reportName}</TableCell>
        <TableCell>{report.doctor || "—"}</TableCell>
        <TableCell>{report.hospital || "—"}</TableCell>
        <TableCell>
          {new Date(report.createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell>
          <Button
            size="small"
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              "&:hover": { backgroundColor: "#e3f2fd" },
            }}
            onClick={() => navigate(`/report/${report._id}`)}
          >
            View Report
          </Button>
        </TableCell>
      </TableRow>

    </>

  )
}

export default ReportTable