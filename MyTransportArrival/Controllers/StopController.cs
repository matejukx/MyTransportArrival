namespace MyTransportArrival.Controllers;

using Microsoft.AspNetCore.Mvc;
using Repository;

[Route("api/stops")]
public class StopController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    
    public StopController(ApplicationDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Stops.ToList());
    }
}