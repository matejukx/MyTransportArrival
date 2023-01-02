namespace MyTransportArrival.Controllers;

using Abstractions.Dto;
using Exceptions;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

[Route("/auth")]
public class AuthController : ControllerBase
{
   private readonly IAuthService _authService;
    
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserLoginDto userLogin)
    {
        try
        {
            var token = _authService.Login(userLogin);
            HttpContext.Session.SetString("userLogin", userLogin.Login);
            return Ok(token);
        }
        catch (UserDoesNotExistException ex)
        {
            return NotFound("User does not exist");
        }
        catch (WrongPasswordException ex)
        {
            return BadRequest("Wrong password");
        }
        catch (Exception ex)
        {
            return StatusCode(503, ex.Message);
        }
    }
    
    [HttpPost("register")]
    public IActionResult Register([FromBody] UserLoginDto userLogin)
    {
        try
        {
            var newUser = _authService.Register(userLogin);
            return Ok(newUser.Id);
        }
        catch (UserExistsException ex)
        {
            return Conflict("User already exists");
        }
        catch (Exception ex)
        {
            return StatusCode(503, ex.Message);
        }
        
    }
    
}