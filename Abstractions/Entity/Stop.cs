namespace Abstractions.Entity;

using System.ComponentModel.DataAnnotations;

public class Stop
{
    [Key]
    public int StopId { get; set; }
    public string? StopCode { get; set; }
    public string? StopName { get; set; }
    public string? StopShortName { get; set; }
    public string? StopDesc { get; set; }
    public int? ZoneId { get; set; }
    public string? ZoneName { get; set; }
    public double? StopLat { get; set; }
    public double? StopLon { get; set; }
}