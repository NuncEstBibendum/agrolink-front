export interface IAuthResponse {
  accessToken: string;
  email: string;
  profession: "farmer" | "agronomist";
}

export interface LoginResponse extends UserData, IAuthResponse {}

export interface IAuth {
  userId: number;
  accessToken: string;
  refreshToken: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserLoginCredentials {
  email: string;
  password: string;
}

export interface UserCreation extends UserCredentials {
  name: string;
  profession: "farmer" | "agronomist";
}

export interface UpdateCredentialsResponse {
  email: string;
}

export interface UserData {
  email: string;
  name: string;
  profession: "farmer" | "agronomist";
  createdAt: Date;
  updatedAt: Date;
}
