import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

type Props = {
    activities: Activity[];
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    selectedActivity?: Activity;
    openFrom: (id: string) => void;
    closeFrom: () => void;
    editMode: boolean;
    submitForm: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({ activities, deleteActivity, submitForm, closeFrom, editMode, openFrom, cancelSelectActivity, selectActivity, selectedActivity }: Props)
{
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}> {/* 7 means 7/12 */}
                <ActivityList deleteActivity={deleteActivity} activities={activities} selectActivity={selectActivity} />
            </Grid2>
            <Grid2 size={5}>
                {
                    selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openFrom={openFrom}
                    />}
                {editMode && <ActivityForm submitForm={submitForm} closeFrom={closeFrom} activity={selectedActivity} />}
            </Grid2>
        </Grid2>
    )
}