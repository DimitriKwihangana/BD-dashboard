import React from 'react';

const Meet= () => {
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
      const amount = 0
  return (
    
   <div className=' col-span-12 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark  xl:col-span-8 mt-2'>
    <div className='flex  justify-between '>

 <h2 className='font-bold text-base text-[#7F7F7F] pb-2'>Deficit</h2>

    </div>
    <h3 className=' text-center font-bold italic text-[#7F7F7F] text-3xl'>  {numberWithCommas(amount)}</h3>
   </div>

  );
};

export default Meet;
