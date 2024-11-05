// utils/auth.ts

export type User = {
  username: string;
  email: string;
  password: string;
};

// Helper function to save user to localStorage if not already present
export const saveUser = (user: User) => {
  if (!getUser()) {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// Helper function to get user from localStorage
export const getUser = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Helper function to validate login credentials
export const validateLogin = (username: string, password: string): boolean => {
  const user = getUser();
  if (!user) {
    return false;
  }
  const isValid =
    user && user.username === username && user.password === password;
  if (isValid) {
    localStorage.setItem('isLoggedIn', 'true'); // Set session flag
  }
  return isValid;
};

// Helper function to check if user is logged in
export const isLoggedIn = (): boolean =>
  localStorage.getItem('isLoggedIn') === 'true';

// Helper function for logout (only removes session flag)
export const logout = () => {
  localStorage.removeItem('isLoggedIn');
};
