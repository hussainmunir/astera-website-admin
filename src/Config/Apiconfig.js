import axios from "axios";

export const API_BASE_URL = "http://localhost:5454";

// Create Axios instance with or without Authorization header
export const api = axios.create({
	baseURL: API_BASE_URL
});
