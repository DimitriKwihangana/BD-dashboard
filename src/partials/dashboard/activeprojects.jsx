import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, fetchProjects } from '../../features/dataSlice';
import Sidebar from '../Sidebar';
import Swal from 'sweetalert2';
import axios from 'axios';

function Active() {
  const dispatch = useDispatch();

  const handleFetchProjects = useCallback(() => {
    dispatch(fetchProjects());
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    handleFetchProjects();
  }, [handleFetchProjects]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const clients = useSelector((state) => state.data.clients);
  const projects = useSelector((state) => state.data.projects);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [contractValue, setContractValue] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const submitted = projects.filter(project => 
    ["EOI", "Competitive", "GrantApplication", "Singlesourcing", "Proposal"].includes(project.status)
  );

  const handleUpdateStatus = async () => {
    console.log(selectedProject.id, 'id')
    const updatedProject = {
      ...selectedProject,
      status: selectedStatus,
      financialcontract: contractValue,
      deliverydate: deliveryDate
    };

    try {
      const response = await axios.put(`https://bdashboard-1c6c04306519.herokuapp.com/bd/project/update/${selectedProject.id}/`, updatedProject);

  

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Project updated",
        showConfirmButton: false,
        timer: 1500
      });
 console.log(response)
      // Reset modal state
      setShowModal(false);
      setSelectedProject(null);
      setSelectedStatus('');
      setContractValue('');
      setDeliveryDate('');
    } catch (error) {
      console.error('Failed to update the project:', error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to update project",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden m-5">
        <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">Active Projects</h2>
          </header>
          <div className="p-3">
            <div className="overflow-y-auto h-80">
              <table className="table-auto w-full">
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
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center text-base">Update status</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                  {submitted.map(project => (
                    <tr key={project.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-slate-800 dark:text-slate-100">{project.name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{project.sector}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{project.status}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{project.financialcontract}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap flex justify-center">
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setSelectedProject(project);
                            setSelectedStatus(project.status);
                            setContractValue(project.financialcontract || null);
                            setDeliveryDate(project.deliverydate || null);
                          }}
                          className='bg-[#087ABC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="px-6 py-4">
                <div className="text-lg font-semibold mb-2">Update Project Status</div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                >
                  <option value="">Select Status</option>
                  <option value="Waiting">Waiting</option>
                  <option value="Onhold">Onhold</option>
                  <option value="Project">Project</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Failed">Failed</option>
                  {/* Add more options as needed */}
                </select>
                <div className="text-lg font-semibold mb-2">Update Contract Value</div>
                <input
                  value={contractValue}
                  onChange={(e) => setContractValue(e.target.value)}
                  className='block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md'
                />
                <div className="text-lg font-semibold mb-2">Delivery date</div>
                <input
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className='block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md'
                />
              </div>
              <div className="px-6 py-4 flex justify-end">
                <button
                  onClick={handleUpdateStatus}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="ml-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Active;
