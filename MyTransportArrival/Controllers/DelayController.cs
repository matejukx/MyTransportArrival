namespace MyTransportArrival.Controllers;

using Abstractions.Dto;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

[Route("/api/delays")]
public class DelayController : ControllerBase
{
    private readonly IDelayService _delayService;
    private readonly IMapper _mapper;

    public DelayController(IDelayService delayService, IMapper mapper)
    {
        _delayService = delayService;
        _mapper = mapper;
    }
    
    [HttpGet("{stopId}")]
    public async Task<IActionResult> GetDelays(string stopId)
    {
        try
        {
            var delays = await _delayService.GetDelaysAsync(stopId);
            if (!delays.Any())
            {
                return Ok(new List<DelayDto>());
            }
            var delaysDto = _mapper.Map<IEnumerable<DelayDto>>(delays);
            return Ok(delaysDto);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}