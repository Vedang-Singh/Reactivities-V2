import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
	closeFrom: () => void;
	activity?: Activity;
};

export default function ActivityForm({ closeFrom, activity }: Props) {
	const { updateActivity, createActivity } = useActivities();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const data: { [key: string]: FormDataEntryValue } = {};
		formData.forEach((value, key) => (data[key] = value));

		if (activity) {
			data.id = activity.id;
			await updateActivity.mutateAsync(data as unknown as Activity);
			closeFrom();
		} else {
			await createActivity.mutateAsync(data as unknown as Activity);
			closeFrom();
		}
	};

	return (
		<Paper sx={{ borderRadius: 3, padding: 3 }}>
			<Typography variant="h5" gutterBottom color="primary">
				Create Activity
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				display="flex"
				flexDirection="column"
				gap={3}
			>
				<TextField name="title" label="Title" defaultValue={activity?.title} />
				<TextField
					name="description"
					label="Description"
					multiline
					rows={3}
					defaultValue={activity?.description}
				/>
				<TextField
					name="category"
					label="Category"
					defaultValue={activity?.category}
				/>
				<TextField
					name="date"
					label="Date"
					type="date"
					defaultValue={
						activity?.date
							? new Date(activity.date).toISOString().split("T")[0]
							: new Date().toISOString().split("T")[0]
					}
				/>
				<TextField name="city" label="City" defaultValue={activity?.city} />
				<TextField name="venue" label="Venue" defaultValue={activity?.venue} />
				<Box display="flex" justifyContent="end" gap={3}>
					<Button onClick={closeFrom} color="inherit">
						Cancel
					</Button>
					<Button
						type="submit"
						color="success"
						variant="contained"
						disabled={updateActivity.isPending || createActivity.isPending}
					>
						Submit
					</Button>
				</Box>
			</Box>
		</Paper>
	);
}
