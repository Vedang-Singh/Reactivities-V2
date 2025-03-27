import { useState } from "react";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App()
{
    const {activities, isPending} = useActivities();

    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    const handleSelectActivity = (id: string) => setSelectedActivity(activities!.find(a => a.id === id));

    const handleCancelSelectActivity = () => setSelectedActivity(undefined);

    const handleOpenForm = (id?: string) =>
    {
        if (id) handleSelectActivity(id)
        else handleCancelSelectActivity();
        setEditMode(true);
    }

    const handleFormClose = () => setEditMode(false);



    return (
        <Box sx={{ bgcolor: "#eee", minHeight: "100vh" }}>
            <CssBaseline /> {/* Reset CSS including removing default page padding, margins etc */}
            <NavBar openFrom={handleOpenForm} />
            <Container maxWidth="xl" sx={{ mt: 3 }}> {/* mt: margin-top is actually 8*3px */}
                {!activities || isPending ?
                    <Typography>Loading...</Typography> 
                    : (
                        <ActivityDashboard
                            activities={activities}
                            selectActivity={handleSelectActivity}
                            cancelSelectActivity={handleCancelSelectActivity}
                            selectedActivity={selectedActivity}
                            openFrom={handleOpenForm}
                            closeFrom={handleFormClose}
                            editMode={editMode}
                        />
                    )}

            </Container>
        </Box>
    );
}

export default App;
