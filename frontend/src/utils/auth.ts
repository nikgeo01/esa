import api from '../services/api';

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

// Login function
export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await api.post('/token/', {
      username,
      password,
    });
    localStorage.setItem('token', response.data.access);
    if (response.data.refresh) {
      localStorage.setItem('refresh_token', response.data.refresh);
    }
    return true;
  } catch (error) {
    return false;
  }
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
};