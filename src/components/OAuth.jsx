// OAuth.jsx
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    name: result.user.displayName,
    email: result.user.email,
    photo: result.user.photoURL,
  }),
});

if (!res.ok) {
  const errText = await res.text(); // 🔥 Baca sebagai text dulu
  throw new Error(`Google auth failed: ${errText}`);
}

const data = await res.json();
dispatch(signInSuccess(data));
navigate('/');

    } catch (error) {
      console.error('Google sign-in failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      disabled={loading}
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      {loading ? "Loading..." : "Continue with Google"}
    </button>
  );
}
