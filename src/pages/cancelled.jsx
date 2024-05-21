import React from 'react';

const Canceled= () => {
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
      const amount = 3434343
  return (
    
   <div className='col-span-12 rounded-sm border border-stroke bg-white px-1 py-2 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark  xl:col-span-8'>
    <div className='flex  justify-between  align-middle'>

 <h2 className='font-bold text-sm  text-[#7F7F7F]'>CANCELED</h2>
 <p className='font-bold text-[#7F7F7F]'>23</p>
 <h3 className=' text-sm text-center font-bold italic text-[#7F7F7F]'>  {numberWithCommas(amount)} Rwf</h3>
    </div>
   

   </div>

  );
};

export default Canceled;
