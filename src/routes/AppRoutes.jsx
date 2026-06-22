import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import Employees from '../pages/Employees';
import Projects from '../pages/Projects';
import Tasks from '../pages/Tasks';
import Revenue from '../pages/Revenue';
import Reports from '../pages/Reports';
import AIInsights from '../pages/AIInsights';
import Settings from '../pages/Settings';
import Login from '../pages/Login';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/ai" element={<AIInsights />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
