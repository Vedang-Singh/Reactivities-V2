import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

type Props = {
	activities: Activity[];
	selectActivity: (id: string) => void;
};

export default function ActivityList({ activities, selectActivity }: Props) {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
			{activities.map(a => (
				<ActivityCard
					key={a.id}
					activities={a}
					selectActivity={selectActivity}
				/>
			))}
		</Box>
	);
}
