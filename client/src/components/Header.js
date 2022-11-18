import React from "react";

const Header = ({ isAuth }) => {
    return (
        <nav className="light-blue">
            <div className="nav-wrapper">
                <a href="#" className="brand-logo ml-15">
                    Logo
                </a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <a href="collapsible.html">{isAuth ? "Выйти" : "Войти"}</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
