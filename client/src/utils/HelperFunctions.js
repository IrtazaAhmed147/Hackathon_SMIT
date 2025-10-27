import { toast } from "react-toastify";
import { userReset } from "../redux/slices/authSlice";
import { resetReports } from "../redux/slices/reportSlice";
import { resetAi } from "../redux/slices/aiSlice";
import { resetFamilyMembers } from "../redux/slices/familyMemberSlice";
import { resetVitals } from "../redux/slices/vitalSlice";

export const notify = (theme, msg)=> {
    return toast[theme](msg, {
        position: "top-right",
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: false,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
         
     });
 }


export const handleLogout = async (navigate, dispatch) => {
    try {
      // const res = await api.get('/auth/logout', {
      //   withCredentials: true
      // })

      localStorage.removeItem('user')
      localStorage.removeItem('token')
      dispatch(userReset())
      dispatch(resetReports())
      dispatch(resetAi())
      dispatch(resetFamilyMembers())
      dispatch(resetVitals())
      navigate('/login')

      notify('success', 'User logged out successfully')

    } catch (error) {
      console.log(error);
      notify('error', error.message)

    }

  }