import React, { useCallback, useContext, useEffect, useState } from "react";
import moment from "moment";
import { usersAPI } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { URL } from "../App";

const UsersPage = () => {
    const { id, updateIsLogin } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [checked, setChecked] = useState(false);

    const userIsLogin = useCallback(async () => {
        try {
            const res = await axios.put(
                `${URL}/api/auth/islogin/${id}`,
                { id },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            updateIsLogin(res.data.isLogin);
        } catch (error) {
            console.log(error.response);
        }
    }, [id, updateIsLogin]);

    const getUsers = useCallback(async () => {
        userIsLogin(id);
        try {
            await usersAPI.getUsers().then((data) => setUsers(data));
        } catch (error) {
            console.log(error);
        }
    }, [userIsLogin, id]);

    const isChecked = useCallback(
        async (id) => {
            try {
                await usersAPI.isChecked(id).then(() => {
                    getUsers();
                });
            } catch (error) {
                console.log(error);
            }
        },
        [getUsers]
    );

    const removeUser = useCallback(
        async (id) => {
            try {
                await usersAPI.removeUser(id).then(() => {
                    getUsers();
                });
            } catch (error) {
                console.log(error);
            }
        },
        [getUsers]
    );

    const unChekedAll = useCallback(
        async (checked) => {
            try {
                setChecked(!checked);
                if (checked) {
                    await usersAPI.unChekedAll(0).then(() => {
                        getUsers();
                    });
                } else {
                    await usersAPI.unChekedAll(1).then(() => {
                        getUsers();
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        [getUsers]
    );

    const blockedUser = useCallback(
        async (id) => {
            try {
                await usersAPI.blockedUser(id).then(() => {
                    isChecked(id);
                });
            } catch (error) {
                console.log(error);
            }
        },
        [isChecked]
    );

    const unBlockedUser = useCallback(
        async (id) => {
            try {
                await usersAPI.unBlockedUser(id).then(() => {
                    isChecked(id);
                });
            } catch (error) {
                console.log(error);
            }
        },
        [isChecked]
    );

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <>
            <div className="username">
                <i className="material-icons blue-text">account_circle</i>
                <p>{users.map((user) => (user._id === id ? user.email : ""))}</p>
            </div>
            <table className="highlight responsive-table">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input
                                    checked={checked}
                                    name="list"
                                    type="checkbox"
                                    onChange={() => unChekedAll(checked)}
                                />
                                <span></span>
                            </label>
                        </th>
                        <th>№</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Registration</th>
                        <th>Last visit</th>
                        <th>Status</th>
                        <th>
                            <i
                                className="material-icons orange-text icons"
                                onClick={() =>
                                    users.forEach((user) =>
                                        user.isChecked ? blockedUser(user._id) : ""
                                    )
                                }>
                                lock
                            </i>
                        </th>
                        <th>
                            <i
                                className="material-icons green-text icons"
                                onClick={() =>
                                    users.forEach((user) =>
                                        user.isChecked ? unBlockedUser(user._id) : ""
                                    )
                                }>
                                lock_open
                            </i>
                        </th>
                        <th>
                            <i
                                className="material-icons red-text icons"
                                onClick={() =>
                                    users.forEach((user) =>
                                        user.isChecked ? removeUser(user._id) : ""
                                    )
                                }>
                                delete
                            </i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        return (
                            <tr
                                key={user._id}
                                className={`user ${user.isBlocked ? "blocked" : ""}`}>
                                <td>
                                    <label>
                                        <input
                                            name="list"
                                            checked={user.isChecked ? "checked" : ""}
                                            onChange={() => isChecked(user._id)}
                                            type="checkbox"
                                            value={user._id}
                                        />
                                        <span></span>
                                    </label>
                                </td>
                                <td>{index + 1}</td>

                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{moment(user.createDate).format("lll")}</td>
                                <td>{moment(user.loginDate).format("lll")}</td>
                                <td>{user.isBlocked ? "BLOCK" : "UNBLOCK"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default UsersPage;
