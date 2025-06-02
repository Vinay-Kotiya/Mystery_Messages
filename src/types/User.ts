export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
}
