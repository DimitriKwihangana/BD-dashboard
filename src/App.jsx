import React, { useCallback, useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Projects from './partials/Projects';
import Clients from './partials/clients';
import Prepipeline from './partials/dashboard/Prepipeline';
import Submitted from './partials/dashboard/submitted';
import Failed from './partials/dashboard/failed';
import ProjectList from './partials/dashboard/Projectlist';
import Active from './partials/dashboard/activeprojects';



function App() {
  const location = useLocation();
  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
      </Routes>
      <Routes>
        <Route  path="/register/projects" element={<Projects />} />
      </Routes>
      
      <Routes>
        <Route  path="/register/clients" element={<Clients />} />
      </Routes>
      <Routes>
        <Route  path="/prepipeline" element={<Prepipeline />} />
      </Routes>
      <Routes>
        <Route  path="/listpro" element={<ProjectList />} />
      </Routes>
    
      <Routes>
        <Route  path="/waiting" element={<Submitted />} />
      </Routes>
      <Routes>
        <Route  path="/failed" element={<Failed />} />
      </Routes>
      <Routes>
        <Route  path="/active" element={<Active />} />
      </Routes>
      
    </>
  );
}

export default App;
