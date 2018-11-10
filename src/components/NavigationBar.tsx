import * as React from "react";
import {Link, NavLink} from "react-router-dom";
import {inject} from "mobx-react";
import {Gate} from "../controllers/Gate";
import {Model} from "../model/Model";
import {Auth} from "../model/Auth";


interface InjectedProps {
    model: Model
    auth: Auth
}

@inject("model", "auth")
export class NavigationBar extends React.Component {

    private get injected(): InjectedProps {
        return this.props as InjectedProps;
    }

    public render() {
        return (
            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand"
                   href="#"><strong>Log Viewer</strong></a>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" data-name="students" activeClassName="active"
                              to="/home">Logs</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" data-name="settings" activeClassName="active"
                              to="/settings">Settings</NavLink>
                    </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <button className="nav-link" onClick={this.injected.auth.logout.bind(this.injected.auth)}>Log
                        out
                    </button>
                </ul>
            </div>
        )
    }
}