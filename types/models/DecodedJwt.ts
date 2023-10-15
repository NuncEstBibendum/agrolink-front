export interface DecodedJwt {
  expirationDate: Date;
  firstName: string;
  lastName: string;
  role: "user" | "agronomist" | "admin";
  email: string;
  token: string;
  userId: number;
}
