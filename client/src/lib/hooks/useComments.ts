import { useLocalObservable } from "mobx-react-lite";
import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { useEffect, useRef } from "react";
import { runInAction } from "mobx";

const useComments = (activityId?: string) =>
{

    // to avoid creating two connection by useEffect in development mode
    // as the useRef is stable inside this hook
    const created = useRef(false);

    // Mobx in local scope without using useContext
    const commentStore = useLocalObservable(() => ({
        comments: [] as ChatComment[],
        hubConnection: null as HubConnection | null,

        createHubConnection(activityId: string)
        {
            if (!activityId) return;

            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`${import.meta.env.VITE_COMMENTS_URL}?activityId=${activityId}`,
                    { withCredentials: true } // to include cookies in the request for authentication
                )
                .withAutomaticReconnect()
                .build();

            this.hubConnection.start().catch((error) =>
                console.log("Error establishing connection: ", error));
            
            this.hubConnection.on("LoadComments", (comments: ChatComment[]) =>
            {
                runInAction(() => {this.comments = comments});
                
            });

            this.hubConnection.on("ReceiveComment", (comment: ChatComment) =>
            {
                // unshift to add the new comment to the top of the list
                runInAction(() => {this.comments.unshift(comment)});
            });
        },

        stopHubConnection()
        {
            if (this.hubConnection?.state === HubConnectionState.Connected)
            {
                this.hubConnection?.stop().catch((error) => console.log("Error stopping connection: ", error));
            }
        }
    }));

    useEffect(() =>
    {
        if (activityId && !created.current)
        {
            commentStore.createHubConnection(activityId);
            created.current = true;
        }

        return () =>
        {
            commentStore.stopHubConnection();
            commentStore.comments = [];
        }
    }, [activityId, commentStore]);

    return { commentStore };

}

export default useComments;