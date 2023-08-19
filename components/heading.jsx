import React from "react";

const Heading = ({ children }) => {
  return (
    <div className="bg-white px-20 flex items-Center h-28">
      <div className="text-3xl  flex items-center font-semibold">{children}</div>
    </div>
  );
};

export default Heading;
