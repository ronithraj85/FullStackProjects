export default function Table({ columns, data, renderRow }) {
  return (
    <table className="w-full border border-gray-200 bg-white rounded">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              className="border-b px-4 py-2 text-left text-sm font-semibold"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map(renderRow)}</tbody>
    </table>
  );
}
