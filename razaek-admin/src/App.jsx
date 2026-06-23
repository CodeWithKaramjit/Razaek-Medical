import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-serif font-bold text-primary mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-surface-container-high">
          <p className="text-sm font-medium text-on-surface-variant">Total Bookings</p>
          <p className="text-3xl font-serif font-bold text-primary mt-2">124</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-surface-container-high">
          <p className="text-sm font-medium text-on-surface-variant">Active Patients</p>
          <p className="text-3xl font-serif font-bold text-primary mt-2">89</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-surface-container-high">
          <p className="text-sm font-medium text-on-surface-variant">Pending Approvals</p>
          <p className="text-3xl font-serif font-bold text-error mt-2">18</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-surface-container-high">
          <p className="text-sm font-medium text-on-surface-variant">Care Coordinators</p>
          <p className="text-3xl font-serif font-bold text-secondary mt-2">12</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-surface">
        {/* Sidebar */}
        <aside className="w-64 bg-primary text-white flex flex-col">
          <div className="h-20 flex items-center justify-center border-b border-primary-container">
            <h1 className="text-2xl font-serif font-bold tracking-wider text-secondary-fixed">RAZAEK</h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Link to="/" className="block py-2.5 px-4 rounded hover:bg-primary-container transition font-medium">
              Dashboard
            </Link>
            <Link to="/bookings" className="block py-2.5 px-4 rounded hover:bg-primary-container transition font-medium">
              Bookings
            </Link>
            <Link to="/patients" className="block py-2.5 px-4 rounded hover:bg-primary-container transition font-medium">
              Patients
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <header className="h-20 bg-white border-b border-surface-container-high flex items-center justify-between px-8">
            <h1 className="text-xl font-serif font-bold text-primary">Medical Tourism Admin</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-on-surface-variant">Administrator</span>
              <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </header>

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bookings" element={<div className="p-8"><h2 className="font-serif text-2xl text-primary font-bold">Bookings List</h2></div>} />
              <Route path="/patients" element={<div className="p-8"><h2 className="font-serif text-2xl text-primary font-bold">Patients List</h2></div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
