import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class Menu extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="navbar-brand">
                    <NavLink exact to="/" className="nav-link text-white">
                        <img src="./../ES-small.png" width="30" height="30" className="d-inline-block align-top m-1" alt="logo" />
                        Expenshare
                    </NavLink>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to="/person" className="nav-link">Participants</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/expense" className="nav-link">Dépenses</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/balance" className="nav-link">Équilibres</NavLink>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        <i>Les comptes faciles font les bons amis...</i>
                    </span>
                </div>
            </nav>
        );
    }
}

export default Menu;