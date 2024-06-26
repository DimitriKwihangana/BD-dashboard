import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, fetchProjects } from '../../features/dataSlice';
import { useCallback } from "react";
import { useEffect } from 'react';
function DashboardCard10() {
  const dispatch = useDispatch();

  const handleFechProjects = useCallback(() => {
    dispatch(fetchProjects());
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    handleFechProjects();
  }, [handleFechProjects]);

  const clients = useSelector((state) => state.data.clients);
  const projects = useSelector((state)=>state.data.projects)
  console.log(projects, 'the projects')

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 ">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Projects</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-y-auto h-80 ">
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
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Financial contract</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                projects.map(customer => {
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
                        <div className="text-left font-medium text-green-500">{customer.status}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{customer.financialcontract}</div>
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
  );
}

export default DashboardCard10;
