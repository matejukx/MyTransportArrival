namespace Abstractions.Models;

public class Delay
{
    public string Id { get; set; }
    public int DelayInSeconds { get; set; }
    public string EstimatedTime { get; set; }
    public string Headsign { get; set; }
    public int RouteId { get; set; }
    public int TripId { get; set; }
    public string Status { get; set; }
    public string TheoreticalTime { get; set; }
    public string Timestamp { get; set; }
    public int Trip { get; set; }
    public int VehicleCode { get; set; }
    public int VehicleId { get; set; }
}

public class RootDelayObject
{
    public string LastUpdate { get; set; }
    public List<Delay> Delay { get; set; }
}