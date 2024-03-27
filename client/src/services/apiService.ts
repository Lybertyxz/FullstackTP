const BASE_URL = "http://localhost:8080";

async function fetchAPI(path: string) {
  const res = await fetch(`${BASE_URL}${path}`);
  const data = await res.json();
  return data;
}

export const apiService = {
  listPosts: () => fetchAPI("/posts"),
  getPost: (id: string) => fetchAPI(`/posts/${id}`),
  createPost: (post: any) =>
    fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }),
};
