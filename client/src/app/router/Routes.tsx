import {createBrowserRouter, Navigate} from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetailsPage from "../../features/activities/details/ActivityDetailsPage";
import Counter from "../../features/counter/Counter.tsx";
import TestErrors from "../../features/errors/TestErrors.tsx";
import NotFound from "../../features/errors/NotFound.tsx";
import ServerError from "../../features/errors/ServerError.tsx";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/", element: <HomePage /> },
			{ path: "activities", element: <ActivityDashboard /> },
			{ path: "activities/:id", element: <ActivityDetailsPage /> },
			// The key prop is used to force the component to remount when navigating to the same route with different parameters
			{ path: "createActivity", element: <ActivityForm key="create" /> },
			{ path: "manage/:id", element: <ActivityForm /> },
			{ path: "counter", element: <Counter /> },
			{ path: "errors", element: <TestErrors /> },
			{ path: "not-found", element: <NotFound /> },
			{ path: "server-error", element: <ServerError /> },
			{ path: "*", element: <Navigate replace to="/not-found" /> },
		],
	},
]);
