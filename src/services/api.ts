import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      alert("Erro de conexão com o servidor.");
    }

    return Promise.reject(error);
  }
);
export default api;
