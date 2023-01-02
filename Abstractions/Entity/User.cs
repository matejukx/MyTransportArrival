namespace Abstractions.Entity;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Login { get; set; }
    
    [Required]
    public string PasswordHash { get; set; }
    
    [Required]
    public string Salt { get; set; }
    
    public string InternalData { get; set; }
    
    [NotMapped]
    public List<int> SelectedStops 
    {
        get
        {
            return string.IsNullOrEmpty(InternalData) ? new List<int>() : Array.ConvertAll(InternalData.Split(';'), int.Parse).ToList();
        }
        set
        {
            InternalData = string.Join(";", value.Select(p => p.ToString()).ToArray());
        }
    }
    
    public void AddStop(int stopId)
    {
        var stops = SelectedStops;
        stops.Add(stopId);
        SelectedStops = stops;
    }

    public void DeleteStop(int stopId)
    {
        var stops = SelectedStops;
        stops.Remove(stopId);
        SelectedStops = stops;
    }
}