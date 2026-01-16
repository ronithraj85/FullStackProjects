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
