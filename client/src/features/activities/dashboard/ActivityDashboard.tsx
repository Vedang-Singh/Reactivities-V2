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
};

export default function ActivityDashboard({
	activities,
	closeFrom,
	editMode,
	openFrom,
	cancelSelectActivity,
	selectActivity,
	selectedActivity,
}: Props) {
	return (
		<Grid2 container spacing={3}>
			<Grid2 size={7}>
				{" "}
				{/* 7 means 7/12 */}
				<ActivityList
					activities={activities}
					selectActivity={selectActivity}
				/>
			</Grid2>
			<Grid2 size={5}>
				{selectedActivity && !editMode && (
					<ActivityDetails
						selectedActivity={selectedActivity}
						cancelSelectActivity={cancelSelectActivity}
						openFrom={openFrom}
					/>
				)}
				{editMode && (
					<ActivityForm closeFrom={closeFrom} activity={selectedActivity} />
				)}
			</Grid2>
		</Grid2>
	);
}
