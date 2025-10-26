import { Link, useNavigate } from "react-router-dom";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import { notify } from "../../utils/HelperFunctions";
import "./login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const { isLoading, user } = useSelector((state) => state.auth);
  const form = useRef({});

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const handleForm = (e) => {
    e.preventDefault();
    if (!form.current.username?.trim() || !form.current.password?.trim()) return;

    dispatch(loginUser(form.current))
      .then((msg) => notify("success", msg))
      .catch((err) => notify("error", err));
  };

  return (
    <div className="container">

    
    <div className="login-container">
      <form className="login-form" onSubmit={handleForm}>
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to continue to <b>HealthMate</b></p>

        <div className="flex-column">
          <label>Username</label>
        </div>
        <div className="inputForm">
          <AlternateEmailIcon />
          <input
            placeholder="Enter your username"
            name="username"
            className="input"
            type="text"
            onChange={(e) =>
              (form.current = { ...form.current, [e.target.name]: e.target.value })
            }
            required
          />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <LockOutlinedIcon />
          <input
            placeholder="Enter your password"
            name="password"
            type={showPass ? "text" : "password"}
            onChange={(e) =>
              (form.current = { ...form.current, [e.target.name]: e.target.value })
            }
            className="input"
            required
          />
          <div onClick={() => setShowPass(!showPass)} className="password-toggle">
            {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </div>
        </div>

        <button disabled={isLoading} className="button-submit">
          {isLoading ? (
            <CircularProgress color="inherit" size="20px" />
          ) : (
            "Sign In"
          )}
        </button>

        <p className="p">
          Don’t have an account?{" "}
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
    </div>
  );
}

export default Login;
