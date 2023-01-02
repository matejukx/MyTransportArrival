namespace Abstractions.Models;

using System.Text.Json.Serialization;

public class StopData
{
    public DateTime LastUpdate { get; set; }
    public List<Stop> Stops { get; set; }
}

public class RootStopDataObject
{
    [JsonPropertyName("{date}")]
    public StopData Data { get; set; }
}