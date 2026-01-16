export default function OrderTable({ orders }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">ID</th>
            <th className="border px-3 py-2">User</th>
            <th className="border px-3 py-2">Amount</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Created</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="text-center">
              <td className="border px-3 py-2">{o.id}</td>
              <td className="border px-3 py-2">{o.userEmail}</td>
              <td className="border px-3 py-2">₹{o.totalAmount}</td>
              <td className="border px-3 py-2">{o.status}</td>
              <td className="border px-3 py-2">
                {new Date(o.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
