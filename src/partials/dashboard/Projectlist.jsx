import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, fetchProjects } from '../../features/dataSlice';
import Sidebar from '../Sidebar';
import Swal from 'sweetalert2';

function ProjectList({ setTotalFinancialContract }) { 
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const projects = useSelector((state) => state.data.projects);
  const ProjectsFilter = projects.filter(project => project.status === 'Project');
  const [checkedProjects, setCheckedProjects] = useState([]);
  

  const numberWithCommas = (number) => {
    if (number === null) return ""; // Return an empty string if number is null
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const handleFetchProjects = useCallback(() => {
    
    dispatch(fetchProjects());
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    handleFetchProjects();
  }, [handleFetchProjects]);

  const clients = useSelector((state) => state.data.clients);
 

 

  const getClientName = (clientId) => {
    const client = clients.find(client => client.id === clientId);
    return client ? client.client_name : 'Unknown Client';
  };

  const handleUpdateStatus = () => {
    // Implement your update logic here, using selectedProject.id and selectedStatus
    console.log("Updating status:", selectedStatus);
    // Reset modal state
    setShowModal(false);
    setSelectedProject(null);
    setSelectedStatus('');

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Project updated",
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleCheckProject = (projectId) => {
    setCheckedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
    console.log(checkedProjects,'checked projects')
  };

  const handleCheckAll = () => {
    if (checkedProjects.length === ProjectsFilter.length) {
      setCheckedProjects([]);
    } else {
      setCheckedProjects(ProjectsFilter.map((project) => project.id));
    }
  };

  const totalFinancialContract = ProjectsFilter.reduce((sum, project) => {
    return checkedProjects.includes(project.id) ? sum + project.contract : sum;
  }, 0);

  // Call setTotalFinancialContract to update the state in the parent component
  useEffect(() => {
    setTotalFinancialContract(totalFinancialContract);
    
  }, [totalFinancialContract, setTotalFinancialContract]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden m-5">
        <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 ">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">Running Projects</h2>
            <div className="mt-2 text-lg font-semibold">
              Total Financial Contract: {numberWithCommas(totalFinancialContract)}
            </div>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-y-auto h-full">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left text-base">
                        <input type="checkbox" onChange={handleCheckAll} checked={checkedProjects.length === ProjectsFilter.length} />
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left text-base">Client Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left text-base">Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left text-base">Sector</div>
                    </th>

                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center text-base">Project Value/Rwf</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center text-base">Total Invoiced</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center text-base">Delivery Date</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center text-base">Update Status</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                  {ProjectsFilter.map((project) => (
                    <tr key={project.id}>
                      <td className="p-2 whitespace-nowrap flex justify-center">
                        <input
                          type="checkbox"
                          checked={checkedProjects.includes(project.id)}
                          onChange={() => handleCheckProject(project.id)}
                        />
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-slate-800 font-bold dark:text-slate-100">{getClientName(project.client)}</div>
                        </div>
                      </td>
                      <td className="p-2 flex-wrap">
                        <div className="flex items-center">
                          <div className="font-medium text-slate-800 dark:text-slate-100">{project.name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{project.sector}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center text-green-500 p-2">{numberWithCommas(project.contract)}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center text-green-500 p-2">{numberWithCommas(project.financialcontract)}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center text-blue-500 p-2">{project.deliverydate}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap flex justify-center">
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setSelectedProject(project);
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

      {/* Modal */}
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
                  <option value="Onhold">Onhold</option>
                  <option value="Finalised">Finalised</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Failed">Failed</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="px-6 py-4 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-slate-100 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStatus}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectList;
