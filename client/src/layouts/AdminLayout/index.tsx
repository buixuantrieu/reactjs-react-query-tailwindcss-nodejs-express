import Header from "./Header";
import Navigate from "./Navigate";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex">
      <Navigate />
      <div className="flex flex-col min-h-[100vh]">
        <Header />
        <div className="flex-1 bg-[#0f1d2feb]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
