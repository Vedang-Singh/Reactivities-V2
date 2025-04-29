import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { LoginSchema } from "../../lib/schemas/loginSchema";
import { LockOpen } from "@mui/icons-material";
import { Paper, Box, Typography, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router";
import TextInput from "../../app/shared/components/TextInput";

export default function LoginForm() {
	const { loginUser } = useAccount();
	const navigate = useNavigate();
	const location = useLocation();
	
	const {
		control,
		handleSubmit,
        // Alternatively, can use isLoading from useMutation in UseAccount
		formState: { isValid, isSubmitting }, 
	} = useForm<LoginSchema>();

	const onSubmit = async (data: LoginSchema) => {
		await loginUser.mutateAsync(data, {
			onSuccess: () => {
				navigate(location.state?.from || "/activities");
			}
		});
	};

	return (
		<Paper
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				display: "flex",
				flexDirection: "column",
				p: 3,
				gap: 3,
				maxWidth: "md",
				mx: "auto",
				borderRadius: 3,
			}}
		>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				gap={3}
				color="secondary.main"
			>
				<LockOpen fontSize="large" />
				<Typography variant="h4">Sign in</Typography>
			</Box>
			<TextInput label="Email" control={control} name="email" />
			<TextInput
				label="Password"
				type="password"
				control={control}
				name="password"
			/>
			<Button
				type="submit"
				disabled={!isValid || isSubmitting}
				variant="contained"
				size="large"
			>
				Login
			</Button>
			<Typography sx={{ textAlign: "center" }}>
				Don't have an account?
				<Typography
					sx={{ ml: 2 }}
					component={Link}
					to="/register"
					color="primary"
				>
					Sign up
				</Typography>
			</Typography>
		</Paper>
	);
}
