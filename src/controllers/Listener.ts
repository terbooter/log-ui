import {autorun} from "mobx";
import {Auth} from "../model/Auth";
import {Visitor} from "../model/Visitor";

export class Listener {
    constructor(auth: Auth, visitor: Visitor) {
        autorun(() => {
            if (auth.status === "authorized") {
                console.log("!!!");
                visitor.getMe();
            }
        })
    }
}