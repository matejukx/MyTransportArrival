namespace MyTransportArrival.Controllers;

using Abstractions.Dto;
using Abstractions.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository;

[Route("/api/users")]
public class UserController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UserController(ApplicationDbContext context)
    {
        _context = context;
    }
    
    [HttpGet("current")]
    public IActionResult GetCurrent()
    {
        var login = HttpContext.Session.GetString("userLogin");
        var user = _context.Users.FirstOrDefault(u => u.Login == login);
        if (user == null)
        {
            return NotFound();
        }

        var userStops = _context.Stops.Where(stop => user.SelectedStops.Contains(stop.StopId)).ToList();
        var userDto = new UserDto
        {
            Login = user.Login,
            Stops = userStops
        };
        return Ok(userDto);
    }

    [HttpGet("{login}")]
    public IActionResult Get(string login)
    {
        var user = _context.Users.FirstOrDefault(u => u.Login == login);
        if (user == null)
        {
            return NotFound();
        }

        var userStops = _context.Stops.Where(stop => user.SelectedStops.Contains(stop.StopId)).ToList();
        var userDto = new UserDto
        {
            Login = user.Login,
            Stops = userStops
        };
        return Ok(userDto);
    }

    [HttpPost("stops")]
    public IActionResult AddStop([FromBody] UserStopDto userStopDto)
    {
        var user = _context.Users.FirstOrDefault(u => u.Login == userStopDto.Login);
        if (user == null)
        {
            return NotFound();
        }

        var stop = _context.Stops.FirstOrDefault(s => s.StopId == userStopDto.StopId);
        if (stop == null)
        {
            return NotFound();
        }

        if (user.SelectedStops.Contains(stop.StopId))
        {
            return BadRequest();
        }

        user.AddStop(stop.StopId);
        _context.SaveChanges();
        return Ok();
    }

    [HttpDelete("stops")]
    public IActionResult DeleteStop([FromBody] UserStopDto userStopDto)
    {
        var user = _context.Users.FirstOrDefault(u => u.Login == userStopDto.Login);
        if (user == null)
        {
            return NotFound();
        }
        var stop = _context.Stops.FirstOrDefault(s => s.StopId == userStopDto.StopId);
        if (stop == null)
        {
            return NotFound();
        }
        user.DeleteStop(userStopDto.StopId);
        _context.SaveChanges();
        return Ok();
    }
}