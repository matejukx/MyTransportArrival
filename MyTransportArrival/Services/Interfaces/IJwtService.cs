namespace MyTransportArrival.Services.Interfaces;

using Abstractions.Entity;

public interface IJwtService

{
    public string GetToken(User user);
}