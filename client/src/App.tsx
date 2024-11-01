import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";

import { queryClient } from "@lib/react-query";
import { ROUTES } from "@constants/routes";

import AdminLayout from "@layouts/AdminLayout";
import UserLayout from "@layouts/UserLayout";

import Auth from "@pages/auth/auth";
import Verified from "@pages/auth/Verified";

import Dashboard from "@pages/admin/Dashboard";
import ShowTime from "@pages/admin/ShowTime";
import HallManager from "@pages/admin/HallManager";
import CreateHall from "@pages/admin/CreateHall";
import CinemaManager from "@pages/admin/CinemaManager";
import CreateCinema from "@pages/admin/CreateCinema";
import CreateFacility from "@pages/admin/CreateFacility";
import EditCinema from "@pages/admin/EditCinema";
import FacilityManager from "@pages/admin/FacilityManager";
import EditFacility from "@pages/admin/EditFacility";
import MovieManager from "@pages/admin/MovieManager";
import CreateMovie from "@pages/admin/CreateMovie";

import BookingTicket from "@pages/user/BookingTicket";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path={ROUTES.AUTH} element={<Auth />} />
        <Route path={ROUTES.VERIFIED} element={<Verified />} />
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.HALL_MANAGER} element={<HallManager />} />
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.ADMIN.SHOWTIME} element={<ShowTime />} />
          <Route path={ROUTES.ADMIN.CREATE_HALL} element={<CreateHall />} />
          <Route path={ROUTES.ADMIN.CINEMA} element={<CinemaManager />} />
          <Route path={ROUTES.ADMIN.CREATE_CINEMA} element={<CreateCinema />} />
          <Route path={ROUTES.ADMIN.CREATE_FACILITY} element={<CreateFacility />} />
          <Route path={ROUTES.ADMIN.EDIT_CINEMA} element={<EditCinema />} />
          <Route path={ROUTES.ADMIN.FACILITY} element={<FacilityManager />} />
          <Route path={ROUTES.ADMIN.EDIT_FACILITY} element={<EditFacility />} />
          <Route path={ROUTES.ADMIN.MOVIE} element={<MovieManager />} />
          <Route path={ROUTES.ADMIN.CREATE_MOVIE} element={<CreateMovie />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.BOOKING} element={<BookingTicket />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
