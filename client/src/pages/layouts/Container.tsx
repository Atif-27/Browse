import Navbar from "@/components/shared/bars/Navbar";
import Sidebar from "@/components/shared/bars/Sidebar";
import { Outlet } from "react-router-dom";

export default function Container() {
  return (
    <div className=" flex flex-col h-screen bg-secondary_gray  text-white ">
      {/* <button onClick={handleLogin}>Login</button> */}

      <Navbar />
      <div className="flex  max-md:flex-col-reverse h-full overflow-hidden">
        <Sidebar />
        <div className="flex-1   overflow-y-auto p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
