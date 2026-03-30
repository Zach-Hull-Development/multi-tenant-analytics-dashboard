import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { LoginResponse, useAuthStore } from "../../store/authStore";

export const Login = () => {
	const [userId, setUserId] = useState('');
	const [organizationId, setOrganizationId] = useState('');
	const [isLoginError, setIsLoginError] = useState(false);
	const [loginErrorMessage, setLoginErrorMessage] = useState('');
	const login = useAuthStore((state) => state.login);

	const handleLogin = async () => {
	try {
		const res = await fetch('http://localhost:3001/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			userId,
			tenantId: organizationId,
		})
		});

		if (res.status === 200) {
		const loginResponse = await res.json() as LoginResponse;
		if (loginResponse.token) {
			login({
			...loginResponse
			})
		}
		setIsLoginError(false);
		setLoginErrorMessage('');
		} else if (res.status === 401) {
		setIsLoginError(true);
		setLoginErrorMessage('Invalid login credentials');
		} else {
		setIsLoginError(true);
		setLoginErrorMessage('Something went wrong...');
		}
	} catch (e) {
		setIsLoginError(true);
		setLoginErrorMessage('Something went wrong...');
	}
	}
	return (
		<Box
			sx={{
			minHeight: '100vh',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
			}}
		>
			<Container maxWidth="sm">
			<Paper
				elevation={6}
				sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center'
				}}
			>
				<Typography variant="h4" py={2}>
				Login
				</Typography>
				<Typography variant="body1" py={1}>
				Login to view your organization's dashboard!
				</Typography>
				<Box sx={{ width: "90%", my: 2}}>
				<TextField
					fullWidth
					label="UserId"
					sx={{
					mt: 1
					}}
					required
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
				/>
				<TextField
					fullWidth
					label="OrganizationId"
					required
					sx={{
					my: 1
					}}
					value={organizationId}
					onChange={(e) => setOrganizationId(e.target.value)}
				/>
				{
					isLoginError
					? <Box sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						
					}} >
						<Typography color="red">{loginErrorMessage}</Typography>
						</Box>
					: null
				}

				<Button
					type="submit"
					fullWidth
					variant="contained"
					size="large"
					sx={{
					my: 1,
					}}
					onClick={handleLogin}
				>
					Login
				</Button>
				</Box>
			</Paper>
			</Container>
		</Box>
	)
}