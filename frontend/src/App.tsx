import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
export function App() {
  return <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="projects" element={<Projects />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>;
}