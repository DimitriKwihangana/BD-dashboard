import React from 'react';
import { Link } from 'react-router-dom';
import { fetchClients, fetchProjects } from '../../features/dataSlice';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';



const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


function DashboardCard07({waiting, active, failed, prepipeline}) {
  const dispatch = useDispatch()
  const handleFechProjects = useCallback(() => {
    dispatch(fetchProjects());
    dispatch(fetchClients());
  }, [dispatch]);


  useEffect(() => {
    handleFechProjects();
  }, [handleFechProjects]);


  const projects = useSelector((state)=>state.data.projects)
 
  
  
  
  return (

    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Proposals</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Type</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">No.</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Amount/rwf</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {/* Row */}
              <tr>
                <td className="p-2">
                  <Link to="/prepipeline">
                    <div className="flex items-center">
                      <div className="text-slate-800 dark:text-slate-100">Prepipeline</div>
                    </div>
                  </Link>
                </td>
                <td className="p-2">{prepipeline}
                  <Link to="/prepipeline">
                    <div className="text-center"></div>
                  </Link>
                </td>
                <td className="p-2">
                  <Link to="/prepipeline">
                    <div className="text-center text-emerald-500"></div>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="p-2">
                  <Link to="/waiting">
                    <div className="flex items-center">
                      <div className="text-slate-800 dark:text-slate-100">Waiting</div>
                    </div>
                  </Link>
                </td>
                <td className="p-2">
                  {waiting}
                  <Link to="/waiting">
                    <div className="text-center"></div>
                  </Link>
                </td>
                <td className="p-2">
                  <Link to="/waiting">
                    <div className="text-center text-emerald-500"></div>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="p-2">
                  <Link to="/active">
                    <div className="flex items-center">
                      <div className="text-slate-800 dark:text-slate-100">Active</div>
                    </div>
                  </Link>
                </td>
                <td className="p-2"> {active}
                  <Link to="/active">
                    <div className="text-center"></div>
                  </Link>
                </td>
                <td className="p-2">
                  <Link to="/active">
                    <div className="text-center text-emerald-500"></div>
                  </Link>
                </td>
              </tr>
              {/* <tr>
                <td className="p-2">
                  <Link to="/failed">
                    <div className="flex items-center">
                      <div className="text-slate-800 dark:text-slate-100">Failed</div>
                    </div>
                  </Link>
                </td>
                <td className="p-2">
                  {failed}
                  <Link to="/failed">
                    <div className="text-center"></div>
                  </Link>
                </td>
                <td className="p-2">
                  <Link to="/failed">
                    <div className="text-center text-emerald-500"></div>
                  </Link>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default DashboardCard07;
