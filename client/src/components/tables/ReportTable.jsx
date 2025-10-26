import { TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ReportTable(report) {
  const navigate = useNavigate();

  return (
    <TableRow
      key={report._id}
      hover
      onClick={() => navigate(`/report/${report._id}`)}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: '#e3f2fd',
          transform: 'scale(1.01)',
        },
      }}
    >
      <TableCell sx={{p:{xs:1,md:2},fontSize:{xs:"10px",md:"15px"} }}>{report.reportName}</TableCell>
      <TableCell sx={{p:{xs:1,md:2},fontSize:{xs:"10px",md:"15px"} }}>{report.doctor || '—'}</TableCell>
      <TableCell sx={{p:{xs:1,md:2},fontSize:{xs:"10px",md:"15px"} }}>{report.hospital || '—'}</TableCell>
      <TableCell sx={{p:{xs:1,md:2},fontSize:{xs:"10px",md:"15px"} }}>
        {new Date(report.createdAt).toLocaleDateString()}
      </TableCell>
    </TableRow>
  );
}

export default ReportTable;
