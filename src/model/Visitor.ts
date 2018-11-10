import {observable} from "mobx";
import {Gate} from "../controllers/Gate";

export class Visitor {
    @observable email = "";
    @observable _id;

    constructor(private gate: Gate) {

    }

    public async getMe(): Promise<void> {
        let r = await this.gate.request("/me", "get");


        if (!r.success) {
            return;
        }

        const data = r.data;

        if (data.me) {
            let me = data.me;
            for (let key in me) {
                this[key] = me[key];
            }
        }
    }
}