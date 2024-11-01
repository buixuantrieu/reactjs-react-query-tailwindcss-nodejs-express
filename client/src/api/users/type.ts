export interface ILoginInput {
  email: string;
  password: string;
}
export interface IRegisterInput {
  email: string;
  password: string;
}
export interface IVerified {
  id: string;
  activationCode: number;
}
