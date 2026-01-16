export default function AdminApp({ email, roles }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Admin Dashboard</h2>
      <p className="text-gray-600 mb-4">
        Logged in as <b>{email}</b>
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>User Management</li>
        <li>Restaurant Approvals</li>
        <li>Platform Metrics</li>
      </ul>
    </div>
  );
}
