import { AuthData } from "../contexts/AuthContext.tsx";
import { httpClient } from "./httpClient";

const apiClient = {
  register: async (
    email: string,
    password: string
  ): Promise<AuthData> => {
    return httpClient.post<UserCredentials, AuthData>("/auth/register", {
      email,
      password,
    });
  },

  login: async (email: string, password: string): Promise<AuthData> => {
    const response = await httpClient.post<UserCredentials, AuthData>("/auth/login", {
      email,
      password,
    });
    return {
      ...response
    };
  },

  fetchRandomJoke: async (
    credentials: AuthData,
    category?: string
  ): Promise<Joke> => {
    return httpClient.get<Joke>(
      `/jokes/random${category ? `?category=${category}` : ""}`, credentials.accessToken
    );
  },

  fetchCategories: async (
    credentials: AuthData
  ): Promise<string[]> => {
    return httpClient.get<string[]>(
      "/jokes/categories", credentials.accessToken
    );
  },

  saveJoke: async (
    credentials: AuthData,
    joke: string
  ): Promise<void> => {
    return httpClient.post("/jokes/save", { joke }, credentials.accessToken);
  },

};

export default apiClient;

type UserCredentials = {
  email: string;
  password: string;
};

type Joke = {
  value: string;
};