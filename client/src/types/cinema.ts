export type Cinema = {
  id: number;
  name: string;
  logo: string;
};
export type Facility = {
  id: number;
  name: string;
  location: string;
  provinceId: number;
  districtId: number;
  wardId: number;
  cinemaId: number;
  isDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
  cinemas: Cinema;
};
export type Hall = {
  id: number;
  name: string;
  columns: number;
  rows: number;
  facilityId: number;
  isDeleted: boolean;
  seats: number;
  ShowTime: number;
  CinemaFacility: Facility;
};
export type Seat = {
  id: number;
  hallId: number;
  row: string;
  seatNumber: number;
  typeId: number;
  isAvailable: boolean;
  hall: Hall;
  type: number;
  SeatStatus: string[];
};
