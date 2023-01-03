namespace Abstractions.Dto;

public class StopDelaysDto
{
    public string StopName { get; set; }
    public List<DelayDto> Delays { get; set; }
}