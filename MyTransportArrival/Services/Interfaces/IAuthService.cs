namespace MyTransportArrival.Services.Interfaces;

using Abstractions.Dto;
using Abstractions.Entity;

public interface IAuthService
{
    public string Login(UserLoginDto userLogin);
    public User Register(UserLoginDto userLogin);
}