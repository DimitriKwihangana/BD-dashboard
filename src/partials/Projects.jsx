import Select from "react-select";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import DashboardCard10 from "./dashboard/DashboardCard10";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, fetchProjects } from "../features/dataSlice";
import { useCallback } from "react";
import axios from "axios";

const Projects = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isloding, setLoading] = useState(false)
  const projectttype = [
    { label: "Research", value: "Research" },
    { label: "Strategy", value: "Strategy" },
    { label: "M&E", value: "M&E" },
    { label: "Implementation", value: "Implementation" },
    { label: "Other", value: "Other" },
  ];
  const win = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
  const status = [
    { label: "EOI", value: "EOI" },
    { label: "Proposal", value: "Proposal" },
    { label: "GrantApplication", value: "GrantApplication" },
    { label: "Waiting", value: "Waiting" },
    { label: "Project", value: "Project" },
    { label: "Finalised", value: "Finalised" },
    { label: "Competitive", value: "Competitive" },
    { label: "Prepipeline", value: "Prepipeline" },
    { label: "Concept Note", value: "Concept Note" },
    { label: "Singlesourcing", value: "Singlesourcing"},
    { label: "Project", value: "Project"},
    
  ];
  const sector = [
    { label: "PSD & Trade", value: "PSD & Trade" },
    { label: "Food Systems", value: "Food Systems" },
    { label: "Finance", value: "Finance" },
    { label: "Environmental&Climate", value: "Environmental&Climate" },
    { label: "Gender", value: "Gender" },
    { label: "Multi-Sector", value: "Multi-Sector" },
    { label: "Other", value: "Other" },
  ];

  const contractType = [
    { label: "Single Sourcing", value: "SC" },
    { label: "Competitive", value: "CC" },
    { label: "FWC", value: "FWC" },
    { label: "Repeat Business", value: "Repeat Business" },
  ];
  const loe = [
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
    { label: "Low", value: "Low" },
  ];
  const currency = [
    { label: "RWF", value: "RWF" },
    { label: "USD", value: "USD" },
  ];

  const Active = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const dispatch = useDispatch();

  const handleFechProjects = useCallback(() => {
    dispatch(fetchProjects());
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    handleFechProjects();
  }, [handleFechProjects]);

  const clients = useSelector((state) => state.data.clients);

  const clientss = clients.map((org) => ({
    value: org.id,
    label: org.client_name,
  }));



  const [thename, setName] = useState(null);
  const [type, setType] = useState(null);
  const [thesector, setSector] = useState(null);
  const [winloose, setWin] = useState(null);
  const [statuss, setStatus] = useState(null);
  const [contract, setContract] = useState(null);
  const [financialcontract, setFinancialContract] = useState(null);
  const [active, setActive] = useState(null);
  const [contractTypee, setContractType] = useState(null);
  const [client, setClients] = useState(null)
  const [loee, setLOE] = useState(null)
  const [currencyy, setCurrency] = useState(null)

  const handleType = (selectedOption) => {
    setType(selectedOption.value);
  };

  const handleSecto = (selectedOption)=>{
    setSector(selectedOption.value)
  }
  const handleWin = (selectedOption)=>{
    setWin(selectedOption.value)
  }  

  const handleStatus = (selectedOption)=>{
    setStatus(selectedOption.value)
  } 
   const handleActive = (selectedOption)=>{
    setActive(selectedOption.value)
  }
  const handleContractType = (selectedOption)=>{
    setContractType(selectedOption.value)
  }
  const handleClients = (selectedOption)=>{
    setClients(selectedOption.value)
  }

const handleLoe  = (selectedOption)=>{
  setLOE(selectedOption.value)
}
const handleCurrency = (selectedOption)=>{
  setCurrency(selectedOption.value)
}


const createProject = async () => {
setLoading(true)
  
  try {
    const response = await axios.post(
      "https://databankvanguard-b3d326c04ab4.herokuapp.com/indicators/project/create/",
      {
        name: thename,
        type: type,
        sector: thesector,
        winloose: winloose,
        status: statuss,
        contract: contract,
        financialcontract: financialcontract,
        pipeline: null,
        datecontract: '3',
        active: active,
        contracttype: contractTypee,
        loe: loee,
        client: client,
      }
    );

    console.log(response.data);
    alert("Done")
    setLoading(false)
     // Log the response data if needed
  } catch (err) {
    setLoading(false)
    alert('failed')
    console.error('Error creating project:', err);
  }
};

  return (
    
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden m-5">
        {/*  Site header */}

        <div className="col-span-full xl:col-span-8 bg-white  shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-5 mb-3">
          {/* <!-- Contact Form --> */}
          <div className="">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black ">Register A Project</h3>
            </div>
            <form action="#" className="w-full">
              {" "}
              {/* Added w-full class */}
              <div className="p-6.5">
                <div className=" mb-4">
                  <label className="mb-2.5 block text-black ">
                    Name of The Project{" "}
                    <span className="text-meta-1 text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your Project"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black ">Client</label>
                    <Select options={clientss}
                    onChange={handleClients}
                    
                    />
                  </div>{" "}
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Project Type
                    </label>
                    <Select options={projectttype} 
                    onChange={handleType}
                    />
                  </div>{" "}
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Status
                    </label>
                    <Select 
                    options={status} 
                    onChange={handleStatus}
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Sector
                    </label>
                    <Select options={sector}
                    onChange={handleSecto}
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Contract Type
                    </label>
                    <Select options={contractType}  
                    onChange={handleContractType}
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Win
                    </label>
                    <Select options={win}
                     onChange={handleWin}
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Active
                    </label>
                    <Select  options={Active} 
                    onChange={handleActive}
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Level of Effort
                    </label>
                    <Select options={loe} 
                    onChange={handleLoe}
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Currency
                    </label>
                    <Select options={currency}
                    onChange={handleCurrency}
                    />
                  </div>
              {currencyy ==='USD'?   <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Exchange rate
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Signed Contract"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>: null}  
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Financial Contract
                    </label>
                    <input
                      type="number"
                      placeholder="Proposal contract"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(event) => setFinancialContract(event.target.value)}
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Contract
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Signed Contract"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(event) => setContract(event.target.value)}
                    />
                  </div>
                </div>
                <button
                   onClick={(e) => {
                    e.preventDefault();
                    createProject();
                  }}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 bg-[#087ABC] my-3  text-cyan-50">
                {isloding ? "loading": "Register"}  
                </button>
              </div>
            </form>
          </div>
        </div>

        <DashboardCard10 />
      </div>
    </div>
  );
};

export default Projects;
