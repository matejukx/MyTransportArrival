namespace MyTransportArrival.Controllers;

using Abstractions.Dto;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Repository;
using Services.Interfaces;
using Stop = Abstractions.Entity.Stop;

[Route("api/init")]
public class InitializeController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IAuthService _authService;
    private readonly IHttpClientFactory _clientFactory;


    public InitializeController(ApplicationDbContext context, IAuthService authService, IHttpClientFactory clientFactory)
    {
        _context = context;
        _authService = authService;
        _clientFactory = clientFactory;
    }

    [HttpPost]
    public async Task<IActionResult> Post()
    {
        await _context.Database.EnsureDeletedAsync();
        await _context.Database.EnsureCreatedAsync();
        
        var userLogin1 = new UserLoginDto
        {
            Login = "adam",
            Password = "kowalski"
        };

        var userLogin2 = new UserLoginDto
        {
            Login = "kamil",
            Password = "1234"
        };
        
        _authService.Register(userLogin1);
        _authService.Register(userLogin2);
        
        var httpClient = _clientFactory.CreateClient();
        var result = await httpClient.GetAsync(
            "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json");
        var resultString = await result.Content.ReadAsStringAsync();
        var data = JsonConvert.DeserializeObject<JObject>(resultString);
        var now = DateTime.Now.ToString("yyyy-MM-dd");
        var stops = data[now]["stops"].ToObject<List<Stop>>();

        foreach (var stop in stops)
        {
            var stopEntity = new Stop
            {
                StopId = stop.StopId,
                StopName = stop.StopName,
                StopCode = stop.StopCode,
                StopShortName = stop.StopShortName
            };
            _context.Stops.Add(stopEntity);
        }
        await _context.SaveChangesAsync();
        return Ok();
    }
}