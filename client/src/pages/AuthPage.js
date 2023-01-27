import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import { useMessage } from "../hooks/message.hook";
import { usersAPI } from "../api/api";

const AuthPage = () => {
    const message = useMessage();
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
            loginDate: moment().format("lll"),
        });
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
        <div className="page__box">
            <div className="image__box">
                <div className="img__bg"></div>
            </div>
            <div className="form__box">
                <div className="form__content">
                    <div className="form__items">
                        <h1 className="form__text">Table with users</h1>
                        <div className="page__links">
                            <Link to="/login" className="page__links-button">
                                Login
                            </Link>
                            <Link to="/registration" className="page__links-button">
                                no account?
                            </Link>
                        </div>
                        <form onSubmit={preventDefault}>
                            <div className="card-content black-text">
                                <div>
                                    <div>
                                        <label htmlFor="email" className="form__label">
                                            Email
                                        </label>
                                        <input
                                            onChange={changeHandler}
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            className="form__input"
                                        />
                                    </div>
                                    <div style={{ position: "relative" }}>
                                        <label htmlFor="password" className="form__label">
                                            Password
                                        </label>
                                        <input
                                            onChange={changeHandler}
                                            id="password"
                                            type={type ? "password" : "text"}
                                            name="password"
                                            placeholder="Password"
                                            className="form__input"
                                        />

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
                                    className="page__links-button form__button">
                                    sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
