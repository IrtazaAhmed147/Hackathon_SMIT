import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, Grid, TableCell, TableRow } from '@mui/material';
import PdfModal from '../modal/PdfModal';
import { useDispatch } from 'react-redux';
import { isPdfModal } from '../../redux/slices/reportSlice';

function ReportCard(report) {
 
    const dispatch = useDispatch()
  return (
    <>
            
            <TableRow >
                <TableCell>{report.reportName}</TableCell>
                <TableCell>Dr.Ahmed</TableCell>
                <TableCell>Aga Khan</TableCell>
                <TableCell>
                  {new Date(report.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={()=> { dispatch(isPdfModal())
                        
                    } }
                    target="_blank"
                    >
                    View PDF
                  </Button>
                </TableCell>
              </TableRow>


                      </>
              
  )
}

export default ReportCard