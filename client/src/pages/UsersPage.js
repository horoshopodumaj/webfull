import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const UsersPage = () => {
    const [usersList, setUsersList] = useState([]);

    const getUsers = useCallback(async () => {
        try {
            await axios
                .get("/api/users", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => setUsersList(res.data));
        } catch (error) {
            console.log(error);
        }
    }, []);

    const isChecked = useCallback(
        async (id) => {
            try {
                await axios
                    .put(
                        `/api/users/checked/${id}`,
                        { id },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    .then((res) => {
                        setUsersList([...usersList], res.data);
                        getUsers();
                    });
            } catch (error) {
                console.log(error);
            }
        },
        [usersList, getUsers]
    );

    const removeUser = useCallback(
        async (id) => {
            try {
                await axios
                    .delete(
                        `/api/users/delete/${id}`,
                        { id },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    .then(() => getUsers());
            } catch (error) {
                console.log(error);
            }
        },
        [getUsers]
    );

    // const unChekedAll = useCallback(
    //     async (id) => {
    //         try {
    //             await axios
    //                 .put(
    //                     `/api/users/uncheckedall/${id}`,
    //                     { id },
    //                     {
    //                         headers: {
    //                             "Content-Type": "application/json",
    //                         },
    //                     }
    //                 )
    //                 .then((res) => {
    //                     setUsersList([...usersList], res.data);
    //                     //getUsers();
    //                 });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     },
    //     [usersList]
    // );

    const blockedUser = useCallback(
        async (id) => {
            try {
                await axios
                    .put(
                        `/api/users/blocked/${id}`,
                        { id },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    .then((res) => {
                        setUsersList([...usersList], res.data);
                        //unChekedAll(id);
                        getUsers();
                    });
            } catch (error) {
                console.log(error);
            }
        },
        [usersList, getUsers]
    );

    const unBlockedUser = useCallback(
        async (id) => {
            try {
                await axios
                    .put(
                        `/api/users/unblocked/${id}`,
                        { id },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    .then((res) => {
                        setUsersList([...usersList], res.data);
                        //unChekedAll(id);
                        getUsers();
                    });
            } catch (error) {
                console.log(error);
            }
        },
        [usersList, getUsers]
    );

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <table className="highlight">
            <thead>
                <tr>
                    <th>
                        <label>
                            <input
                                name="list"
                                type="checkbox"
                                onClick={() => usersList.forEach((user) => isChecked(user._id))}
                            />
                            <span></span>
                        </label>
                    </th>
                    <th>№</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registration</th>
                    <th>Last visit</th>
                    <th>Status</th>
                    <th>
                        <i
                            className="material-icons orange-text icons"
                            onClick={() =>
                                usersList.forEach((user) =>
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
                                usersList.forEach((user) =>
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
                                usersList.forEach((user) =>
                                    user.isChecked ? removeUser(user._id) : ""
                                )
                            }>
                            delete
                        </i>
                    </th>
                </tr>
            </thead>
            <tbody>
                {usersList.map((user, index) => {
                    return (
                        <tr key={user._id} className={`user ${user.isBlocked ? "blocked" : ""}`}>
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
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{moment(user.createDate).format("LLL")}</td>
                            <td>{moment(user.loginDate).format("LLL")}</td>
                            <td>{user.isBlocked ? "BLOCK" : "UNBLOCK"}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default UsersPage;
