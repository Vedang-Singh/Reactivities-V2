import { Box, Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityList() {

	const { activities, isPending } = useActivities();

	if (!activities || isPending) return <Typography>Loading...</Typography>;
	
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
			{activities.map(a => (
				<ActivityCard
					key={a.id}
					activity={a}
				/>
			))}
		</Box>
	);
}
