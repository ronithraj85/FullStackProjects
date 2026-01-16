const API_BASE_URL = "http://localhost:8585"; // API Gateway

export async function httpClient(
  url,
  { method = "GET", body, headers = {} } = {}
) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/auth";
    return;
  }

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}
