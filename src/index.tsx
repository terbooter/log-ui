import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './App';
import './index.css';
import {Gate} from "./controllers/Gate";
import {createBrowserHistory} from "history";
import {Model} from "./model/Model";
import {GateListener} from "./controllers/GateListener";
import {Auth} from "./model/Auth";
import {Provider} from "mobx-react";

console.log(process.env);

const history = createBrowserHistory();
const gate = new Gate();
const model = new Model(history, gate);
const auth = new Auth(gate, history);

new GateListener(model, gate, history);

ReactDOM.render(
    <Provider model={model} auth={auth}>
        <App gate={gate} model={model}/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
