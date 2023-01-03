namespace MyTransportArrival.Services;

using Abstractions.Entity;
using Abstractions.Models;
using Interfaces;
using Newtonsoft.Json;

public class DelayService : IDelayService
{
    private readonly IHttpClientFactory _clientFactory;
    
    public DelayService(IHttpClientFactory clientFactory)
    {
        _clientFactory = clientFactory;
    }
    
    public async Task<List<Delay>> GetDelaysAsync(string stopId)
    {
        return await GetDelaysForStopAsync(stopId);
    }

    public async Task<List<Delay>> GetDelaysForUserAsync(User user)
    {
        var delays = new List<Delay>();
        foreach (var stop in user.SelectedStops)
        {
            var stopDelays = await GetDelaysForStopAsync(stop.ToString());
            delays.AddRange(stopDelays);
        }

        return delays;
    }
    
    private async Task<List<Delay>> GetDelaysForStopAsync(string stopId)
    {
        using var client = _clientFactory.CreateClient();
        var response = await client.GetAsync($"http://ckan2.multimediagdansk.pl/delays?stopId={stopId}");
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        var arrivals = JsonConvert.DeserializeObject<RootDelayObject>(content);
        var delays = arrivals.Delay.Where(d => DateTime.Parse(d.EstimatedTime) > DateTime.Now).ToList();
        delays.Sort((d1, d2) => DateTime.Parse(d1.EstimatedTime) > DateTime.Parse(d2.EstimatedTime) ? 1 : -1);
        return delays.ToList();
    }
}