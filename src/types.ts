export type Screen = "registration" | "otp" | "mpin" | "home" | "admin" | "subscriber";

export type Role = "customer" | "subscriber" | "admin";

export interface Account {
  name: string;
  phone: string;
}

export interface ToastMessage {
  id: number;
  title: string;
  detail?: string;
}
