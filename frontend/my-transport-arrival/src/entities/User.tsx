import { Stop } from "./Stop";

export interface User {
    login: string;
    stops: Stop[];
}

export interface UserLoginDto {
    login: string;
    password: string;
}

export interface UserStopDto {
    login: string;
    stopId: number;
}