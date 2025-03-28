import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities = (id?: string) =>
{
    const queryClient = useQueryClient();

    const { data: activities, isPending } = useQuery({
        queryKey: ["activities"],
        queryFn: async () => (await agent.get<Activity[]>("/activities/")).data,
    });

    // If isPending is used below, it will be true even if "activity" below is not used in 
    // ActivityForm.tsx when creating a new activity and it will show 
    // "Loading Activity..." in the form forever. So we need to use isLoading instead.
    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ["activities", id],
        queryFn: async () => (await agent.get<Activity>(`/activities/${id}`)).data,
        enabled: !!id, // Only run this query if id is defined/true
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
        mutationFn: async (activity: Activity) =>
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

    return {
        activities,
        isPending,
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isLoadingActivity,
    };
};
