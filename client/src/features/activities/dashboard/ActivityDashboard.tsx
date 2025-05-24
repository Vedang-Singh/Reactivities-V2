import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";
// import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityDashboard() {
	// const { isFetchingNextPage, fetchNextPage, hasNextPage } = useActivities();
	return (
		<Grid2 container spacing={3}>
			{/* Column widths are integer values between 1 and 12. 
			For example, an item with size={6} occupies half of the grid container's width. */}
			<Grid2 size={8}>
				<ActivityList />
				{/* Uncomment this if you want to load more activities on button click */}
				{/* <Button
					onClick={() => fetchNextPage()}
					disabled={!hasNextPage || isFetchingNextPage}
					sx={{ my: 2, float: "right" }}
					variant="contained"
				>
					Load More
				</Button> */}
			</Grid2>
			<Grid2
				size={4}
				sx={{ position: "sticky", top: 112, alignSelf: "flex-start" }}
			>
				<ActivityFilters />
			</Grid2>
		</Grid2>
	);
}
