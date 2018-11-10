import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './App';
import './index.css';
import {Gate} from "./controllers/Gate";
import {createBrowserHistory} from "history";
import {Model} from "./model/Model";
import {Auth} from "./model/Auth";
import {Provider} from "mobx-react";
import {Visitor} from "./model/Visitor";
import {autorun} from "mobx";
import {Listener} from "./controllers/Listener";

console.log(process.env);

const history = createBrowserHistory();
const gate = new Gate();
const model = new Model(history, gate);
const auth = new Auth(gate, history);
const visitor = new Visitor(gate);

new Listener(auth, visitor);

ReactDOM.render(
    <Provider gate={gate} model={model} auth={auth} visitor={visitor}>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
