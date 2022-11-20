import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";

const AuthPage = () => {
    const [type, setType] = useState(true);
    const [form, setForm] = useState({
        email: "",
        password: "",
        loginDate: "",
    });

    const { login } = useContext(AuthContext);

    const changeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
            loginDate: moment().format("LLL"),
        });
    };

    const loginHandler = async () => {
        try {
            await axios
                .post(
                    "/api/auth/login",
                    { ...form },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => login(response.data.token, response.data.userId));
        } catch (error) {
            console.log(error);
        }
    };

    const preventDefault = (event) => {
        event.preventDefault();
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className="txt-cnt">Таблица пользователей</h1>
                <div className="card cyan lighten-5">
                    <form onSubmit={preventDefault}>
                        <div className="card-content black-text">
                            <span className="card-title ">Войти в аккаунт</span>
                            <div>
                                <div className="input-field">
                                    <input
                                        onChange={changeHandler}
                                        id="email"
                                        type="email"
                                        name="email"
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field">
                                    <input
                                        onChange={changeHandler}
                                        id="password"
                                        type={type ? "password" : "text"}
                                        name="password"
                                    />
                                    <label htmlFor="password">Password</label>
                                    <i
                                        onClick={() => setType(!type)}
                                        className="icon material-icons">
                                        {type ? "visibility" : "visibility_off"}
                                    </i>
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            <button
                                onClick={loginHandler}
                                className="btn yellow lighten-4 black-text mr-10">
                                Войти
                            </button>
                            <Link to="/registration" className="btn teal accent-2 black-text">
                                Нет аккаунта?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
