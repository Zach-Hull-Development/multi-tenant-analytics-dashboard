import { Box, Card, CardContent, Typography } from "@mui/material"
import { AnalyticEvent } from "../models/AnalyticEvent";
import { LineChart } from "@mui/x-charts";

interface EventChartProps {
  title: string;
  events: AnalyticEvent[];
}

export const EventChart = ({title, events}: EventChartProps) => {
    const dailyCount: Record<string, number> = {};

    events.forEach((event) => {
        const date = new Date(event.timestamp).toISOString().split('T')[0];
        dailyCount[date] = (dailyCount[date] || 0) + 1;
    });

    const sortedDates = Object.keys(dailyCount).sort();

    const chartData = {
        xAxisData: sortedDates,
        seriesData: sortedDates.map((date) => dailyCount[date]),
    };


    return (
        <Card sx={{ flexGrow: 1}}>
            <CardContent>
                <Typography>
                    {title}
                </Typography>
                {
                    chartData.seriesData.length > 0 ? (
                        <Box>
                            <LineChart
                                xAxis={[
                                    {
                                        data: chartData.xAxisData,
                                        scaleType: 'band',
                                        label: 'Date',
                                    }
                                ]}
                                series={[
                                    {
                                        data: chartData.seriesData,
                                        label: title,
                                        color: 'red',
                                        area: true,
                                        showMark: true,
                                    }
                                ]}
                                height={380}
                            />
                        </Box>
                    )
                    : <Typography>No Event Data Found</Typography>
                }
            </CardContent>
        </Card>
    )
}