// src/pages/Profile.jsx

import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAuth, getIdToken } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from '../redux/user/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const auth = getAuth(app);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [tempImage, setTempImage] = useState(null);

  useEffect(() => {
    console.log('Profile rerendered. currentUser.avatar:', currentUser?.avatar);
  }, [currentUser?.avatar]);

  useEffect(() => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setTempImage(fileUrl);
      uploadFile(file);
    }
  }, [file]);

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setFilePerc(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
      },
      () => setFileUploadError(true),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData((prev) => ({ ...prev, avatar: downloadURL }));
      }
    );
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const userId = currentUser?.id || currentUser?._id;

if (!userId) {
  console.error('❌ userId tidak ditemukan pada currentUser:', currentUser);
  dispatch(updateUserFailure('User ID tidak tersedia.'));
  if (!currentUser) {
  console.warn("⚠️ currentUser belum tersedia.");
}

  return;
}

    dispatch(updateUserStart());

    try {
      const token = await getIdToken(auth.currentUser);
      const res = await fetch(`/api/user/update/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || 'Update failed.');
      }

      const updatedUser = {
        ...currentUser,
        ...data,
        avatar: `${data.avatar}&updated=${Date.now()}`, // ✅ FIXED: gunakan & bukan ?
      };

      dispatch(updateUserSuccess(updatedUser));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };

  const handleDeleteUser = async () => {
    dispatch(deleteUserStart());
    try {
      const token = await getIdToken(auth.currentUser);
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || 'Delete failed.');
      }

      dispatch(deleteUserSuccess());
      navigate('/login');
    } catch (err) {
      dispatch(deleteUserFailure(err.message));
    }
  };

  const handleSignOut = async () => {
    dispatch(signOutUserStart());
    try {
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || 'Sign out failed.');
      }

      dispatch(signOutUserSuccess());
      navigate('/login');
    } catch (err) {
      dispatch(signOutUserFailure(err.message));
    }
  };

  return (
    <div className='p-4 max-w-xl mx-auto'>
      <h1 className='text-3xl font-bold text-center my-6'>Profil Saya</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          accept='image/*'
          hidden
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={
            tempImage
              ? tempImage
              : currentUser?.avatar
              ? `${currentUser.avatar}&t=${Date.now()}`
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          }
          alt='Profile'
          onClick={() => fileRef.current.click()}
          className='h-24 w-24 rounded-full object-cover mx-auto cursor-pointer'
        />
        {filePerc > 0 && (
          <div className='text-center text-sm'>
            {filePerc < 100 ? (
              <span className='text-blue-500'>Uploading {filePerc}%...</span>
            ) : fileUploadError ? (
              <span className='text-red-600'>Upload failed.</span>
            ) : (
              <span className='text-green-600'>Upload complete!</span>
            )}
          </div>
        )}

        <input
          type='text'
          id='username'
          placeholder='Username'
          defaultValue={currentUser?.username}
          onChange={handleInputChange}
          className='border p-3 rounded-md'
        />
        <input
          type='email'
          id='email'
          placeholder='Email'
          defaultValue={currentUser?.email}
          onChange={handleInputChange}
          className='border p-3 rounded-md'
        />
        <input
          type='password'
          id='password'
          placeholder='New Password'
          onChange={handleInputChange}
          className='border p-3 rounded-md'
        />
        <button
          disabled={loading}
          className='bg-slate-800 text-white py-3 rounded-md hover:bg-slate-700 transition disabled:opacity-60'
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>

     <div className='flex justify-between mt-6 gap-4'>
  <button
    onClick={handleDeleteUser}
    className='flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-md hover:bg-red-200 transition text-sm font-semibold'
  >
    🗑️ Delete Account
  </button>
  <button
    onClick={handleSignOut}
    className='flex-1 bg-slate-100 text-slate-800 px-4 py-2 rounded-md hover:bg-slate-200 transition text-sm font-semibold'
  >
    🚪 Sign Out
  </button>
</div> 

      {error && <p className='text-red-600 mt-4 text-center'>{error}</p>}
      {updateSuccess && <p className='text-green-600 mt-4 text-center'>Profile updated successfully.</p>}
    </div>
  );
}
