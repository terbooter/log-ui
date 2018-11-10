import {Visitor} from "./Visitor";
import {History} from "history";
import {observable} from "mobx";
import {Gate} from "../controllers/Gate";
import {FilterParams} from "./FilterParams";

export class Model {

    @observable hosts: string[] = [];
    @observable containers: string[] = [];
    @observable logs: any[] = [];
    @observable isLoading: boolean = false;


    constructor(public history: History, private gate: Gate) {


    }


    public async loadLogs(filter: FilterParams): Promise<void> {
        let r = await this.gate.request("/get-logs", "post", filter);
        if (r.success) {
            this.logs = r.data.logs;
        }
    }

    public async loadHosts(): Promise<void> {
        let r = await this.gate.request("/hosts");
        if (r.success) {
            this.hosts = r.data.hosts;
        }
    }

    public async loadContainers(): Promise<void> {
        let r = await this.gate.request("/containers");
        if (r.success) {
            this.containers = r.data.containers;
        }
    }
}