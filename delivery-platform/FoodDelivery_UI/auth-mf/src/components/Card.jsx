export default function Card({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
      {children}
    </div>
  );
}
