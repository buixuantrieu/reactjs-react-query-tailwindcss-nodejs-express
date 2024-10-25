import { ConfigProvider } from "antd";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";

import { queryClient } from "@lib/react-query";
import { ROUTES } from "@constants/routes";

import AdminLayout from "@layouts/AdminLayout";

import Auth from "@pages/auth/auth";
import CreateHall from "@pages/admin/CreateHall";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
          colorPrimary: "#531dab",
        },
        components: {
          Input: {
            activeBorderColor: "#d3adf7",
            hoverBorderColor: "#d3adf7",
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path={ROUTES.AUTH} element={<Auth />} />
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.ADMIN.CREATE_HALL} element={<CreateHall />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
