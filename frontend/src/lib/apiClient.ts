import { httpClient } from './httpClient';
import { AuthCredentials } from '../contexts/AuthContext.tsx';

const apiClient = {
  register: async (email: string, password: string): Promise<AuthCredentials> => {
    return httpClient.post<UserCredentials, AuthCredentials>('/auth/register', {
      email,
      password,
    });
  },

  login: async (email: string, password: string): Promise<AuthCredentials> => {
    return httpClient.post<UserCredentials, AuthCredentials>('/auth/login', {
      email,
      password,
    });
  },

  fetchRandomJoke: async (credentials: AuthCredentials): Promise<Joke> => {
    return httpClient.get<Joke>('/jokes/random', credentials.accessToken);
  },

  fetchJokeByCategory: async (category: string, credentials: AuthCredentials,): Promise<Joke> => {
    return httpClient.get<Joke>(`/jokes/category?category=${category}`, credentials.accessToken);
  },

  fetchCategories: async (credentials: AuthCredentials): Promise<Categories> => {
    return httpClient.get<Categories>('/jokes/categories', credentials.accessToken);
  }
};


export default apiClient;


type UserCredentials = {
  email: string;
  password: string;
};

type Joke = {
  value: string;
};

type Categories = string[];