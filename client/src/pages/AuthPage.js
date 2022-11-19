import React from "react";
import { Link } from "react-router-dom";

const AuthPage = () => {
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className="txt-cnt">Таблица пользователей</h1>
                <div className="card cyan lighten-5">
                    <form>
                        <div className="card-content black-text">
                            <span className="card-title ">Войти в аккаунт</span>
                            <div>
                                <div className="input-field">
                                    <input id="email" type="email" name="email" />
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
