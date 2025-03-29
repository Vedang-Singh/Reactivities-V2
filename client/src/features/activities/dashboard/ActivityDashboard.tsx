import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";

export default function ActivityDashboard() {
	return (
		<Grid2 container spacing={3}>
			{/* Column widths are integer values between 1 and 12. 
			For example, an item with size={6} occupies half of the grid container's width. */}
			<Grid2 size={8}>
				<ActivityList />
			</Grid2>
			<Grid2 size={4}>
				<ActivityFilters />
			</Grid2>
		</Grid2>
	);
}
