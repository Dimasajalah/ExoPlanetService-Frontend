import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Signin';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import { CsvDataProvider } from './components/CsvDataContext';
import { PlotSettingsProvider } from './components/PlotSettingsContext';
import ScatterHistogramLayout from './components/ScatterHistogramLayout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './KeplerConfirmed/src/pages/Home';
import AboutUs from './KeplerConfirmed/src/pages/AboutUs';
import TestRender from './KeplerConfirmed/src/pages/TestRender';
import SystemList from './KeplerConfirmed/src/pages/SystemList';
import Educational from './KeplerConfirmed/src/pages/Educational';
import SystemDetails from './KeplerConfirmed/src/pages/SystemDetails';
import QuizList from './KeplerConfirmed/src/pages/QuizList';
import QuizPage from './KeplerConfirmed/src/pages/QuizPage';
import Hologram from './KeplerConfirmed/src/pages/Hologram';
import ContactUs from './KeplerConfirmed/src/pages/ContactUs';
import Resources from './KeplerConfirmed/src/pages/Resources';
import Nasamain from './nasamain/Nasamain';
import ServiceLayout from './service/ServiceLayout';
import NasaData from './service/components/NasaAPI/nasaData';
import MarsDataPage from './service/Page/Nasa';
import Destination from './service/components/destination';
import Crew from './service/components/crew';
import Technology from './service/components/technology';
import ServiceHome from './service/Page/Home';
import { ThemeProvider } from './KeplerConfirmed/src/context/ThemeContext2';
import AdminDashboard from './pages/AdminDashboard';
import AdminContacts from './pages/AdminContacts';
import AdminUserTable from './pages/AdminUserTable2';
import AdminStats from './pages/AdminStats';
import AdminSettings from './pages/AdminSettings';
import AdminAuditTrail from './pages/AdminAuditTrail';
import AdminRoute from "./pages/AdminRoute";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <CsvDataProvider>
          <PlotSettingsProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore-data" element={<ScatterHistogramLayout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/nasamain" element={<Nasamain />} />

              <Route path="/about" element={<AboutUs />} />
              <Route path="/test" element={<TestRender />} />
              <Route path="/system-list" element={<SystemList />} />
              <Route path="/educational" element={<Educational />} />
              <Route path="/system-details" element={<SystemDetails />} />
              <Route path="/quiz-list" element={<QuizList />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/hologram" element={<Hologram />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/admin" element={<Admin />} />

              <Route path="/kepler" element={<Home />} />
              <Route path="/kepler/about" element={<AboutUs />} />
              <Route path="/kepler/test" element={<TestRender />} />
              <Route path="/kepler/system-list" element={<SystemList />} />
              <Route path="/kepler/educational" element={<Educational />} />
              <Route path="/kepler/system-details" element={<SystemDetails />} />
              <Route path="/kepler/quiz-list" element={<QuizList />} />
              <Route path="/kepler/quiz" element={<QuizPage />} />
              <Route path="/kepler/hologram" element={<Hologram />} />
              <Route path="/kepler/contact" element={<ContactUs />} />
              <Route path="/kepler/resources" element={<Resources />} />

              <Route path="/ServiceLayout" element={<ServiceLayout />} />
              <Route path="/nasa-photo" element={<NasaData />} />
              <Route path="/nasa-apod" element={<MarsDataPage />} />
              <Route path="/destination" element={<Destination />} />
              <Route path="/crew" element={<Crew />} />
              <Route path="/technology" element={<Technology />} />

              <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin-dashboard/contacts" element={<AdminRoute><AdminContacts /></AdminRoute>} />
              <Route path="/admin-dashboard/users" element={<AdminRoute><AdminUserTable /></AdminRoute>} />
              <Route path="/admin-dashboard/stats" element={<AdminRoute><AdminStats /></AdminRoute>} />
              <Route path="/admin-dashboard/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
              <Route path="/admin-dashboard/audit" element={<AdminRoute><AdminAuditTrail /></AdminRoute>} />
            </Routes>
            <Footer />
          </PlotSettingsProvider>
        </CsvDataProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
