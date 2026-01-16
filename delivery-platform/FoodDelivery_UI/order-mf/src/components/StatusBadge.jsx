const STATUS_STYLES = {
  CREATED: "bg-yellow-100 text-yellow-800",
  PAID: "bg-blue-100 text-blue-800",
  DELIVERED: "bg-green-100 text-green-800",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
}
