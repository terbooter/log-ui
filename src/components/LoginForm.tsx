import * as React from "react";
import {Component, SyntheticEvent} from "react";

export interface LoginFormProperties {
    onChange: (email: string, password: string) => void;
    isLoading: boolean
    errors: any,
    globalError?: string
}

interface State {
    email: string
    password: string
    buttonOver: boolean
}

export class LoginForm extends Component<LoginFormProperties, State> {

    constructor(props: LoginFormProperties) {
        super(props);

        this.state = {
            email: "ee@ee.ee",
            password: "123456",
            buttonOver: false
        };

    }

    private onChange(e: SyntheticEvent<any>) {
        let target = e.target as HTMLInputElement;

        //@ts-ignore
        this.setState({
            [target.name]: target.value
        });
    }

    private onMouseOver() {
        this.setState({buttonOver: true});
    }

    private onMouseOut() {
        this.setState({buttonOver: false});
    }

    private async onSubmit(e: SyntheticEvent<any>) {
        e.preventDefault();
        this.props.onChange(this.state.email, this.state.password);
    }

    public componentWillUnmount() {

    }


    public render() {
        let style = {color: "red"};
        let alert = <div className="alert alert-danger" role="alert">{this.props.globalError}</div>;
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <h1>Sign In</h1>
                {this.props.globalError && alert}
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control"
                           value={this.state.email}
                           onChange={this.onChange.bind(this)}
                           name="email"
                           placeholder="Enter email">
                    </input>
                    {this.props.errors.email &&
                    <span className="help-block" style={style}>{this.props.errors.email[0]}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password"
                           className="form-control"
                           id="inputPassword"
                           value={this.state.password}
                           onChange={this.onChange.bind(this)}
                           name="password"
                           placeholder="Password">
                    </input>
                    {this.props.errors.password &&
                    <span className="help-block" style={style}>{this.props.errors.password[0]}</span>}
                </div>

                <button type="submit"
                        disabled={this.props.isLoading}
                        className="btn btn-primary"
                        onMouseOver={this.onMouseOver.bind(this)}
                        onMouseOut={this.onMouseOut.bind(this)}
                        id="button">
                    Submit
                </button>
            </form>

        );
    }
}