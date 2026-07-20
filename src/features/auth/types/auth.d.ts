export interface UserData {
  id: string;
  username: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE';
  emailVerified: boolean;
  phoneVerified: boolean;
  role: 'USER' | 'ADMIN';
}

interface AuthResponse {
  user: UserData;
  token: string;
}

interface LoginRequest {
  username: string;
  password: string;
}
