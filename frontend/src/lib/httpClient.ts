const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const httpClient = {
  post: async <Payload, ResponseData>(
    url: string,
    payload?: Payload,
    authCredentials?: string
  ) => {
    const headers = createHeaders(authCredentials);
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      return handleResponse<ResponseData>(response);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  },

  get: async <ResponseData>(url: string, authCredentials?: string) => {
    const headers = createHeaders(authCredentials);
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: "GET",
        headers,
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
    headers?: AdditionalHeaders,
    authCredentials?: string
  ) => {
    const basicHeaders = createHeaders(authCredentials);
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: "PUT",
        headers: {
          ...basicHeaders,
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
  patch: async <Payload, ResponseData>(
    url: string,
    payload?: Payload,
    authCredentials?: string
  ) => {
    const headers = createHeaders(authCredentials);
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: "PATCH",
        headers,
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
    headers?: AdditionalHeaders,
    authCredentials?: string
  ) => {
    const basicHeaders = createHeaders(authCredentials);
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: "DELETE",
        headers: {
          ...basicHeaders,
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

function createHeaders(authCredentials?: string): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (authCredentials) {
    headers["Authorization"] = `Bearer ${authCredentials}`;
  }

  return headers;
}

export type RejectedHttpResponse = {
  message: string;
  status: number;
};
