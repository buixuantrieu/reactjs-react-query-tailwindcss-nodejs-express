export interface User {
  id: string;
  email: string;
  password: string;
  isVerified: boolean;
  isActive: boolean;
  activationCode: number;
  failedAttempt: number;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  UserRole: UserRole[];
  Profile?: Profile;
}

export interface Role {
  id: number;
  roleName: string;
  description: string;
  isDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
  UserRole: UserRole[];
}

export interface UserRole {
  id: number;
  roleId: number;
  role: Role;
  userId: string;
  user: User;
}

export interface Profile {
  id: number;
  user: User;
  userId: string;
  fullName?: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: number;
  avatar?: string;
  address?: string;
  districtId?: number;
  provinceId?: number;
  wardId?: number;
  updatedAt: Date;
  provinces?: Province;
  districts?: District;
  wards?: Ward;
}

export interface Province {
  province_id: number;
  name: string;
}

export interface District {
  district_id: number;
  name: string;
}

export interface Ward {
  wards_id: number;
  name: string;
}
