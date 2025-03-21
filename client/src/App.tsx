import {useEffect, useState} from "react";
import "./App.css";
import {List, ListItem, ListItemText, Typography} from "@mui/material";
import axios from "axios";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        axios.get<Activity[]>("https://localhost:5001/api/activities/")
            .then(res => setActivities(res.data));
    }, []);
    return (
        <>
            <Typography variant="h3">Reactivities</Typography>
            <List>
                {activities.map(activity => <ListItem key={activity.id}>
                    <ListItemText>{activity.title}</ListItemText>
                </ListItem>)}
            </List>
        </>
    );
}

export default App;
