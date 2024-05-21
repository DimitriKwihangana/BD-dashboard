import React from 'react';

const CardWinrate = ({ winRate }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full">
      <h2 className=" text-base font-semibold text-gray-800 ">Win Rate</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Total Competitive Contracts:</p>
          <p className="text-xl font-bold text-green-600">{winRate.totalContracts}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Won Contracts:</p>
          <p className="text-xl font-bold text-green-600">{winRate.wonContracts}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Win Rate:</p>
          <p className="text-base font-bold text-green-600">{winRate.winRate}%</p>
        </div>
      </div>
    </div>
  );
};

export default CardWinrate;
