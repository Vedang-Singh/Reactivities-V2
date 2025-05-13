import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { FieldValues } from "react-hook-form";
import { useAccount } from "./useAccount";

export const useActivities = (id?: string) =>
{
    const queryClient = useQueryClient();
    const { currentUser } = useAccount();
    const location = useLocation();

    const { data: activities, isLoading } = useQuery({
        queryKey: ["activities"],
        queryFn: async () => (await agent.get<Activity[]>("/activities/")).data,
        // only executed in "/activities" and when no id is supplied and there is a currentUser
        enabled: !id && location.pathname === "/activities" && !!currentUser,
        select: data => data.map(
            act => ({
                ...act,
                isHost: act.hostId === currentUser?.id,
                isGoing: act.attendees.some(a => a.id === currentUser?.id),
                hostImageUrl: act.attendees.find(a => a.id === act.hostId)?.imageUrl,
            })
        )
    });

    // If isPending is used below, it will be true even if "activity" below is not used in 
    // ActivityForm.tsx when creating a new activity and it will show 
    // "Loading Activity..." in the form forever. So we need to use isLoading instead.
    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ["activities", id],
        queryFn: async () => (await agent.get<Activity>(`/activities/${id}`)).data,
        // Only run this query if id is defined/true & there is currentUser
        enabled: !!id && !!currentUser,
        select: data => (
            {
                ...data,
                isHost: data.hostId === currentUser?.id,
                isGoing: data.attendees.some(a => a.id === currentUser?.id),
                hostImageUrl: data.attendees.find(a => a.id === data.hostId)?.imageUrl,
            })
    });

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) =>
            await agent.put("/activities", activity),
        onSuccess: async () =>
        {
            await queryClient.invalidateQueries({
                queryKey: ["activities"],
            });
        },
    });

    const createActivity = useMutation({
        mutationFn: async (activity: FieldValues) =>
            (await agent.post("/activities", activity)).data,
        onSuccess: async () =>
        {
            await queryClient.invalidateQueries({
                queryKey: ["activities"],
            });
        },
    });

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => await agent.delete(`/activities/${id}`),
        onSuccess: async () =>
        {
            await queryClient.invalidateQueries({
                queryKey: ["activities"],
            });
        },
    });

    const updateAttendance = useMutation({
        mutationFn: async (id: string) =>
        {
            await agent.post(`/activities/${id}/attend`)
        },
        onMutate: async (activityId: string) =>
        {
            await queryClient.cancelQueries({ queryKey: ['activities', activityId] });
            
            // Copy the current activity data
            // This is used to roll back the optimistic update in case of an error
            const prevActivity = queryClient.getQueryData<Activity>(['activities', activityId]);

            queryClient.setQueryData<Activity>(['activities', activityId], oldActivity =>
            {

                if (!oldActivity || !currentUser) return oldActivity

                const isHost = oldActivity.hostId === currentUser.id;
                const isAttending = oldActivity.attendees.some(x => x.id === currentUser.id);

                return {
                    ...oldActivity,
                    isCancelled: isHost ? !oldActivity.isCancelled : oldActivity.isCancelled,
                    attendees: isAttending
                        ? isHost
                            ? oldActivity.attendees
                            : oldActivity.attendees.filter(x => x.id !== currentUser.id)
                        : [...oldActivity.attendees, {
                            id: currentUser.id,
                            displayName: currentUser.displayName,
                            imageUrl: currentUser.imageUrl
                        }]
                }
            });

            return { prevActivity };
        },
        onError: (error, activityId, context) =>
        {
            // Rollback the optimistic update in case of an error
            if (context?.prevActivity)
            {
                queryClient.setQueryData(['activities', activityId], context.prevActivity)
            }
        }
    })

    return {
        activities,
        isLoading,
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isLoadingActivity,
        updateAttendance
    };
};
