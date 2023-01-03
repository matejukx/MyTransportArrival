
import axios from 'axios';
import { User, UserStopDto, UserLoginDto } from '../entities/User';
import { Stop } from '../entities/Stop';


export class UserService {

    static getCurrentUser() : Promise<User> {
        const login = localStorage.getItem('mainUser');
        return axios.get('https://localhost:7200/api/users/' + login).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
        }
        );
        // return axios.get('https://localhost:7200/api/users/current').then((response) => {
        //     return response.data;
        // }).catch((error) => {
        //     console.log(error);
        // }
        // );
    }

    static login(user: UserLoginDto) {
        return axios.post('https://localhost:7200/auth/login', user).then((response) => {
            localStorage.setItem('mainUser', user.login);
            return response.status === 200;
        }).catch((error) => {
            console.log(error);
            return false;
        });
    }

    static register(user: UserLoginDto) {
        return axios.post('https://localhost:7200/auth/register', user).then((response) => {
            localStorage.setItem('mainUser', user.login);
            return response.status === 200;
        }).catch((error) => {
            console.log(error);
            return false;
        });
    }

    static getCurrentUserStops() : Promise<Stop[]>{
        
         const login = localStorage.getItem('mainUser');
        return axios.get('https://localhost:7200/api/users/' + login).then((response) => {
            return response.data.stops;
        }).catch((error) => {
            console.log(error);
        }
        );
    }

    static logout() {
        localStorage.removeItem('mainUser');
    }
    
    static isUserLoggedIn() {
        console.log(localStorage.getItem('mainUser'));
        console.log(localStorage.getItem('mainUser') !== null);
        return localStorage.getItem('mainUser') !== null;
    }

    static addStop(stopId: number) : Promise<boolean> {
        const login = localStorage.getItem('mainUser');
        return axios.post('https://localhost:7200/api/users/stops', { login: login, stopId: stopId }).then
            ((response) => {
                return response.status === 200; 
            }).catch((error) => {
                console.log(error);
                return false;
            });
    };

    static removeStop(stopId: number) : Promise<boolean> {
        const login = localStorage.getItem('mainUser');
        return axios.delete('https://localhost:7200/api/users/stops', { data: { login: login, stopId: stopId } }).then
            ((response) => {
                return response.status === 200; 
            }).catch((error) => {
                console.log(error);
                return false;
            });
    };
}