import * as React from 'react';
import {LoginForm} from "./components/LoginForm";
import {Gate} from "./controllers/Gate";
import {Model} from "./model/Model";
import {inject} from "mobx-react";

interface InjectedProps {
    gate: Gate;
    model: Model;
}

interface State {
    isLoading: boolean
    error?: string
}

@inject("model", "gate")
export class LoginPage extends React.Component<{}, State> {

    constructor(props) {
        super(props);
        this.state = {isLoading: false};
    }

    private get injected(): InjectedProps {
        return this.props as InjectedProps;
    }

    private async onSubmit(email: string, password: string) {
        console.log(email, password);
        this.setState({isLoading: true});
        let r = await this.injected.gate.request("/signin", "post", {email, password});
        this.setState({isLoading: false});
        if (!r.success) {
            this.setState({error: r.error.message});
        } else {
            this.setState({error: undefined});
            localStorage.setItem("token", r.data.token);
            this.injected.model.history.push("/home")
        }
    }

    public render() {

        return (
            <div className="container">
                <div className="row" style={{marginTop: "10%"}}>
                    <div className="col-sm">
                    </div>
                    <div className="col-sm">
                        <LoginForm onChange={this.onSubmit.bind(this)}
                                   isLoading={this.state.isLoading}
                                   globalError={this.state.error}
                                   errors={{}}/>
                    </div>
                    <div className="col-sm">
                    </div>
                </div>
            </div>
        )
    }
}