import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";

export default function ActivityDashboard() {
	return (
		<Grid2 container spacing={3}>
			<Grid2 size={7}>
				{" "}
				{/* 7 means 7/12 */}
				<ActivityList />
			</Grid2>
			<Grid2 size={5}>
				Activity filters goes here
			</Grid2>
		</Grid2>
	);
}
