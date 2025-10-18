import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import { Link } from 'react-router-dom';

export const FoodCard = () => {
   return (
        <>
        
            <Box sx={{ width: '320px', height: '248px', border: '1px solid #dddddd', borderRadius: '10px', position: 'relative' }}>
                <Link to={`/`}> 
                <Box sx={{ width: '77px', height: '24px', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor: '#FF2B85', position: 'absolute', top: '10px', left: '10px' }}>
                    <Typography fontSize={12} fontWeight={'bold'} >10%off</Typography>
                </Box>
                <Box sx={{ width: '100%', height: '65%' }}>
                    <Box sx={{ width: '100%', height: '100%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} component={'img'} src={ `https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg`} />
                </Box>
                <Box sx={{ width: '100%', height: '35%', padding: '10px' }}>
                    <Typography fontWeight={'bold'}>{"Kababjees fried chicken"}</Typography>
                    {/* <Typography fontSize={11} >Cakes & Bakery</Typography> */}
                    <Typography fontSize={11} >{'karachi'}</Typography>
                    <Typography fontSize={13} sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <AccessTimeIcon fontSize='12' /> {" "}4 
                        <DirectionsBikeIcon fontSize='12' /> Rs.100</Typography>

                </Box>
                   </Link>
            </Box>
     
        </>
    )
}
