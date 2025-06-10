import React from "react";

function Spinner({ parentHeight }: { parentHeight: number | string }) {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: parentHeight }}
    >
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-md"></div>
    </div>
  );
}

export default Spinner;