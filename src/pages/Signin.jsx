// src/pages/Signin.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { signIn, getCurrentUser } from '../service/AuthServices';

export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      dispatch(signInFailure('Email dan password wajib diisi.'));
      return;
    }

    try {
      dispatch(signInStart());
      const loginResponse = await signIn(formData);

      if (!loginResponse || loginResponse.message !== 'Login successful') {
        dispatch(signInFailure(loginResponse?.message || 'Login gagal.'));
        return;
      }

      const userData = await getCurrentUser();
      dispatch(signInSuccess(userData));

      localStorage.setItem('role', userData.role);
      navigate(userData.role === 'admin' ? '/admin-dashboard' : '/');

    } catch (err) {
      dispatch(signInFailure('Terjadi kesalahan saat masuk. Silakan coba lagi.'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 font-['Roboto Mono']">
      <div className="bg-white/90 p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl text-center font-semibold mb-6 text-gray-800">Sign In</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? 'Memproses...' : 'Sign In'}
          </button>
          <OAuth />
        </form>

        <div className="flex gap-2 mt-5 text-sm">
          <p>Belum punya akun?</p>
          <Link to="/signup" className="text-blue-700 font-semibold">Sign Up</Link>
        </div>

        {error && <p className="text-red-500 mt-3 text-sm">⚠️ {error}</p>}
      </div>
    </div>
  );
}



