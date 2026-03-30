import { AppBar, Box, Button, Card, CardContent, CircularProgress, Container, Toolbar, Typography } from "@mui/material"
import { useAuthStore } from "../../store/authStore"
import { useEffect, useState } from "react";
import { AnalyticEvent, AnalyticEventSummary, EventSummaryToEventType } from "./models/AnalyticEvent";
import { AnalyticsApi } from "./api/analyticsApi";
import { EventChart } from "./components/EventChart";

const summaryTitleRecord: Record<string, string> = {
	totalEventCount: 'Total Events',
	viewCount: 'Views',
	signupCount: 'Sign Ups',
	donationCount: 'Donations',
};

const eventTitleRecord: Record<string, string> = {
	...summaryTitleRecord,
	totalEventCount: 'All Events',
};


export const Dashboard = () => {
	const { token, user, organization, logout } = useAuthStore();

	const [summaryStats, setSummaryStats] = useState<AnalyticEventSummary | null>(null);

	const [showBreakdown, setShowBreakdown] = useState(false);
	const [loadingSummary, setLoadingSummary] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	
	const [events, setEvents] = useState<AnalyticEvent[]>([]);
	const [loadingEvents, setLoadingEvents] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState('');
	const [breakdownErrorMessage, setBreakdownErrorMessage] = useState('');


	useEffect(() => {
		if (!token) return;
		const getSummary = async () => {
			try {
				const summaryData = await AnalyticsApi.getAnalyticSummary(token);
				setSummaryStats(summaryData);
				setErrorMessage('');
			} catch (error: any) {
				setErrorMessage(error?.message ?? 'Something went wrong...');
			} finally {
				setLoadingSummary(false);
			}
		}
		getSummary();
	}, []);

	const handleShowEventBreakdownClick = (eventTypeKey: string) => {
		if (!token) return;
		if (!events.length) {
			setLoadingEvents(true);
			const getEvents = async () => {
				try {
					const eventData = await AnalyticsApi.getAnalyticEvents(token);
					setEvents(eventData);
					setBreakdownErrorMessage('');
				} catch (error: any) {
					setBreakdownErrorMessage(error?.message ?? 'Something went wrong...');
				} finally {
					
					setLoadingEvents(false);
				}
			}
			getEvents();
		}
		if (eventTypeKey === selectedEvent) {
			setShowBreakdown(false);
			setSelectedEvent('');
		} else {
			setSelectedEvent(eventTypeKey);
			setShowBreakdown(true);
		}
	}

	if (loadingSummary) {
		return (
			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '100vh'
			}}>
				<CircularProgress />
			</Box>
		)
	}

	if (errorMessage) {
		return (
			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '100vh',
				color: 'red'
			}}>
				Something went wrong...
			</Box>
		)
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
			<AppBar >
				<Toolbar>
					<Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600}}>
						{`${user?.firstName} ${user?.lastName} - ${organization?.name} Dashboard`}
					</Typography>
					<Button
					type="submit"
					variant="contained"
					size="large"
					sx={{
						my: 1,
					}}
					onClick={(e) => logout()}
				>
					Log Out
				</Button>
				</Toolbar>
			</AppBar>
			<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
				<Typography variant="h4">
					Event Overview
				</Typography>
				<Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<Container maxWidth='lg' sx={{display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center', py: 4}}>
						{/* <Typography variant="h4">
							Event Overview
						</Typography> */}
						<Container>
							{
								summaryStats 
								? Object.keys(summaryStats).map((key: string) => {
									return (
										<Container key={key} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingY: "1rem"}}>
											<Card sx={{flexGrow: 1 }}>
												<CardContent sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, justifyContent: 'space-between', pt: '1.5rem'}}>
													<Box sx={{ display: 'flex', alignItems: 'center'}}>
														<Typography>
															{summaryTitleRecord[key]}:
														</Typography>
														<Typography pl={1}>
															{summaryStats[key as keyof typeof summaryStats]}
														</Typography>
													</Box>
													<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
														<Button
															variant="contained"
															onClick={(e) => handleShowEventBreakdownClick(key)}
														>
															{ showBreakdown && selectedEvent === key
																? "Hide Event Breakdown"
																: "Show Event Breakdown"
															}
														</Button>
													</Box>
												</CardContent>
											</Card>
										</Container>
									);
								})
								: <Typography>
									We didnt find any statistics for your organization. Check back later.
								</Typography>
							}

						</Container>
					</Container>

					{
						showBreakdown ? (
							!breakdownErrorMessage 
								? (
									<Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1}}>
									{ loadingEvents
										? <CircularProgress />
										: <EventChart title={eventTitleRecord[selectedEvent]} events={getEventDataByType(selectedEvent, events)}/>
									}
									
									</Container>
								)
								: (
									<Box sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										minHeight: '100vh',
										color: 'red'
									}}>
										Something went wrong...
									</Box>
								)
							)
							: null
					}
				</Container>

			</Container>
		</Box>
	)
}

const getEventDataByType = (summaryKey: string, events: AnalyticEvent[]): AnalyticEvent[] => {
	if (EventSummaryToEventType[summaryKey] === 'all') return events;

	return events.filter((event) => event.type === EventSummaryToEventType[summaryKey])

}