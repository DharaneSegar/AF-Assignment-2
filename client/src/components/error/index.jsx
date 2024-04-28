import React from "react";

export default function Error() {
  return (
    <div id="wrapper" className="flex flex-col items-center mt-10">
      <img
        className="error"
        src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png"
        alt="Error"
      />
      <br />
      <a href="/" className="text-gray-800 mt-4 text-4xl mb-10">
        Login first
      </a>
    </div>
  );
}
