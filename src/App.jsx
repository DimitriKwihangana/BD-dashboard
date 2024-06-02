import React, { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  const [totalFinancialContract, setTotalFinancialContract] = useState(0);
  const [totalmoneyInvoiced, setTotalMoneyInvoiced] = useState(0)
  console.log(totalmoneyInvoiced,'ddd')

  function minimize (value){
    const billion = value/1e9
    return billion.toFixed(2)
  }

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard contractmoney={minimize(totalFinancialContract)} invoiced={minimize(totalmoneyInvoiced)} />} />
        <Route path="/register/projects" element={<Projects />} />
        <Route path="/register/clients" element={<Clients />} />
        <Route path="/prepipeline" element={<Prepipeline />} />
        <Route path="/listpro" element={<ProjectList setTotalFinancialContract={setTotalFinancialContract}  setTotalMoneyInvoiced={setTotalMoneyInvoiced}/>} /> {/* Add this route */}
        <Route path="/waiting" element={<Submitted />} />
        <Route path="/failed" element={<Failed />} />
        <Route path="/active" element={<Active />} />
        <Route path="/aflakiosk" element={<Active />} />
      </Routes>
    </>
  );
}

export default App;
