import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";

function App() {
	const location = useLocation();

	return (
		<Box sx={{ bgcolor: "#eee", minHeight: "100vh" }}>
			<ScrollRestoration />
			{/* Reset CSS including removing default page padding, margins etc */}
			<CssBaseline />

			{location.pathname === "/" ? (
				<HomePage />
			) : (
				<>
					<NavBar />
					<Container maxWidth="xl" sx={{ pt: 14 }}>
						<Outlet /> {/* This is where the child routes will be rendered */}
					</Container>
				</>
			)}
		</Box>
	);
}

export default App;
