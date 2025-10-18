import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ProductCard() {
    return (
        <Box sx={{ width: '188px', height: '290px', border: '1px solid #dddddd', borderRadius: '10px', position: 'relative' }}>

            <Box sx={{ width: '100%', height: '65%' }}>
                <Box sx={{ width: '100%', height: '100%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} component={'img'} src='https://img.drz.lazcdn.com/static/pk/p/8fbd60d21ae94bf205274af96a6d4412.jpg_400x400q80.jpg_.webp' />
            </Box>
            <Box sx={{ width: '100%', height: '35%', padding: '10px' }}>
                <Typography fontWeight={'bold'} fontSize={12}>Wireless Bluetooth Headset 5.3 Bluetooth...</Typography>
                <Typography fontSize={16} color='#f57224' fontWeight={'600'}>Rs.808</Typography>
                <Typography fontSize={12} color='gray' sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{textDecoration: 'line-through'}}>Rs.2999</span>
                     -73%</Typography>

            </Box>
        </Box>
    )
}

export default ProductCard