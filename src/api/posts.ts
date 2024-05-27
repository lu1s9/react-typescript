import axios from "./axios";

export const getPosts = () => axios.get("/posts");

export const createPost = (post: { content: string }) =>
  axios.post("/posts", post);

export const deletePost = (id: string) => axios.delete(`/posts/${id}`);

export const likePost = (id: string) => axios.patch(`/posts/${id}/like`);
