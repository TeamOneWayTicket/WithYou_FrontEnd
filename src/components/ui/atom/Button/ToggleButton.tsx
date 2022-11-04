import React from 'react';

const ToggleButton = () => {
  return (
    <label htmlFor="disabled-toggle" className="inline-flex relative items-center cursor-pointer">
      <input type="checkbox" value="" id="disabled-toggle" className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );
};

export default ToggleButton;
