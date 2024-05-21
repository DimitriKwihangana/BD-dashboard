import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import TableOne from '../../components/Tables/TableOne';
import TableThree from '../../components/Tables/TableThree';
import ChartThree from '../../components/Charts/ChartThree';
import ChartPie from '../../components/Charts/ChartPie';

const ActiveProjects: React.FC = () => {
    const dummyData = {
        labels: ["Rwanda Government", "Other Government", "Foundation", "Development Agency", "Business","Other"],
        datasets: [
          {
            label: "Number of Clients",
            data: [2, 3, 2, 3, 2, 6],
            backgroundColor: [
              "rgb(0,162,255)", 
              "rgba(127,127,127 )", 
              "rgba(0, 153, 255)",
              "rgba(73,113,30 )", 
              "rgb(3,80,127)", 
              "rgb(3,80,127)", 
            ],
            borderColor: [
              "rgba(140,207,152, )", 
              "rgba(127,127,127, )", 
              "rgba(0, 153, 255, )",
              "rgba(73,113,30, )", 
              "rgb(3,80,127)", 
              "rgb(3,80,127)", 
            ],
            borderWidth: 1,
            maxBarThickness: 40,
          },
        ],
      };
      
  return (
    <DefaultLayout>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-black-2 text-center text-xl font-bold mb-4'>ACTIVE PROJECTS</h1>

        {/* Cards displaying relevant statistics */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8'>
          {/* Card 1 */}
          <div className='bg-white rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-2   text-lime-600'>Total current Project</h2>
            <p className='text-gray-500 font-bold'>3000000 rwf</p>
          </div>

          {/* Card 2 */}
          <div className='bg-white rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-2 text-blue-700'>Total Amount Invoiced</h2>
            <p className='text-gray-500 font-bold'>3000000 rwf</p>
          </div>

          {/* Card 3 */}
          <div className='bg-white rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-2 text-red-500'>Total ouststanding amount</h2>
            <p className='text-gray-500 font-bold'>3000000 rwf</p>
          </div>
          <div className='bg-white rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-2 text-gray-600'>Amount to meet the target</h2>
            <p className='text-gray-500 font-bold'>3000000 rwf</p>
          </div>
        </div>
        <TableThree/>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartThree
        chartData={dummyData}
        // yTitle="Amount"
        xTitle="Client type"
        unit="$"
        mainTitle=' Type of sector'
   
        lgd={false}
      />
       <ChartThree
        chartData={dummyData}
        // yTitle="Amount"
        xTitle="Client type"
        unit="$"
        mainTitle=' Type of sector'
   
        lgd={false}
      />
       <ChartThree
        chartData={dummyData}
        // yTitle="Amount"
        xTitle="Client type"
        unit="$"
        mainTitle=' Type of work'
   
        lgd={false}
      />
      
     {/* <ChartPie /> */}
      </div>
      
      </div>
       
    </DefaultLayout>
  );
};

export default ActiveProjects;
