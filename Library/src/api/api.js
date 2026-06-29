import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  timeout: 5000,
});

export const fetchBooks = () => api.get("/books").then(r => r.data);
export const fetchProfile = () => api.get("/books/me").then(r => r.data);
export const fetchBook  = (id) => api.get(`/books/${id}`).then(r => r.data);
export const updateBook = (id, data) => api.put(`/books/${id}`, data).then(r => r.data);
export const deleteBook = (id) => api.delete(`/books/${id}`).then(r => r.data);