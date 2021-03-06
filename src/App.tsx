import * as React from 'react';
import './App.css';
import {Redirect, Route, Router, Switch} from "react-router";
import {LoginPage} from "./LoginPage";
import {Model} from "./model/Model";
import {Home} from "./Home";
import {inject, observer} from "mobx-react";
import {Auth} from "./model/Auth";
import {Settings} from "./Settings";

interface State {

}

interface InjectedProps {
    auth: Auth;
    model: Model
}

@inject("auth", "model")
@observer
export class App extends React.Component<{}, State> {

    constructor(props) {
        super(props);

        this.state = {status: this.injected.auth.status};
    }

    private get injected(): InjectedProps {
        return this.props as InjectedProps;
    }

    public async componentDidMount() {
        this.injected.auth.autoLogin();
    }

    public render() {

        console.log(this.injected.auth.status);
        const history = this.injected.model.history;

        if (this.injected.auth.status == "authorizing") {
            return <div>Loading ...</div>;
        }

        return (


            <Router history={history}>
                <Switch>
                    <Route path="/login" component={LoginPage}/>

                    <Route path="/home" component={Home}/>
                    <Route path="/settings" component={Settings}/>

                    <Redirect to="/home"/>

                    <Route render={() => {

                        return <h1>404</h1>
                    }
                    }/>
                </Switch>
            </Router>

        );
    }
}
