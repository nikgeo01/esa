// Simple authentication utilities
// For demo purposes, we're using a hardcoded username and password
// In a real application, this would connect to a backend service
const DEMO_USERNAME = 'admin';
const DEMO_PASSWORD = 'password123';
// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('auth') === 'true';
};
// Login function
export const login = (username: string, password: string): boolean => {
  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    localStorage.setItem('auth', 'true');
    return true;
  }
  return false;
};
// Logout function
export const logout = (): void => {
  localStorage.removeItem('auth');
};