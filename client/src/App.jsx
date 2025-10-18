import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './layout/Layout';
import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import Otp from './pages/otp/Otp.jsx';
import NotFound from './pages/notFound/NotFound.jsx';
import UploadReport from './pages/uploadReport/UploadReport.jsx';
import Reports from './pages/reports/Reports.jsx';

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/upload-report' element={<UploadReport />} />
          <Route path='/reports' element={<Reports />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
