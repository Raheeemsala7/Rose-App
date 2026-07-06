export interface User {
  id: string;
  username: string;
  email: string;
  phone: null;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE';
  emailVerified: boolean;
  phoneVerified: boolean;
  role: 'USER' | 'ADMIN';
}

interface AuthResponse {
  user: User;
  token: string;
}
