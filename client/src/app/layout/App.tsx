import { useEffect, useState } from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App()
{
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    const handleSelectActivity = (id: string) => setSelectedActivity(activities.find(a => a.id === id));

    const handleCancelSelectActivity = () => setSelectedActivity(undefined);

    const handleOpenForm = (id?: string) =>
    {
        if (id) handleSelectActivity(id)
        else handleCancelSelectActivity();
        setEditMode(true);
    }

    const handleFormClose = () => setEditMode(false);

    const handleSubmitForm = (activity: Activity) =>
    {
        if (activity.id) setActivities([...activities.map(a => a.id === activity.id ? activity : a)]);
        else
        {
            const newAct = { ...activity, id: activities.length.toString() };
            setActivities([...activities, newAct]);
            setSelectedActivity(newAct);
        }
        setEditMode(false);
    }

    const handleDelete = (id: string) => setActivities([...activities.filter(a => a.id !== id)]);

    useEffect(() =>
    {
        axios.get<Activity[]>("https://localhost:5001/api/activities/")
            .then(res => setActivities(res.data));
    }, []);
    return (
        <Box sx={{ bgcolor: "#eee" }}>
            <CssBaseline /> {/* Reset CSS including removing default page padding, margins etc */}
            <NavBar openFrom={handleOpenForm} />
            <Container maxWidth="xl" sx={{ mt: 3 }}> {/* mt: margin-top is actually 8*3px */}
                <ActivityDashboard
                    activities={activities}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                    selectedActivity={selectedActivity}
                    openFrom={handleOpenForm}
                    closeFrom={handleFormClose}
                    editMode={editMode}
                    submitForm={handleSubmitForm}
                    deleteActivity={handleDelete}
                />
            </Container>
        </Box>
    );
}

export default App;
