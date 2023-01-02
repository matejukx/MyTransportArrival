namespace Abstractions.Dto;

using Entity;

public class UserDto
{
    public string Login { get; set; }
    public List<Stop> Stops { get; set; }
}