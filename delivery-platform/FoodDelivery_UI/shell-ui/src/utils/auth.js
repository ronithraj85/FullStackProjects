export const getAuthUser = () => {
  const data = localStorage.getItem("authUser");
  return data ? JSON.parse(data) : null;
};
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

export const hasRole = (role) => {
  const user = getAuthUser();
  return user?.roles?.includes(role);
};
