import { AuthResponse, LoginRequest } from '../types/auth';

export const loginApi = async ({ username, password }: LoginRequest) => {
  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: ApiResponse<AuthResponse> = await res.json();
  if (!data.status) {
    throw new Error(data.message);
  }

  return data.payload;
};
