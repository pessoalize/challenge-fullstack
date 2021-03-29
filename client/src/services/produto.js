import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
    return http.get("/produtos", { headers: authHeader() });
};

const get = (id) => {
    return http.get(`/produtos/${id}`, { headers: authHeader() });
};

const create = (data) => {
    return http.post("/produtos", data, { headers: authHeader() });
};

const update = (id, data) => {
    return http.put(`/produtos/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
    return http.delete(`/produtos/${id}`, { headers: authHeader() });
};

const removeAll = () => {
    return http.delete(`/produtos`, { headers: authHeader() });
};

const findByTitle = nome => {
    return http.get(`/produtos?nome=${nome}`, { headers: authHeader() });
};


export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};