export type User = {
  username: string;
  email: string;
  password: string;
};

const isClient = typeof window !== 'undefined';

const getUserKey = (user: User) => {
  return `user_${user.email}`; // User-specific key (you can use email or username)
};

export const saveUser = (user: User) => {
  if (!isClient) return; // Only run this on the client side
  const existingUser = getUser();
  if (!existingUser || existingUser.username !== user.username) {
    sessionStorage.setItem('user', JSON.stringify(user));
  } else {
    console.log('User with this username already exists.');
  }
};

export const getUser = (): User | null => {
  if (!isClient) return null; // Return null if it's not the client side
  const user = sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const validateLogin = (username: string, password: string): boolean => {
  const user = getUser();
  if (!user) {
    return false;
  }
  const isValid = user.username === username && user.password === password;
  if (isValid && isClient) {
    sessionStorage.setItem('isLoggedIn', 'true');
  }
  return isValid;
};

export const isLoggedIn = (): boolean => {
  if (!isClient) return false;
  return sessionStorage.getItem('isLoggedIn') === 'true';
};

export const logout = () => {
  if (!isClient) return; // Only run this on the client side
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('user');
};

export const saveUserPreferences = (
  user: User,
  preferences: Record<string, string>
) => {
  if (!isClient) return; // Only run this on the client side
  const userKey = getUserKey(user);
  sessionStorage.setItem(userKey, JSON.stringify(preferences)); // Save user preferences in sessionStorage
};

export const getUserPreferences = (
  user: User
): Record<string, string> | null => {
  if (!isClient) return null; // Return null if it's not the client side
  const userKey = getUserKey(user);
  const preferences = sessionStorage.getItem(userKey);
  return preferences ? JSON.parse(preferences) : null;
};

export const resetUserPreferences = (user: User) => {
  if (!isClient) return; // Only run this on the client side
  const userKey = getUserKey(user);
  sessionStorage.removeItem(userKey); // Remove user-specific preferences
};
