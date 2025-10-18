import { Link, useNavigate } from 'react-router-dom'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './login.css'
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';
import { CircularProgress } from '@mui/material';
import { notify } from '../../utils/HelperFunctions';
import { useState } from 'react';
function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)
    const { isLoading, error, user } = useSelector((state) => state.auth)
    const form = useRef({})


    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    const handleForm = async (e) => {
        e.preventDefault()

        if (!form.current.username.trim() || !form.current.password.trim()) return;

        dispatch(loginUser(form.current))
            .then((msg) => notify('success', msg))
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
                        <AlternateEmailIcon />
                        <input placeholder="Enter your username" name='username' className="input" type="text" onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} required />
                    </div>

                    <div className="flex-column">
                        <label>Password </label></div>
                    <div className="inputForm">
                        <LockOutlinedIcon />
                        <input placeholder="Enter your Password" name='password' onChange={(e) => form.current = { ...form.current, [e.target.name]: e.target.value }} className="input" type={showPass ? "text" : "password"} required />
                        <div onClick={handleShowPassword} style={{cursor: 'pointer'}}>
                            {showPass ? <VisibilityIcon />:  <VisibilityOffIcon /> }
                        </div>
                    </div>

                    {/* <div className="flex-row">
                        <div>
                            <input type="radio" />
                            <label> Remember me </label>
                        </div>
                        <span className="span">Forgot password?</span>
                    </div> */}
                    {/* {error && <p>{error}</p>} */}
                    <button disabled={isLoading} className="button-submit">
                        {isLoading && <CircularProgress color="inherit" size="20px" />}

                        Sign In</button>
                    <p className="p">Don't have an account? <Link to={'/signup'} className="link">Sign Up</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Login