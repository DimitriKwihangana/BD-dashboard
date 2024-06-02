import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import FinancialProposal from "./financial";
import CurrentSales from "./currentsales";
import Meet from "./meet";
import ChartThree from "./donut";
import ClusteredBarchat from "./clusteredbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, fetchClients } from "../features/dataSlice";
import { useCallback } from "react";
import CardWinrate from "./winrate";
import ClusteredBarchat1 from "./longcluster";
import DropdownCou from "./dropdown";
import { Link } from "react-router-dom";
import Invoiced from "./invoiced";

function Dashboard({contractmoney, invoiced}) {
  
  const dispatch = useDispatch();
  const handleFetchProjects = useCallback(() => {
    dispatch(fetchProjects());
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    handleFetchProjects();
  }, [handleFetchProjects]);

  const projects = useSelector((state) => state.data.projects);
// filtering running projects

  const ProjectsFilter = projects.filter(project => project.status === 'Project');


    const [statusArrays, setStatusArrays] = useState({});
    const [countprojects, setCountprojects] = useState(0)
   const [ active, setActive] = useState(0)
  const [waitingcount, setwaiting] = useState(0)
  const [failed, setFailed] = useState(0)
  const [prepipeline , setPrepipeline] = useState(0)
  const [Q1, setQ1] = useState([]);
  const [Q2, setQ2] = useState([]);
  const [Q3, setQ3] = useState([]);
  const [Q4, setQ4] = useState([]);
  const [year2025, setYear2025] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [contractvalue, setContractValue] = useState([])

  useEffect(() => {
    const organizeProjectsByStatus = () => {
      let tempStatusArrays = {};
      projects.forEach((project) => {
        if (tempStatusArrays[project.status]) {
          tempStatusArrays[project.status].push(project);
        } else {
          tempStatusArrays[project.status] = [project];
        }
      });
  
      setStatusArrays(tempStatusArrays);
    };
  
    organizeProjectsByStatus(); 

    
    
    // counting the projects and assigning to a variable
    
    const projectcount = statusArrays.Project? statusArrays.Project.length: 0;
    setCountprojects(projectcount)
    // counting active bids by status and assigning them to variables
    const competitive = statusArrays.Competitive? statusArrays.Competitive.length:0 ;
    const grantApplication = statusArrays.GrantApplication ? statusArrays.GrantApplication.length: 0;
    const EOI = statusArrays.EOI ? statusArrays.EOI.length: 0;
    const Proposals = statusArrays.Proposal ? statusArrays.Proposal.length:0;
    const singlesource = statusArrays.Singlesourcing? statusArrays.Singlesourcing.length:0;

// setting variables that goes in the proposal Card
    const waitingcount = statusArrays.Waiting? statusArrays.Waiting.length:0;
    setwaiting(waitingcount)
    const active = competitive + grantApplication+ EOI + Proposals +singlesource 
   setActive(active)
  const Failed = statusArrays.Failed? statusArrays.Failed.length:0;
  setFailed(Failed)

const PrePipeline = statusArrays.PrePipeline? statusArrays.PrePipeline.length:0;
setPrepipeline(PrePipeline)

//  assigning the projects by their sector
    const theprojects = statusArrays.Project ? statusArrays.Project:[]
    const countProjectsBySector = (projects, sector) => {
      let count = 0;
      projects.forEach(project => {
          if (project.sector.includes(sector)) {
              count++;
          }
      });
      return count;
  };
  const Environment = countProjectsBySector(theprojects, "Environment&Climate");
  const PSDTrade = countProjectsBySector(theprojects, "PSD&Trade");
  const Finance = countProjectsBySector(theprojects, "Finance");
  const Foodsystems = countProjectsBySector(theprojects, "Food systems");
  const Other = countProjectsBySector(theprojects, "Other");
  const Gender = countProjectsBySector(theprojects, "Gender");
  const Education = countProjectsBySector(theprojects, "Education");
  const Agriculture = countProjectsBySector(theprojects, "Agriculture");
  const Private = countProjectsBySector(theprojects, "private");

    setUseractive(prevState => ({
      ...prevState,
      datasets: [
        {
          ...prevState.datasets[0],
          data: [competitive, singlesource, grantApplication, EOI, Proposals],
        },
      ],
    }));
    setSector(prevState => ({
      ...prevState,
      datasets: [
        {
          ...prevState.datasets[0],
          data: [Agriculture, Foodsystems, PSDTrade, Private, Education,Environment,Gender,Finance,Other],
        },
      ],
    }));

    // counting total contract value

    

// counting in quaters

 const q1Projects = [];
    const q2Projects = [];
    const q3Projects = [];
    const q4Projects = [];
    const projects2025 = [];

    ProjectsFilter.forEach(project => {
      const date = new Date(project.deliverydate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (year === 2024) {
        if (month >= 1 && month <= 3) {
          q1Projects.push(project);
        } else if (month >= 4 && month <= 6) {
          q2Projects.push(project);
        } else if (month >= 7 && month <= 9) {
          q3Projects.push(project);
        } else if (month >= 10 && month <= 12) {
          q4Projects.push(project);
        }
      } else if (year === 2025) {
        projects2025.push(project);
      }
    });

    setQ1(q1Projects);
    setQ2(q2Projects);
    setQ3(q3Projects);
    setQ4(q4Projects);
    setYear2025(projects2025);
    
    const q1count = q1Projects? q1Projects.length :0;
    const q2count = q2Projects? q2Projects.length :0;
    const q3count = q3Projects? q3Projects.length :0;
    const q4count = q4Projects? q4Projects.length :0;
    const count2025 = projects2025? q1Projects.length :0;

    setUProject(prevState => ({
      ...prevState,
      datasets: [
        {
          ...prevState.datasets[0],
          data: [q1count, q2count, q3count, q4count, count2025],
        },
      ],
    }));

 

  }, [projects, ProjectsFilter]); 

  // Extract counts for each status

  // Calculate sums
  
  // Continue with calculations for other statuses

  const xTitleGraph = "Grades";
  const legend = "top"; // Set legend position if needed
  const showlegend = true;

  const [theword, setSelectedWord] = useState("Rwanda");

  const handleOptionSelect = (theword) => {
    setSelectedWord(theword);
    // You can perform any other actions with the selected word here
  };
  const [usersector, setSector] = useState({
    labels: [
      "Agriculture",
      "Food Systems & Nutrition",
      "Trade Policy & Export Dev",
      "Private Sector Dev",
      "Education",
      "climate & Env",
      "Gender & Inclusion",
      "Finance",
      "Other",
    ],
    datasets: [
      {
        label: [
          "Agriculture",
          "Food Systems & Nutrition",
          "Trade Policy & Export Dev",
          "Private Sector Dev",
          "Education",
          "climate & Env",
          "Gender & Inclusion",
          "Finance",
          "Other",
        ],
        data: [6, 9, 8, 1, 4, 5, 5, 2],
        backgroundColor: [
          "rgba(8, 122, 188)",
          "rgba(157, 195, 229)",
          "rgba(140,207,152)",
          "rgba(127,127,127)",
          "rgba(73,113,30)",
          "rgba(3,80,127)",
          "rgba(11,157,0)",
          "rgba(0,162,255)",
        ],
        borderColor: [
          "rgba(8, 122, 188)",
          "rgba(157, 195, 229)",
          "rgba(140,207,152)",
          "rgba(127,127,127)",
          "rgba(73,113,30)",
          "rgba(3,80,127)",
          "rgba(11,157,0)",
          "rgba(0,162,255)",
        ],
        borderWidth: 1,
      },
    ],
  });
  const [userproject, setUProject] = useState({
    labels: ["Q1", "Q2", "Q3", "Q4","2025"],
    datasets: [
      {
        label: ["Strategy", "Research", "M&E", " Implementation"],
        data: [0, 9, 8, 6,3],
        backgroundColor: [
          "rgba(8, 122, 188)",
          "rgba(157, 195, 229)",
          "rgba(140,207,152)",
          "rgba(127,127,127)",
          "rgba(11,157,0)",
        ],
        borderColor: [
          "rgba(8, 122, 188)",
          "rgba(157, 195, 229)",
          "rgba(140,207,152)",
          "rgba(127,127,127)",
          "rgba(11,157,0)",
        ],
        borderWidth: 1,
        maxBarThickness: 25,
      },
    ],
  });
 
  const [useractive, setUseractive] = useState({
    labels: ["Competitive", "Single Sourcing", "Grant App", "EOI", "Proposals"],
    datasets: [
      {
        label: ["Proposals", "Concept", "Grant-App", "EOI"],
        data: [0, 0, 0, 0,0],
        backgroundColor: [
          "rgba(8, 122, 188)",
          "rgba(157, 195, 229)",
          "rgba(140,207,152)",
          "rgba(127,127,127)",
          "rgba(11,157,0)",
        ],
        borderColor: [
          "rgba(8, 122, 188)",
          "rgba(157, 195, 229)",
          "rgba(140,207,152)",
          "rgba(127,127,127)",
          "rgba(11,157,0)",
        ],
        borderWidth: 1,
        maxBarThickness: 25,
      },
    ],
  });
  const sales = 5
  const deficit =  sales - contractmoney

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 p-3 overflow-y-auto overflow-x-hidden">
        <main className="flex-grow">
          <h2 className="text-center text-3xl text-black font-mono font-bold mr-6">
            <DropdownCou onOptionSelect={handleOptionSelect} />
            BUSINESS'S STATUS
          </h2>{" "}
          <div className="flex justify-center items-center h-full">
            <div className="flex-1 h-full bg-blue-50">
              <h2 className="text-center text-2xl text-[#087ABC]">BIDDING PROPOSALS</h2>{" "}
              <div className="flex justify-center flex-wrap">
                <div className="w-full sm:w-1/2 p-1">
                  <DashboardCard07
                   waiting={waitingcount}
                   active={active}
                   failed={failed}
                   prepipeline={prepipeline}
                  />
                </div>
                <div className="w-full sm:w-1/2 p-1">
                  <ClusteredBarchat
                    chartData={useractive}
                    xTitle={xTitleGraph}
                    unit={"5"}
                    legend={false}
                    lgd={showlegend}
                    yTitle="Active Bids"
                    product={"Grain"}
                  />
                </div>
              </div>
              <p className="text-center text-2xl">Financial Status/ Rwf Billion </p>
              <div className="flex justify-center flex-wrap">
                <div className="w-full sm:w-1/2 p-4">
                  <FinancialProposal amount={contractmoney} />
                  <CurrentSales />
                  <Meet  deficit={deficit}/>
                  <Invoiced  amount={invoiced}/>
                </div>
                <div className="w-full sm:w-1/2 p-4">
                  <ChartThree contract={contractmoney}  sales={sales} Invoiced={invoiced}/>
                </div>
              </div>
            </div>
            <div className="flex-1 h-full bg-green-50">
              <Link to='/listpro'><h2 className="text-center text-2xl text-green-700">
                <span> {countprojects} </span> PROJECTS
              </h2>{" "}</Link>
              <div className="flex justify-center flex-wrap">
                <div className="w-full pl-4 ">
                  <ClusteredBarchat1
                    chartData={usersector}
                    xTitle={xTitleGraph}
                    unit={"t"}
                    legend={legend}
                    lgd={showlegend}
                    yTitle="Sector"
                    product={"Grain"}
                  />
                </div>
                <div className="w-full  p-4"
                      onClick={() => setShowModal(true)}
                >
                  <ClusteredBarchat1
                    chartData={userproject}
                    xTitle={xTitleGraph}
                    unit={"3"}
                    legend={legend}
                    lgd={showlegend}
                    yTitle="Project Duration"
                    product={"Grain"}
                  />
                </div>
                {/* <CardWinrate winRate={{ totalContracts: 0, wonContracts: 0, winRate: 0 }} /> */}
              </div>
            </div>
          </div>
          { showModal && (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="relative bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-xl transform transition-all ">
          <div className="px-6 py-4">
            <div className="text-lg font-semibold mb-2">Project Duration</div>
            <div className="mb-4">
  <p className="font-bold text-black  text-lg">Quater 1</p>
  <ul className="list-disc pl-5">
    {/* Map over projects for Quater 1 */}
    {Q1.map((project, index) => (
      <li key={index}>
        <span className="font-bold">{project.name}</span> 
        <span className="text-green-500 font-semibold"> - {project.deliverydate}</span>
      </li>
    ))}
  </ul>
</div>
<div className="mb-4">
<p className="font-bold text-black  text-lg">Quater 2</p>
  <ul className="list-disc pl-5">
    {/* Map over projects for Quater 2 */}
    {Q2.map((project, index) => (
      <li key={index}>
        <span className="font-bold">{project.name}</span> 
        <span className="text-green-500 font-semibold"> - {project.deliverydate}</span>
      </li>
    ))}
  </ul>
</div>
<div className="mb-4">
<p className="font-bold text-black  text-lg">Quater 3</p>
  <ul className="list-disc pl-5">
    {/* Map over projects for Quater 3 */}
    {Q3.map((project, index) => (
      <li key={index}>
        <span className="font-bold">{project.name}</span> 
        <span className="text-green-500 font-semibold"> - {project.deliverydate}</span>
      </li>
    ))}
  </ul>
</div>
<div className="mb-4">
<p className="font-bold text-black  text-lg">Quater 4</p>
  <ul className="list-disc pl-5">
    {/* Map over projects for Quater 4 */}
    {Q4.map((project, index) => (
      <li key={index}>
        <span className="font-bold">{project.name}</span> 
        <span className="text-green-500 font-semibold"> - {project.deliverydate}</span>
      </li>
    ))}
  </ul>
</div>
<div className="mb-4">
<p className="font-bold text-black  text-lg">Year 2025</p>
  <ul className="list-disc pl-5">
    {/* Map over projects for Quater 4 */}
    {Q4.map((project, index) => (
      <li key={index}>
        <span className="font-bold">{project.name}</span> 
        <span className="text-green-500 font-semibold"> - {project.deliverydate}</span>
      </li>
    ))}
  </ul>
</div>

          </div>
          <div className="px-6 py-4 flex justify-end">
            
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )}

        </main>

      </div>
    </div>
  );
}

export default Dashboard;
