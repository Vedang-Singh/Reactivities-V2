import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"

type Props = {
    activities: Activity;
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityCard({ activities, deleteActivity, selectActivity }: Props)
{
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5">{activities.title}</Typography>
                <Typography sx={{ color: "text.secondary", mb: 1 }}>{activities.date}</Typography>
                <Typography variant="body2">{activities.description}</Typography>
                <Typography variant="subtitle1">{activities.city} / {activities.venue}</Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
                <Chip label={activities.category} variant="outlined" />
                <Box display="flex" gap={3}>
                    <Button onClick={() => selectActivity(activities.id)} size="medium" variant="contained">View</Button>
                    <Button onClick={() => deleteActivity(activities.id)} color="error" size="medium" variant="contained">Delete</Button>
                </Box>
            </CardActions>
        </Card>
    )
}