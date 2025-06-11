import axios from "axios"

const API_URL = "http://localhost:5454/"

export const api = api.create({
    baseURL : API_URL,
    header : {
        "Content-Type" : "application/json"
    }
})