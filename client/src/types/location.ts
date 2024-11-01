export type Province = {
  province_id: number;
  name: string;
};
export type District = {
  district_id: number;
  province_id: number;
  name: string;
};
export type Ward = {
  wards_id: number;
  district_id: number;
  name: string;
};
