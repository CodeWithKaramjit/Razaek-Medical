import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500">Total Bookings</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">124</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500">Active Patients</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">89</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500">Pending Approvals</p>
          <p className="text-3xl font-bold text-amber-600 mt-2">18</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-medium text-slate-500">Care Coordinators</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-white flex flex-col">
          <div className="h-20 flex items-center justify-center border-b border-slate-800">
            <h1 className="text-2xl font-bold tracking-wider text-teal-400">RAZAEK</h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Link to="/" className="block py-2.5 px-4 rounded-xl hover:bg-slate-800 transition">
              Dashboard
            </Link>
            <Link to="/bookings" className="block py-2.5 px-4 rounded-xl hover:bg-slate-800 transition">
              Bookings
            </Link>
            <Link to="/patients" className="block py-2.5 px-4 rounded-xl hover:bg-slate-800 transition">
              Patients
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8">
            <h1 className="text-xl font-semibold text-slate-800">Medical Tourism Admin</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">Administrator</span>
              <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </header>

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bookings" element={<div className="p-8"><h2>Bookings List</h2></div>} />
              <Route path="/patients" element={<div className="p-8"><h2>Patients List</h2></div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
