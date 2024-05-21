import React from 'react';

const FinancialProposal= ({amount}) => {
  
  const numberWithCommas = (number) => {
    if (number == null) return '';
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
    
  return (
    
   <div className=' col-span-12 rounded-sm border border-stroke bg-white px-5 pt-6  pb-2 shadow-default dark:border-strokedark dark:bg-boxdark  xl:col-span-8'>
    <div className='flex  justify-between '>

 <h2 className='font-bold text-base  text-[#087ABC] '>Total Contract Value</h2>

    </div>
    <h3 className=' text-center font-bold italic text-[#087ABC]  text-3xl'>  {numberWithCommas(amount)} </h3>
   </div>

  );
};

export default FinancialProposal;
