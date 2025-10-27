import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './layout/Layout';
import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import Otp from './pages/otp/Otp.jsx';
import NotFound from './pages/notFound/NotFound.jsx';
import Reports from './pages/reports/Reports.jsx';
import ReportDetailPage from './pages/reportDetailPage/ReportDetailPage.jsx';
import FamilyMemberReports from './pages/familyMember/FamilyMemberReports.jsx';
import Chatbot from './pages/chatbot/Chatbot.jsx';

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
          <Route path='/reports' element={<Reports />} />
          <Route path='/report/:id' element={<ReportDetailPage />} />
          <Route path='/reports/family-member/:memberId' element={<FamilyMemberReports />} />
          <Route path='/chatbot' element={<Chatbot />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
