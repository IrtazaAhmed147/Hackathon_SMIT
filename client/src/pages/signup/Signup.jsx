import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '../login/login.css'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
import { CircularProgress } from '@mui/material';
import { notify } from '../../utils/HelperFunctions';
import { useState } from 'react';


function Signup() {

    const form = useRef({})
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)
    const { isLoading, error, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    const handleForm = async (e) => {
        e.preventDefault()
        if (!form.current.username.trim() || !form.current.email.trim() || !form.current.password.trim()) return;

        await dispatch(registerUser(form.current))
            .then((msg) => {
                notify('success', msg)
                navigate('/login')
            })
            .catch((err) => notify('error', err))
    }
    const handleShowPassword = () => {
        setShowPass((prev) => !prev)
    }

    return (
        <>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

                <form className="form" onSubmit={handleForm}>
                    <div className="flex-column">
                        <label>Username </label></div>
                    <div className="inputForm">
                        <PersonOutlineOutlinedIcon />
                        <input onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} name='username' placeholder="Enter Username" className="input" type="text" required />
                    </div>
                    <div className="flex-column">
                        <label>Email </label></div>
                    <div className="inputForm">
                        <AlternateEmailIcon />
                        <input onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} placeholder="Enter Email" name='email' className="input" type="email" required />
                    </div>
                    <div className="flex-column">
                        <label>Password </label></div>
                    <div className="inputForm">
                        <LockOutlinedIcon />
                        <input onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} name='password' placeholder="Enter Password" className="input"  type={showPass ? "text" : "password"} required />
                        <div onClick={handleShowPassword} style={{ cursor: 'pointer' }}>
                            {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </div>
                    </div>

                    <button className="button-submit">
                        {isLoading && <CircularProgress color="inherit" size="20px" />}
                        Create Account</button>
                    {/* {error && <p>{error}</p>} */}
                    <p className="p">Already have an account? <Link to={'/login'} className="link">Login</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Signup