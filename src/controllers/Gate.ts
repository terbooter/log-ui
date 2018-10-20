import {AxiosInstance} from "axios";
import {EventDispatcher} from "./EventDispatcher";

const axiosModule = require("axios");

export class Gate extends EventDispatcher {

    private axios: AxiosInstance;
    private token: string | null;


    constructor() {
        super();
        //@ts-ignore
        this.axios = axiosModule.create();
    }

    public setToken(token: string | null) {
        this.token = token;
    }

    public async request(urlPath: string, method: "post" | "get" = "get", data: any = {}): Promise<GateResponse> {
        let url = process.env.REACT_APP_API_URL + urlPath;

        let request: any = {
            method: method,
            url: url,
            params: {p1: 1, p2: "SOme string", p3: true},
            responseType: "json",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        /**
         * If JWT exists in localstorage, adding "Authorization" header
         * with JWT from localstore.
         */
        if (this.token) {
            request.headers.Authorization = `Bearer ${this.token}`;
        }

        request.data = data;

        console.log("-->> " + url, request);

        let errorMessage: string | null = null;
        let responseData: any = null;

        try {
            let response = await this.axios(request);
            responseData = response.data;
            console.log("<<-- ", responseData);
        } catch (error) {
            if (error.response) {
                errorMessage = error.response.data.error.message;
                responseData = error.response.data;
                console.log("<<-- ", errorMessage, responseData);
            } else {
                // Network level errorMessage. Server is down or something
                errorMessage = error.message;
                responseData = {success: false, error: {message: errorMessage}};
                console.log("<<-- ", errorMessage);
            }
        }

        this.dispatch(responseData);
        return responseData;
    }
}

export interface GateResponse {
    success: boolean;
    error?: any
    data?: any
}
