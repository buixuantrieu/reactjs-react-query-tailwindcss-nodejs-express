import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      <div className="flex-1 bg-[#0f1d2feb]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
export default UserLayout;
