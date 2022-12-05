import React, { useContext, useState } from "react";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import { useMessage } from "../hooks/message.hook";
import { usersAPI } from "../api/api";

const LoginPage = () => {
    const message = useMessage();
    const [type, setType] = useState(true);
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
        createDate: "",
        loginDate: "",
        isBlocked: false,
        isChecked: false,
    });

    const { login } = useContext(AuthContext);

    const changeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
            createDate: moment().format("lll"),
            loginDate: moment().format("lll"),
            isBlocked: false,
            isChecked: false,
        });
    };

    const registerHandler = async () => {
        try {
            await usersAPI.register(form).then((data) => {
                message(data.message);
            });
        } catch (error) {
            message(error.response.data.message);
        }
    };

    const loginHandler = async () => {
        try {
            await usersAPI.login(form).then((data) => {
                login(data.token, data.userId);
            });
        } catch (error) {
            message(error.response.data.message);
        }
    };

    const preventDefault = (event) => {
        event.preventDefault();
    };

    return (
        <div className="row">
            <div className="col s12 m8 l6 offset-m2 offset-l3">
                <h1 className="txt-cnt">Таблица пользователей</h1>
                <div className="card cyan lighten-5">
                    <form onSubmit={preventDefault}>
                        <div className="card-content black-text">
                            <span className="card-title ">Создать аккаунт</span>
                            <div>
                                <div className="input-field">
                                    <input
                                        onChange={changeHandler}
                                        id="name"
                                        type="text"
                                        name="name"
                                    />
                                    <label htmlFor="name">Name</label>
                                </div>
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
                                        className="pass"
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
                                onClick={registerHandler}
                                className="btn yellow lighten-4 black-text mr-10 button">
                                Зарегистрироваться
                            </button>
                            <button
                                onClick={loginHandler}
                                className="btn teal accent-2 black-text button">
                                Войти
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
