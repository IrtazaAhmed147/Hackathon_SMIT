import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '../login/login.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
import { CircularProgress } from '@mui/material';
import { notify } from '../../utils/HelperFunctions';

function Signup() {
  const form = useRef({});
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  const handleForm = async (e) => {
    e.preventDefault();
    if (!form.current.username?.trim() || !form.current.email?.trim() || !form.current.password?.trim()) return;
    await dispatch(registerUser(form.current))
      .then((msg) => {
        notify('success', msg);
        navigate('/login');
      })
      .catch((err) => notify('error', err));
  };

  const handleShowPassword = () => setShowPass((prev) => !prev);

  return (
    <div className='container'>
      <form
        className="login-form"
        onSubmit={handleForm}
        style={{
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          width: '360px',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#000',
            marginBottom: '1.5rem',
            fontWeight: '700',
          }}
        >
          Create Your HealthMate Account
        </h2>

        <div className="flex-column">
          <label>Username</label>
        </div>
        <div className="inputForm">
          <PersonOutlineOutlinedIcon />
          <input
            onChange={(e) => (form.current = { ...form.current, [e.target.name]: e.target.value })}
            name="username"
            placeholder="Enter Username"
            className="input"
            type="text"
            required
          />
        </div>

        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <AlternateEmailIcon />
          <input
            onChange={(e) => (form.current = { ...form.current, [e.target.name]: e.target.value })}
            name="email"
            placeholder="Enter Email"
            className="input"
            type="email"
            required
          />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <LockOutlinedIcon />
          <input
            onChange={(e) => (form.current = { ...form.current, [e.target.name]: e.target.value })}
            name="password"
            placeholder="Enter Password"
            className="input"
            type={showPass ? 'text' : 'password'}
            required
          />
          <div onClick={handleShowPassword} style={{ cursor: 'pointer' }}>
            {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </div>
        </div>

        <button
          disabled={isLoading}
          className="button-submit"
         
        >
          {isLoading ? <CircularProgress color="inherit" size="20px" /> : 'Create Account'}
        </button>

        <p
          className="p"
          style={{
            marginTop: '1.2rem',
            textAlign: 'center',
            color: '#555',
            fontSize: '0.9rem',
          }}
        >
          Already have an account?{' '}
          <Link to="/login" className="link" style={{ color: '#2196f3', fontWeight: '600' }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
