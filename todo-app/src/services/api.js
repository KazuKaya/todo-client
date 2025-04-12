import axios from "axios";

const API_URL = "https://localhost:7028/api/tasks";

export const getTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
};

export const addTask = async (task) => {
    try {
        const response = await axios.post(API_URL, task);
        return response.data;
    } catch (error) {
        console.error("Task could not be added:", error);
    }
};

export const updateTask = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        return response.data;
    }
    catch (error) {
        console.error("The task could not be updated:", error);
    }
}

export const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log("The task could not be deleted:", error);
    }

}