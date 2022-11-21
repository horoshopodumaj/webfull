import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const UsersPage = () => {
    const [usersList, setUsersList] = useState([]);
    let userChecked = [];
    const checkedUser = (userID) => {
        userChecked.includes(userID)
            ? (userChecked = userChecked.filter((id) => id !== userID))
            : userChecked.push(userID);
    };

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
                                //checked={checked}
                                type="checkbox"
                                // onClick={() => setChecked(!checked)}
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
                        <i className="material-icons orange-text">lock</i>
                    </th>
                    <th>
                        <i className="material-icons green-text">lock_open</i>
                    </th>
                    <th>
                        <i
                            className="material-icons red-text"
                            onClick={() => userChecked.forEach((id) => removeUser(id))}>
                            delete
                        </i>
                    </th>
                </tr>
            </thead>
            <tbody>
                {usersList.map((user, index) => {
                    return (
                        <tr key={user._id}>
                            <td>
                                <label>
                                    <input
                                        name="list"
                                        //checked={checked}
                                        onClick={(event) => {
                                            checkedUser(event.target.value);
                                        }}
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
                            <td>{"Status"}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default UsersPage;
