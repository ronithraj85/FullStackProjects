export default function Button({ children, onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full py-2 rounded text-white font-medium transition ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
