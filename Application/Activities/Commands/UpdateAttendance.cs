using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;
public class UpdateAttendance
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext context) :
        IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .Include(a => a.Attendees)
                .ThenInclude(a => a.User)
                .SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if ( activity is null ) return Result<Unit>.Failure("Activity not found", 404);

            var user = await userAccessor.GetUserAsync();

            // if user is attending activity
            var attendance = activity.Attendees.FirstOrDefault(x => x.UserId == user.Id);

            // check if user is host of that activity
            var isHost = activity.Attendees.Any(x => x.IsHost && x.UserId == user.Id);

            if ( attendance is not null )
            {
                // if host, toggle cancellation
                if ( isHost ) activity.IsCancelled = !activity.IsCancelled;

                // if not host, remove user's attendance
                else activity.Attendees.Remove(attendance);
            }
            else
            {
                // if user is not attending, add them to the activity
                activity.Attendees.Add(new()
                {
                    User = user,
                    Activity = activity,
                    IsHost = false
                });
            }

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem updating the DB", 400);
        }
    }
}
