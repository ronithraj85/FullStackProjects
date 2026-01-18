export const getAuthUser = () => {
  const data = localStorage.getItem("authUser");
  return data ? JSON.parse(data) : null;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const hasRole = (role) => {
  const user = getAuthUser();
  return user?.roles?.includes(role);
};

export const getRole = () => {
  const token = getToken();
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.roles?.[0] || payload.role;
};
