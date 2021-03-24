import http from "../http-common";

const getAll = () => {
    return http.get("/produtos");
};

const get = (id) => {
    return http.get(`/produtos/${id}`);
};

const create = (data) => {
    return http.post("/produtos", data);
};

const update = (id, data) => {
    return http.put(`/produtos/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/produtos/${id}`);
};

const removeAll = () => {
    return http.delete(`/produtos`);
};

const findByTitle = nome => {
    return http.get(`/produtos?nome=${nome}`);
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