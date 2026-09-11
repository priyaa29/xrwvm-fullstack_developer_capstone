import React from 'react';
import '../assets/style.css';
import "../assets/bootstrap.min.css";

const Header = () => {
    const logout = async (e) => {
        e.preventDefault();
        let logout_url = window.location.origin + "/djangoapp/logout";
        const res = await fetch(logout_url, {
            method: "GET",
        });
        const json = await res.json();
        if (json) {
            let username = sessionStorage.getItem('username');
            sessionStorage.removeItem('username');
            window.location.href = window.location.origin;
            window.location.reload();
            alert("Logging out " + username + "...");
        } else {
            alert("The user could not be logged out.");
        }
    };

    let home_page = "/dealers/";
    let curr_user = sessionStorage.getItem('username');
    let login_panel = "";

    if (curr_user && curr_user !== "") {
        login_panel = (
            <div className="input_panel">
                <text className="username">{curr_user}</text>
                <a className="nav_item" href={home_page} onClick={logout}>Logout</a>
            </div>
        );
    } else {
        login_panel = (
            <div className="input_panel">
                <a className="nav_item" href="/login">Login</a>
                <a className="nav_item" href="/register">Register</a>
            </div>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "darkturquoise", height: "1in" }}>
            <div className="container-fluid">
                <h2 style={{ paddingRight: "5%" }}>Dealerships</h2>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" style={{ fontSize: "large" }} href={home_page}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" style={{ fontSize: "large" }} href="/about">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" style={{ fontSize: "large" }} href="/contact">Contact Us</a>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        {login_panel}
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Header;
