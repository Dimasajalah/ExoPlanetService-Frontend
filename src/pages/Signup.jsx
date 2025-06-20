// src/pages/SignUp.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { signUp } from '../service/AuthServices';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user', // default ke 'user'; bisa diganti ke 'admin' saat testing
  });

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      dispatch(signInFailure('Semua kolom wajib diisi.'));
      return;
    }

    try {
      dispatch(signInStart());

      const data = await signUp(formData);

      if (!data || data.success === false) {
        dispatch(signInFailure(data.message || 'Registrasi gagal.'));
        return;
      }

      dispatch(signInSuccess(data));

      localStorage.setItem('role', data.role);
      navigate(data.role === 'admin' ? '/admin-dashboard' : '/');

    } catch (err) {
      dispatch(signInFailure('Terjadi kesalahan saat mendaftar.'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 font-['Roboto Mono']">
      <div className="bg-white/90 p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl text-center font-semibold mb-6 text-gray-800">Sign Up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />
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

          {/* Optional Role Selector (for dev/testing only) */}
          <select
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? 'Memproses...' : 'Sign Up'}
          </button>
          <OAuth />
        </form>

        <div className="flex gap-2 mt-5 text-sm">
          <p>Sudah punya akun?</p>
          <Link to="/login" className="text-blue-700 font-semibold">Sign In</Link>
        </div>

        {error && <p className="text-red-500 mt-3 text-sm">⚠️ {error}</p>}
      </div>
    </div>
  );
}
