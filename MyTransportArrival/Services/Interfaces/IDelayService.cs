namespace MyTransportArrival.Services.Interfaces;

using Abstractions.Entity;
using Abstractions.Models;

public interface IDelayService
{
    public Task<List<Delay>> GetDelaysAsync(string stopId);
    public Task<List<Delay>> GetDelaysForUserAsync(User user);
}