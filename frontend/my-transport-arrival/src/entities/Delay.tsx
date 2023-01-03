export interface Delay {
    id: number;
    delayInSeconds: number;
    routeId: number;
    estimatedTime: string;
    theoreticalTime : string;
    headsign: string;
}

export interface StopDelays{
    stopName: string;
    delays: Delay[];
}