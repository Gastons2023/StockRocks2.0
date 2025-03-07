import { UserLogin } from "../interfaces/UserLogin";

export const login = async (userInfo: UserLogin) => {
  // Replace with your actual API endpoint
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data;
};
