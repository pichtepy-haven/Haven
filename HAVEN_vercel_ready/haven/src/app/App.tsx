import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import AccountTypeSelection from './pages/AccountTypeSelection';

// Patient
import PatientSignIn from './pages/patient/PatientSignIn';
import PatientSignUp from './pages/patient/PatientSignUp';
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientRecords from './pages/patient/PatientRecords';
import AIAssistant from './pages/patient/AIAssistant';
import SharingCenter from './pages/patient/SharingCenter';
import PatientProfile from './pages/patient/PatientProfile';

// Doctor
import DoctorSignIn from './pages/doctor/DoctorSignIn';
import DoctorSignUp from './pages/doctor/DoctorSignUp';
import DoctorDashboard from './pages/doctor/DoctorDashboard';

// Admin
import AdminSignIn from './pages/admin/AdminSignIn';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/select-account" element={<AccountTypeSelection />} />

          {/* Patient Auth */}
          <Route path="/patient/signin" element={<PatientSignIn />} />
          <Route path="/patient/signup" element={<PatientSignUp />} />

          {/* Patient App */}
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/records" element={<PatientRecords />} />
          <Route path="/patient/ai" element={<AIAssistant />} />
          <Route path="/patient/sharing" element={<SharingCenter />} />
          <Route path="/patient/profile" element={<PatientProfile />} />

          {/* Doctor */}
          <Route path="/doctor/signin" element={<DoctorSignIn />} />
          <Route path="/doctor/signup" element={<DoctorSignUp />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

          {/* Admin (direct URL only) */}
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
