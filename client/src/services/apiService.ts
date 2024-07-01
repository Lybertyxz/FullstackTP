import { Post } from "@/interfaces/models";

const BASE_URL = "http://localhost:8080";

async function fetchAPI(path: string, options?: RequestInit) {
  const headers = new Headers(options?.headers);

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  return data;
}

export const apiService = {
  posts: {
    getPosts: () => fetchAPI("/posts"),
    getPost: (id: string) => fetchAPI(`/posts/${id}`),
    getMyPosts: () => fetchAPI(`/posts/my`),
    getMyPost: (id: string) => fetchAPI(`/posts/my/${id}`),
    createPost: (post: Post) =>
      fetchAPI("/posts", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      }),
  },
  account: {
    getProfile: () => fetchAPI(`/account`),
    updateProfile: (username: string, email: string, description: string) =>
      fetchAPI(`/account`, {
        method: "POST",
        body: JSON.stringify({ username, email, description }),
      }),
  },
  auth: {
    login: (email: string, password: string) =>
      fetchAPI("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    register: (name: string, email: string, password: string) =>
      fetchAPI("/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      }),
  },
};
