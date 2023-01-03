namespace Abstractions.Dto;

public class DelayDto
{
    public string Id { get; set; }
    public int DelayInSeconds { get; set; }
    public string TheoreticalTime { get; set; }
    public int RouteId { get; set; }
    public string EstimatedTime { get; set; }
    public string Headsign { get; set; }
}