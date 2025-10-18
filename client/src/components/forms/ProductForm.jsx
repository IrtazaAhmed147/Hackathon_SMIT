import { Button, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../redux/actions/productActions';
import { notify } from '../../utils/HelperFunctions';

function ProductForm() {

    const form = useRef({})
    const dispatch = useDispatch()
    const {productLoading,productError}  = useSelector((state)=> state.product)
    const handleSubmit = async (e) => {
        e.preventDefault()
       

            console.log(form.current);
            const formData = new FormData();
            // Append all key-value pairs from form.current
            for (let key in form.current) {
                formData.append(key, form.current[key]);

            }
            console.log(formData);
            

            dispatch(createProduct(formData)).then((msg) => notify('success', msg))
                .catch((err) => notify('error', err))

       
    }

    return (



        <>

            <form onSubmit={handleSubmit}>

                <div >
                    <Typography>Product Name</Typography>

                    <input name='productName' onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} type="text" />
                </div>
                <div >
                    <Typography>Product Description</Typography>
                    <input name='productDescription' onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} type="text" />
                </div>
                <div >
                    <Typography>Product Price</Typography>
                    <input name='productPrice' onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} type="number" />
                </div>
                <div >
                    <Typography>Product Image</Typography>
                    <input name='productImage' onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.files[0] }} type="file" />
                </div>
                {/* <Button variant='contained' color='success'>Create Product</Button> */}
                <button disabled={productLoading}>submit</button>
            </form>

        </>
    )
}

export default ProductForm