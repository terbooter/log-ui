import {observable} from "mobx";
import {Gate, GateResponse} from "../controllers/Gate";

export class Settings {
    @observable containerNameFilter1: boolean = false;
    @observable containerNameFilter2: boolean = false;

    constructor(private gate: Gate) {

    }

    public async saveSettings(user_id, data): Promise<GateResponse> {
        let r: GateResponse = await this.gate.request("/settings", "post");
        return r;
    }
}