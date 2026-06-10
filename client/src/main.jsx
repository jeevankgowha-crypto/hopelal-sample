import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import Manager from "./admin/Manager.jsx";
import About from "./pages/About.jsx";
import Appointments from "./pages/Appointments.jsx";
import Blog from "./pages/Blog.jsx";
import Contact from "./pages/Contact.jsx";
import Departments from "./pages/Departments.jsx";
import Doctors from "./pages/Doctors.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";

function ProtectedRoute({ children }) {
  return localStorage.getItem("arigya_token") ? children : <Navigate to="/admin/login" replace />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="departments" element={<Departments />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="contact" element={<Contact />} />
          <Route path="health-blog" element={<Blog />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Manager type="leads" />} />
          <Route path="appointments" element={<Manager type="appointments" />} />
          <Route path="doctors" element={<Manager type="doctors" />} />
          <Route path="settings" element={<Manager type="settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
