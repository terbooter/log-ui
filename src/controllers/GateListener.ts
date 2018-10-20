import {Model} from "../model/Model";
import {Gate, GateResponse} from "./Gate";
import {History} from "history";

export class GateListener {
    constructor(private model: Model, private gate: Gate, private history: History) {
        this.onGate = this.onGate.bind(this);
        gate.addListener(this.onGate);
    }

    private onGate(response: GateResponse) {
        if (!response.success) {
            return;
        }

        const data = response.data;

        if (data.me) {
            let me = data.me;
            for (let key in me) {
                this.model.visitor[key] = me[key];
            }
        }
    }
}