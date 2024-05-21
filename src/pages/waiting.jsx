import React from 'react';

const Waiting= () => {
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
      const amount = 3434343
  return (
    
   <div className='col-span-12 rounded-sm border border-stroke bg-white px-1 py-2  shadow-default dark:border-strokedark dark:bg-boxdark  xl:col-span-8'>
    <div className='flex  justify-between '>

    <h2 className='font-bold text-sm  text-[#8CCF98]'>ACTIVE BIDS</h2>
 <p className='font-bold text-[#8CCF98]'>23</p>
    <h3 className=' text-sm text-center font-bold italic text-[#8CCF98]'>  {numberWithCommas(amount)} Rwf</h3>
    </div>

   </div>

  );
};

export default Waiting;
