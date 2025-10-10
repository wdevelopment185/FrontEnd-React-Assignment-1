import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const statCards = [
  { label: 'Total Documents', value: '4', note: '+3 this month' },
  { label: 'Active Alerts', value: '1', note: '' },
  { label: 'Storage Used', value: '927.69 KB', note: 'of undefined' }
];

const recentDocs = [
  { title: 'Car insurance', meta: 'Uploaded 2 days ago' , status: 'Active'},
  { title: 'House insurance', meta: 'Uploaded 2 days ago' , status: 'Active'},
  { title: 'Washing Machine Invoice', meta: 'Uploaded 2 days ago' , status: 'Active'},
  { title: 'CV', meta: 'Uploaded 2 weeks ago' , status: 'Active'}
];

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const containerRef = useRef(null);
  const [btnStyle, setBtnStyle] = useState({ top: '80px', left: 16 });
  const [sidebarStyle, setSidebarStyle] = useState({ top: '80px', bottom: '0px' });

  useEffect(() => {
    const updatePos = () => {
      const headerEl = headerRef.current;
      const containerEl = containerRef.current;
      const w = window.innerWidth;
      if (!headerEl || !containerEl) return;
      const hdrRect = headerEl.getBoundingClientRect();
      const contRect = containerEl.getBoundingClientRect();


      // Position the button to the left of the "Welcome back!" heading
      // vertically center it inside the header and place it to the left of the content container
      const btnHeight = 40; // approx button size
      const top = Math.round(hdrRect.top + hdrRect.height / 2 - btnHeight / 2);
      // place the button to the left of the main content area (so it sits in the left gap)
      let left = Math.round(contRect.left - 44);

      // if the computed left is too small (offscreen), clamp it
      if (left < 8) left = 8;

      // ensure the button stays visible inside viewport
      if (left < 8) left = 8;

      setBtnStyle({ top: `${top}px`, left: `${left}px` });

      // footer may be outside this component, so query it from the DOM
      const footerEl = document.querySelector('footer');
      let bottomPx = 0;
      if (footerEl) {
        const fRect = footerEl.getBoundingClientRect();
        // if footer top is visible in viewport, compute distance from viewport bottom to footer top
        if (fRect.top < window.innerHeight) {
          bottomPx = Math.max(0, Math.round(window.innerHeight - fRect.top));
        } else {
          bottomPx = 0; // footer not visible yet
        }
      }

      // compute sidebar top so it doesn't overlap header and bottom so it stops above footer
      const sbTop = Math.round(hdrRect.bottom);
      setSidebarStyle({ top: `${sbTop}px`, bottom: `${bottomPx}px` });
    };

    updatePos();
    window.addEventListener('resize', updatePos);
    return () => window.removeEventListener('resize', updatePos);
  }, [open]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="flex">
        {/* Sidebar (toggable on all sizes). Starts below the header so header remains visible */}
  <aside style={{ top: sidebarStyle.top, bottom: sidebarStyle.bottom }} className={`fixed left-0 z-50 w-64 transform bg-white border-r border-gray-100 p-4 transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white font-bold">D</div>
              <div>
                <div className="text-sm font-bold text-gray-900">Document<span className="text-primary-600">Optimizer</span></div>
                <div className="text-xs text-gray-400">Admin</div>
              </div>
            </div>
            <button className="md:hidden text-gray-500" onClick={() => setOpen(false)} aria-label="Close sidebar">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="mt-6">
            <ul className="space-y-1">
              <li>
                <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-blue-600 bg-primary-50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v4H3zM3 13h18v8H3z"/></svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V8H3v11a2 2 0 002 2z"/></svg>
                  Documents
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM21 12v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8"/></svg>
                  Upload
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18"/></svg>
                  Bulk Upload
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.6 14H17v-2a4 4 0 10-8 0v2H5.4c-.36 0-.706.136-.955.379L3 17h5"/></svg>
                  Alerts
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18"/></svg>
                  Folders
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.607 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2"/></svg>
                  Admin
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Page content wrapper */}
        <div className={`flex-1 relative transition-all duration-300 ${open ? 'md:ml-64' : 'md:ml-0'}`}>
          {/* header toggle will be used; no floating button */}
          <header ref={headerRef} className="sticky top-0 z-40 bg-white border-b border-gray-100">
            <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-primary-50" onClick={() => setOpen(!open)} aria-label="Toggle sidebar">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
                  <p className="text-sm text-gray-500">Here's what's happening with your documents today.</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:block">
                  <input type="text" placeholder="Search..." className="border border-gray-200 rounded-lg py-2 px-3 w-64 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Upload</button>
                <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">JD</div>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {statCards.map((s) => (
                <div key={s.label} className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                  <p className="text-sm text-gray-500">{s.label}</p>
                  <div className="mt-3 flex items-baseline justify-between">
                    <p className="text-3xl font-extrabold text-gray-900">{s.value}</p>
                    {s.note && <p className="text-sm text-green-600">{s.note}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Documents</h2>
                    <Link to="#" className="text-sm text-primary-600 hover:underline">View all</Link>
                  </div>
                  <ul className="mt-4 divide-y divide-gray-100">
                    {recentDocs.map((d) => (
                      <li key={d.title} className="py-3 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-md bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center text-white text-lg">📄</div>
                          <div>
                            <p className="font-medium text-gray-900">{d.title}</p>
                            <p className="text-xs text-gray-400">{d.meta}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-green-600">{d.status}</span>
                          <Link to="#" className="text-sm text-primary-600 hover:underline">Open</Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Storage Usage</h3>
                  <p className="mt-2 text-sm text-gray-500">Used: 927.69 KB</p>
                  <div className="mt-4 bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div className="h-3 bg-blue-600 rounded-full" style={{ width: '25%' }} />
                  </div>
                  <p className="mt-2 text-xs text-gray-400">0.0% of storage used</p>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900">Quick Actions</h4>
                    <Link to="#" className="mt-2 inline-block text-sm text-primary-600 hover:underline">Upload Document</Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
