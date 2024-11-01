import React from 'react';

const Button = ({ title }) => {
  return (
    <button className="bg-white text-black border border-gray-300 px-4 py-2 rounded cursor-pointer text-lg">
      {title}
    </button>
  );
};

export default Button;