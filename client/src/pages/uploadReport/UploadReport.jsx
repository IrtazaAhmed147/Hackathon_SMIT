import React from 'react'
import ReportForm from '../../components/forms/ReportForm'
import { Box, Typography } from '@mui/material'

function UploadReport() {
  return (
    <>
    <Box sx={{margin:'20px'}}>
    <Typography variant='h4'>Upload Report</Typography>
        <ReportForm/>
    </Box>
    </>
  )
}

export default UploadReport