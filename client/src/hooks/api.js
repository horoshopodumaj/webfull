import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const usersAPI = {
    getUsers() {
        return instance.get("/api/users").then((response) => response.data);
    },
    isChecked(id) {
        return instance.put(`/api/users/checked/${id}`, { id }).then((response) => response.data);
    },
    removeUser(id) {
        return instance.delete(`/api/users/delete/${id}`, { id }).then((response) => response.data);
    },
    blockedUser(id) {
        return instance.put(`/api/users/blocked/${id}`, { id }).then((response) => response.data);
    },
    unBlockedUser(id) {
        return instance.put(`/api/users/unblocked/${id}`, { id }).then((response) => response.data);
    },
    unChekedAll(id) {
        return instance
            .put(`/api/users/uncheckedall/${id}`, { id })
            .then((response) => response.data);
    },
};
