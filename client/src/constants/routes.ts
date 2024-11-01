export const ROUTES = {
  AUTH: "/auth",
  VERIFIED: "/Verified",
  ADMIN: {
    DASHBOARD: "/admin",
    HALL_MANAGER: "/admin/hall",
    CREATE_HALL: "/admin/hall/new",
    CINEMA: "/admin/cinema",
    CREATE_CINEMA: "/admin/cinema/new",
    EDIT_CINEMA: "/admin/cinema/:id/edit",
    FACILITY: "/admin/cinema/facility",
    EDIT_FACILITY: "/admin/cinema/facility/:id/edit",
    CREATE_FACILITY: "/admin/cinema/facility/new",
    SHOWTIME: "/admin/show-time",
    MOVIE: "/admin/movie",
    CREATE_MOVIE: "/admin/create-movie",
  },
  USER: {
    HOME: "/",
    BOOKING: "/booking",
  },
};
