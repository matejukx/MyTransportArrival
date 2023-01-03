import axios from "axios";
import { User, UserStopDto, UserLoginDto } from "../entities/User";
import { Stop } from "../entities/Stop";

export class UserService {
    public getCurrentUser = () : Promise<User> => {
        const login = localStorage.getItem("mainUser");
        const token = localStorage.getItem("bearerToken");
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;
        return axios
            .get("https://localhost:7200/api/users/" + login)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    public login(user: UserLoginDto) {
        return axios
            .post("https://localhost:7200/auth/login", user)
            .then((response) => {
                localStorage.setItem("mainUser", user.login);
                localStorage.setItem("bearerToken", response.data);

                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data}`;
                return response.status === 200;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    static register(user: UserLoginDto) {
        return axios
            .post("https://localhost:7200/auth/register", {
                data: user,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "bearerToken"
                    )}`,
                },
            })
            .then((response) => {
                localStorage.setItem("mainUser", user.login);
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    public getCurrentUserStops(): Promise<Stop[]> {
        const login = localStorage.getItem("mainUser");
        const token = localStorage.getItem("bearerToken");
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;
        return axios
            .get("https://localhost:7200/api/users/" + login)
            .then((response) => {
                return response.data.stops;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    public logout() {
        localStorage.removeItem("mainUser");
        localStorage.removeItem("bearerToken");
        axios.defaults.headers.common["Authorization"] = "";
    }

    public isUserLoggedIn() {
        return localStorage.getItem("mainUser") !== null;
    }

    public addStop(stopId: number): Promise<boolean> {
        const login = localStorage.getItem("mainUser");
        return axios
            .post("https://localhost:7200/api/users/stops", {
                login: login,
                stopId: stopId,
            })
            .then((response) => {
                return response.status === 200;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    public removeStop(stopId: number): Promise<boolean> {
        const login = localStorage.getItem("mainUser");
        return axios
            .delete("https://localhost:7200/api/users/stops", {
                data: { login: login, stopId: stopId },
            })
            .then((response) => {
                return response.status === 200;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }
}
