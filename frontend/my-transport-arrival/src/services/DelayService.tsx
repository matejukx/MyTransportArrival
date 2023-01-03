
import axios from 'axios';
import { Delay, StopDelays } from '../entities/Delay';

export class DelayService {
    
   static getDelays(stopId : number) : Promise<Delay[]>{
        return axios.get('https://localhost:7200/api/delays/' + stopId).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        }
        );
    }
}