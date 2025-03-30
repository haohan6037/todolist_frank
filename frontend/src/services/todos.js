
import axiosInstance from "../utils/axiosConfig";


class TodoDataService {
    async getAll(token) {
        return axiosInstance.get("/todos");
    }
    async getTodo(id) {
        return axiosInstance.get(`/todos/${id}`);
    }
    async createTodo(data, token) {
        return axiosInstance.post("/todos/", data);
    }
    async updateTodo(id, data, token) {
        return axiosInstance.put(`/todos/${id}/`, data);
    }
    async deleteTodo(id, token) {
        return axiosInstance.delete(`/todos/${id}/`);
    }
    async completeTodo(id, token) {
        return axiosInstance.put("/todos/${id}/complete");
    }
    async login(data) {
        return axiosInstance.post("/login/", data);
    }
    async signup(data) {
        return axiosInstance.post("/signup/", data);
    }
}

export default new TodoDataService();