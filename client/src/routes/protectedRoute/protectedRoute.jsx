import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const [isChecking, setIsChecking] = useState(true);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const authUser = async () => {

      try {
        const res = await axios.get('http://localhost:8800/api/auth/checkauth', {
          withCredentials: true
        })
        console.log(res);
        if (!res.data.success) {
          setIsValid(false);
          localStorage.removeItem("user");
        }
      } catch (error) {
        // console.log('error ==>>>>>', error.response.data);
        setIsValid(false);
        localStorage.removeItem("user")
      }
      finally {
        setIsChecking(false);
      }

    }
    authUser()
  }, [])

  if (isChecking) return null;

  if (!isValid) {
    return <Navigate to="/login" />;
  }
  return children;
}