namespace MyTransportArrival;

using Abstractions.Dto;
using Abstractions.Models;
using AutoMapper;

public class AutomapperProfile : Profile
{
    public AutomapperProfile()
    {
        CreateMap<Delay, DelayDto>();
    }
}