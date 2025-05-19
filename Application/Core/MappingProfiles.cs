using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // passed in second parameter in GetFollowings.cs
        string? currentUserId = null;

        CreateMap<Activity, Activity>();
        CreateMap<CreateActivityDto, Activity>();
        CreateMap<EditActivityDto, Activity>();

        // From Activity to ActivityDto
        CreateMap<Activity, ActivityDto>()

            // ActivityDto
            .ForMember(destination => destination.HostDisplayName,

            // Activity
            o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))

            .ForMember(destination => destination.HostId,

            o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id));

        CreateMap<ActivityAttendee, UserProfile>()
            .ForMember(destination => destination.Id, o => o.MapFrom(s => s.User.Id))
            .ForMember(destination => destination.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(destination => destination.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl))
            .ForMember(destination => destination.Bio, o => o.MapFrom(s => s.User.Bio))
            .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.User.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.User.Followings.Count))
            .ForMember(d => d.Following, o => o.MapFrom(s => s.User.Followers.Any(x => x.Observer.Id == currentUserId)));

        CreateMap<User, UserProfile>()
            .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
            .ForMember(d => d.Following, o => o.MapFrom(s =>s.Followers.Any(x => x.Observer.Id == currentUserId)));

        CreateMap<Comment, CommentDto>()
            .ForMember(dest => dest.DisplayName, options => options.MapFrom(src => src.User.DisplayName))
            .ForMember(dest => dest.UserId, options => options.MapFrom(src => src.User.Id))
            .ForMember(dest => dest.ImageUrl, options => options.MapFrom(src => src.User.ImageUrl));
    }
}