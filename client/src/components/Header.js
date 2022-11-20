import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isAuth }) => {
    return (
        <nav className="light-blue">
            <div className="nav-wrapper">
                <Link to="/login" className="brand-logo ml-15">
                    TaskF
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <Link to="/login">{isAuth ? "Выйти" : "Войти"}</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
