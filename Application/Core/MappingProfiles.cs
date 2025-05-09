using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();
        CreateMap<CreateActivityDto, Activity>();
        CreateMap<EditActivityDto, Activity>();
        CreateMap<Activity, ActivityDto>()

            // ActivityDto
            .ForMember(destination => destination.HostDisplayName,

            // Activity
            o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))

            .ForMember(destination => destination.HostId,

            // Activity
            o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id));

        CreateMap<ActivityAttendee, UserProfile>()
            .ForMember(destination => destination.Id, o => o.MapFrom(s => s.User.Id))
            .ForMember(destination => destination.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(destination => destination.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl))
            .ForMember(destination => destination.Bio, o => o.MapFrom(s => s.User.Bio));

        CreateMap<User, UserProfile>();
    }
}