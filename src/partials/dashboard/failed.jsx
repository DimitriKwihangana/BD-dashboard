import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, fetchProjects } from '../../features/dataSlice';
import { useCallback } from "react";
import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';

function Failed() {
  const dispatch = useDispatch();

  const handleFechProjects = useCallback(() => {
    dispatch(fetchProjects());
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    handleFechProjects();
  }, [handleFechProjects]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const clients = useSelector((state) => state.data.clients);
  const projects = useSelector((state)=>state.data.projects)
  console.log(projects, 'the projects')
  const submitted = projects.filter(project => project.status === 'Failed');
  console.log(submitted, 'projects');

  return (
    <div className="flex h-screen overflow-hidden">
    {/* Sidebar */}
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

    {/* Content area */}
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden m-5">
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 ">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100"> Failed Projects</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-y-auto h-full ">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Sector</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                submitted.map(customer => {
                  return (
                    <tr key={customer.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          
                          <div className="font-medium text-slate-800 dark:text-slate-100">{customer.name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer.sector}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-red-500">{customer.status}</div>
                      </td>
                     
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
    </div>
    </div>
  );
}

export default Failed;
