import {observable} from "mobx";
import {Gate, GateResponse} from "../controllers/Gate";
import {History} from "history";

export class Auth {
    @observable status: "authorizing" | "guest" | "authorized" = "authorizing";

    constructor(private gate: Gate, private history: History) {

    }

    public logout() {
        localStorage.removeItem("token");
        this.status = "guest";
        this.history.push("/login");
    }

    public async autoLogin() {
        let r: GateResponse = await this.tryRefreshToken();
        if (r.success) {
            this.status = "authorized";
        } else {
            this.status = "guest";
            this.history.push("/login");
        }
    }

    private async tryRefreshToken(): Promise<GateResponse> {
        let token = localStorage.getItem("token");
        if (!token) {
            return {success: false, error: {message: "no token"}}
        }

        this.gate.setToken(token);
        let r: GateResponse = await this.gate.request("/refresh-token", "post");
        if (r.success) {
            localStorage.setItem("token", r.data.token);
            this.gate.setToken(r.data.token);
        }

        return r;
    }
}