// src/service/AuthServices.js

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const signUp = async (formData) => {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    credentials: 'include',
  });
  return await res.json();
};

export const signIn = async (formData) => {
  try {
    const res = await fetch(`${API_BASE}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Sign in failed');
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getCurrentUser = async () => {
  const res = await fetch(`${API_BASE}/api/user/me`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch user');
  return await res.json();
};

