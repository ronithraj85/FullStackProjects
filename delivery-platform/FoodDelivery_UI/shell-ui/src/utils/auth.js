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

export const getRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch (e) {
    return null;
  }
};
