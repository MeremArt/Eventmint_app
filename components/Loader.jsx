import React from "react";
import { TbLoader } from "react-icons/tb";

function Loader() {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-16 items-center">
        {/* <div className="animate-spin"> */}
        <TbLoader size={35} className="animate-spin" />
        {/* </div> */}

        <p className="mt-4 text-md">Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
