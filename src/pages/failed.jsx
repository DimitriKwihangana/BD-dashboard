import React from 'react';

const Failed= () => {
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
      const amount = 3434343
  return (
    
   <div className='col-span-12 rounded-sm border border-stroke bg-white px-1 pt-1 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark  xl:col-span-8'>
    <div className='flex  justify-between   '>

 <h2 className=' w-1/3 font-bold text-sm  text-[#49711E]'>Failed</h2>
 <p className=' w-1/3 font-bold text-[#49711E]'>12</p>
 <h3 className=' w-1/3 text-xs text-center font-bold italic text-[#49711E]'>  {numberWithCommas(amount)} Rwf</h3>
    </div>
  
  

   </div>

  );
};

export default Failed;
