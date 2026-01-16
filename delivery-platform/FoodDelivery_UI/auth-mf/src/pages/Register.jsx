import toast from "react-hot-toast";

export default function Register() {
  const register = () => {
    toast.success("Registration successful");
    window.location.href = "/auth";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input className="border p-2 w-full mb-3 rounded" placeholder="Name" />
        <input className="border p-2 w-full mb-3 rounded" placeholder="Email" />
        <input
          type="password"
          className="border p-2 w-full mb-4 rounded"
          placeholder="Password"
        />

        <button
          onClick={register}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </div>
    </div>
  );
}
