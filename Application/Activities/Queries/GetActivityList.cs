using Application.Activities.DTOs;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<List<ActivityDto>> { }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) :
        IRequestHandler<Query, List<ActivityDto>>
    {
        public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Activities
                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider,
                        new { currentUserId = userAccessor.GetUserId() })
                .ToListAsync(cancellationToken);
        }
    }
}