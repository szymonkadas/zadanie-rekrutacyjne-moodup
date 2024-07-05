const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const httpClient = {
  post: async <Payload, ResponseData>(url: string, payload?: Payload) => {
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return handleResponse<ResponseData>(response);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  },

  get: async <ResponseData>(url: string) => {
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return handleResponse<ResponseData>(response);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  },
  put: async <Payload, ResponseData, AdditionalHeaders = object>(
    url: string,
    payload?: Payload,
    headers?: AdditionalHeaders
  ) => {
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(payload),
      });

      return handleResponse<ResponseData>(response);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  },
  patch: async <Payload, ResponseData>(url: string, payload?: Payload) => {
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return handleResponse<ResponseData>(response);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  },
  delete: async <ResponseData, AdditionalHeaders = object>(
    url: string,
    headers?: AdditionalHeaders
  ) => {
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      return handleResponse<ResponseData>(response);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  },
};

async function handleResponse<ResponseData>(
  response: Response
): Promise<ResponseData> {
  if (response.ok) {
    if (response.headers.get("Content-Type")?.includes("application/json")) {
      return (await response.json()) as Promise<ResponseData>;
    } else {
      return Promise.reject({
        message: await response.text(),
        status: response.status,
      } as RejectedHttpResponse);
    }
  } else {
    if (response.headers.get("Content-Type")?.includes("application/json")) {
      const errorData = await response.json();
      return Promise.reject(errorData);
    } else {
      return Promise.reject({
        message: await response.text(),
        status: response.status,
      } as RejectedHttpResponse);
    }
  }
}

export type RejectedHttpResponse = {
  message: string;
  status: number;
};
