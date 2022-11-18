import React from "react";

const AuthPage = () => {
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Таблица пользователей</h1>
                <div className="card cyan lighten-5">
                    <div className="card-content black-text">
                        <span className="card-title ">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input id="email" type="text" name="name" />
                                <label htmlFor="email">Name</label>
                            </div>
                            <div className="input-field">
                                <input id="email" type="text" name="email" />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input id="password" type="password" name="password" />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow lighten-4 black-text mr-10">Войти</button>
                        <button className="btn teal accent-2 black-text">Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
