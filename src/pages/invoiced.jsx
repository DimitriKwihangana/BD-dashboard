import React from 'react';

const Invoiced= ({amount}) => {
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
     
  return (
    
   <div className=' col-span-12 rounded-sm border border-stroke bg-white px-5  pb-2 shadow-default dark:border-strokedark dark:bg-boxdark  xl:col-span-8 mt-2'>
    <div className='flex  justify-between '>

 <h2 className='font-bold text-base text-[#7F7F7F] pb-2'>Total Invoiced</h2>

    </div>
    <h3 className=' text-center font-bold italic text-[#7F7F7F] text-3xl'>  {numberWithCommas(amount)}</h3>
   </div>

  );
};

export default Invoiced;
