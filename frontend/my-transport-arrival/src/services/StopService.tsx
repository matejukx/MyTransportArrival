import axios from "axios";
import { Stop } from "../entities/Stop";


export class StopService {
    public static async getStops(): Promise<Stop[]> {
        return axios.get("https://localhost:7200/api/stops").then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        });
    }
}