import { Box, Container, CssBaseline, Typography } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Outlet } from "react-router";

function App() {

	return (
		<Box sx={{ bgcolor: "#eee", minHeight: "100vh" }}>
			<CssBaseline />{" "}
			{/* Reset CSS including removing default page padding, margins etc */}
			<NavBar />
			<Container maxWidth="xl" sx={{ mt: 3 }}>
				<Outlet	/> {/* This is where the child routes will be rendered */}
			</Container>
		</Box>
	);
}

export default App;
