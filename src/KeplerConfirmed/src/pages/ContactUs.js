import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name || !formData.email || !formData.message) {
      return setStatus({ ...status, error: 'Silakan isi semua kolom.' });
    }
    if (!emailRegex.test(formData.email)) {
      return setStatus({ ...status, error: 'Silakan masukkan alamat email yang valid.' });
    }

    setStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ loading: false, success: '✅ Pesan berhasil dikirim!', error: null });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ loading: false, success: null, error: data.error || '❌ Gagal mengirim pesan.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: null, error: 'Terjadi kesalahan. Silakan coba lagi.' });
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 md:px-8 font-['Poppins']">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          Kontak Kita
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Punya pertanyaan, saran, atau sekadar ingin menyapa? Isi formulir di bawah ini 👇
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nama Anda
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email anda
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          {status.loading ? (
            <p className="text-blue-600 text-sm text-center">⏳ Mengirim...</p>
          ) : status.success ? (
            <p className="text-green-600 text-sm text-center">{status.success}</p>
          ) : status.error ? (
            <p className="text-red-600 text-sm text-center">{status.error}</p>
          ) : null}

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition font-medium"
            >
              Kirim Pesan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
