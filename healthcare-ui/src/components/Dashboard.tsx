import React, { useEffect, useState } from "react";
import api from "./api";

interface UserResponseDto {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<UserResponseDto[]>([]);

  useEffect(() => {
    api
      .get<UserResponseDto[]>("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          // Token invalid or expired → redirect to login
          window.location.href = "/login";
        }
      });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.username} - {u.roles.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
