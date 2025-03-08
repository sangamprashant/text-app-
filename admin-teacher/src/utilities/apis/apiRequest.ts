import _env from "../env";

export const apiRequest = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
  body?: Record<string, any>,
  headers: HeadersInit = {}
) => {
  try {
    const response = await fetch(`${_env.SERVER_KEY}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(headers as Record<string, string>),
      },
      body: method !== "GET" && body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `API request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error(`API request error: ${error}`);
    throw error;
  }
};

export const errorMsg = (error: unknown) => {
  return (error as { message?: string })?.message || "Something went wrong.";
};
