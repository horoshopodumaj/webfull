import axios from "axios";
import { URL } from "../App";

const instance = axios.create({
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
    },
});

export const usersAPI = {
    getUsers() {
        return instance.get(`${URL}/api/users`).then((response) => response.data);
    },
    isChecked(id) {
        return instance
            .put(`${URL}/api/users/checked/${id}`, { id })
            .then((response) => response.data);
    },
    removeUser(id) {
        return instance
            .delete(`${URL}/api/users/delete/${id}`, { id })
            .then((response) => response.data);
    },
    blockedUser(id) {
        return instance
            .put(`${URL}/api/users/blocked/${id}`, { id })
            .then((response) => response.data);
    },
    unBlockedUser(id) {
        return instance
            .put(`${URL}/api/users/unblocked/${id}`, { id })
            .then((response) => response.data);
    },
    unChekedAll(checked) {
        return instance
            .put(`${URL}/api/users/uncheckedall/${checked}`, { checked })
            .then((response) => response.data);
    },
};
