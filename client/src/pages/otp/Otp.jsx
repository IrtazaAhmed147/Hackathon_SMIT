import React, { useRef } from 'react'
import './Otp.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { notify } from '../../utils/HelperFunctions'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function Otp() {

    const otp = useRef()
    const token = localStorage.getItem('tempToken')
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/')
        } else if (!token) {
            navigate('/signup')
        }
    }, [user])



    const handleForm = async (e) => {
        e.preventDefault()
        if (otp.current.length !== 6) return
        if(!token) return
        try {
            const res = await axios.post(
                'http://localhost:3200/api/auth/verifyEmail',
                { otp: otp.current },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            localStorage.removeItem('tempToken')
            notify('success', res.data.message)
            navigate('/login')
        } catch (error) {
            console.log(error);
            notify('error', error.response.data.message)
        }
    }

    return (
        <div>
            <section className='otp-container'>
                <div className="otp-box">
                    <h1 className="title">Enter OTP</h1>
                    <form onSubmit={handleForm}>
                        <div id="otp-form">
                            <input type="text" name='input' onChange={(e) => otp.current = e.target.value} className="otp-input" maxLength="6" required />
                        </div>
                        <button id="verify-btn">Verify OTP</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Otp