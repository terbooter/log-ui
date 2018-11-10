import * as React from 'react';
import './App.css';
import {Route, Router, Switch} from "react-router";
import {Link} from "react-router-dom";
import {createBrowserHistory} from "history";
import {LoginPage} from "./LoginPage";
import {Gate, GateResponse} from "./controllers/Gate";
import {Model} from "./model/Model";
import {Filter} from "./components/home/Filter";
import {List} from "./components/home/List";
import {inject, observer} from "mobx-react";
import {NavigationBar} from "./components/NavigationBar";

interface Props {

}

interface InjectedProps {
    model: Model
    auth: Auth
    visitor: Visitor
}

interface State {

}

@inject("model", "auth", "visitor")
@observer
export class Settings extends React.Component<Props, State> {
    private get injected(): InjectedProps {
        return this.props as InjectedProps;
    }

    public render() {
        return (
            <div className="container">

                <NavigationBar/>
                <div style={{paddingTop: "20px"}}></div>
                {/*<Filter/>*/}
                <Route path="/home/:logId" component={Test}/>
                <h3>Email: {this.injected.visitor.email}</h3>
                <h3>{this.injected.visitor._id}</h3>
                <input type="checkbox"/> Remove "docker/" string from container name
                <input type="checkbox"/> Remove "[1]" string from container name

                {/*<List/>*/}
            </div>
        )
    }
}

import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {Auth} from "./model/Auth";
import {Visitor} from "./model/Visitor";

@withRouter
class Test extends React.Component {

    private get router(): RouteComponentProps<{ logId: string }> {
        return this.props as RouteComponentProps<{ logId: string }>;
    }

    render() {
        console.log(this.router.match.params.logId);
        return (
            <div>Log ID: {this.router.match.params.logId}</div>
        )
    }
}

