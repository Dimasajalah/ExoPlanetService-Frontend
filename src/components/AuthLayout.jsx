// components/AuthLayout.jsx
export default function AuthLayout({ children, title }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 font-['Roboto Mono']">
      <div className="bg-white/90 p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl text-center font-semibold mb-6 text-gray-800">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
