export default function AuthApp() {
  async function login() {
    const res = await fetch("http://localhost:8585/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "ronith@gmail.com",
        password: "password123",
      }),
    });

    const data = await res.json();
    localStorage.setItem("token", data.accessToken);
    window.location.reload();
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <button onClick={login} className="bg-black text-white px-4 py-2 rounded">
        Login
      </button>
    </div>
  );
}
