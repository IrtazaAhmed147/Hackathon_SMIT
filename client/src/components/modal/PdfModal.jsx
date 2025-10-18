import { Box } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { isPdfModal } from '../../redux/slices/reportSlice'

function PdfModal() {

        const dispatch = useDispatch()
  return (

    <Box sx={{width:'90%',position:'absolute',top:'20px',backgroundColor:'#fff',height:'100%'}}>
        <button  onClick={()=> dispatch(isPdfModal())}>close</button>
        <iframe
              src={"https://res.cloudinary.com/dl4in7cwc/image/upload/v1760814969/HealthMate___Health_ka_Smart_dost.pdf"}
              title="PDF Preview"
              width="100%"
              height="400px"
              allow="fullscreen"
              style={{
                height:'80vh',
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            ></iframe>
    </Box>
  )
}

export default PdfModal