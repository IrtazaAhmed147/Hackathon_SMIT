import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
function Food1Card({ name, image, desc, price ,_id}) {

    // const [quantity, setQuantity] = useState(1)
    // const dispatch = useDispatch()
    // const addToCart = ()=> {
    //     console.log(quantity);
    //     console.log(_id);
        
    //     dispatch(addDishToCart(quantity, _id))
    // }

    return (
        <>
            <Box sx={{ display: 'flex', width: '408px', border: "1px solid gray", borderRadius: '10px', padding: '10px', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <Box>
                    <Typography variant='h5'>
                        biryani
                    </Typography>
                    <Typography fontSize={13}>
                        Rs. 400
                    </Typography>
                    <Typography fontSize={13}>
                        best biryani in the world
                    </Typography>
                </Box>
                <Box sx={{position: 'relative'}}>
                    <button style={{ backgroundColor: 'white', position: 'absolute', bottom: '10px', right: '10px', display: 'flex', width: '35px',height:'35px',padding: '0px',border:'1px solid black' ,cursor:'pointer', borderRadius: '50%', }}>
                        <AddIcon style={{margin: 'auto'}}/>
                    </button>
                    <Box component={'img'} src={`https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg`} sx={{ width: '128px', height: '128px' }} />
                </Box>
            </Box>
        </>
    )
}

export default Food1Card