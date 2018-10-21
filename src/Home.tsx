import * as React from 'react';
import './App.css';
import {Route, Router, Switch} from "react-router";
import {createBrowserHistory} from "history";
import {LoginPage} from "./LoginPage";
import {Gate, GateResponse} from "./controllers/Gate";
import {Model} from "./model/Model";
import {Filter} from "./components/home/Filter";
import {List} from "./components/home/List";
import {inject} from "mobx-react";

interface Props {

}

interface InjectedProps {
    gate: Gate
    model: Model
}

interface State {

}

@inject("model")
export class Home extends React.Component<Props, State> {
    private get injected(): InjectedProps {
        return this.props as InjectedProps;
    }

    public render() {
        return (
            <div className="container">
                <div className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand"
                       href="#"><strong>Log Viewer</strong></a>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" data-name="students"
                               href="#">Logs</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-name="settings"
                               href="#settings">Settings</a>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <button className="nav-link" onClick={this.injected.model.logOut}>Log out</button>
                    </ul>
                </div>
                <div style={{paddingTop: "20px"}}></div>
                <Filter/>

                <List/>
            </div>
        )
    }
}

