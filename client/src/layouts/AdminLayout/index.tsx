import Header from "./Header";
import Footer from "./Footer";
import Navigate from "./Navigate";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex">
      <Navigate />
      <div className="flex flex-col min-h-[100vh]">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;
