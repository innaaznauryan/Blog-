import axios from "axios"

const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
})

export default {
    GET_POSTS() {
        return apiClient.get("/posts")
    },
    GET_SINGLE_POST(id){
        return apiClient.get("/posts/" + id)
    },
    SIGNUP(id, fullName, username, email, password) {
        return apiClient.post("/users", {id, fullName, username, email, password})
    },
    GET_USERS() {
        return apiClient.get("/users")
    },
    LOGIN({id, fullName, username, email, password}) {
        return apiClient.post("/active", {id, fullName, username, email, password})
    },
    GET_LOGGED_IN() {
        return apiClient.get("/active")
    },
    LOGOUT() {
        return apiClient.put("/active/", {})
    },
    CREATE_POST({id, userId, title, user, date, summary, content, comments, likes}) {
        return apiClient.post("/posts", {id, userId, title, user, date, summary, content, comments, likes})
    },
    UPDATE_POST({id, userId, title, user, date, summary, content, comments, likes}) {
        return apiClient.put("/posts/" + id, {id, userId, title, user, date, summary, content, comments, likes})
    },
    DELETE_POST(id) {
        return apiClient.delete("/posts/" + id)
    }
}