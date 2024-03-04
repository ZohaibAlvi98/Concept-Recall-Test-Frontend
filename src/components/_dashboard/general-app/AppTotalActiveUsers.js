import ReactApexChart from 'react-apexcharts';
// material
import { useTheme } from '@material-ui/core/styles';
import { Box, Card, Typography, Stack } from '@material-ui/core';

const CHART_DATA = [{ data: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26] }];

export default function AppTotalActiveUsers(props) {
    const { data } = props;
    const theme = useTheme();

    const chartOptions = {
        colors: [theme.palette.primary.main],
        chart: { sparkline: { enabled: true } },
        plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
        labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
        tooltip: {
            enabled: false // Disable tooltip
        },
        markers: {
            size: 0 // Set marker size to 0 to hide the circle
        },
        stroke: {
            show: false // Hide stroke lines
        }
    };

    return (
        <Card sx={{ display: 'flex', alignItems: 'center', p: 4 }}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle">Total Active Users</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                    {/* <IconWrapperStyle
                        sx={{
                            ...(PERCENT < 0 && {
                                color: 'error.main',
                                bgcolor: alpha(theme.palette.error.main, 0.16)
                            })
                        }}
                    >
                        <Icon width={16} height={16} icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill} />
                    </IconWrapperStyle>
                    <Typography component="span" variant="subtitle2">
                        {PERCENT > 0 && '+'}
                        {fPercent(PERCENT)}
                    </Typography> */}
                </Stack>

                <Typography variant="h3">{data}</Typography>
            </Box>

            <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} width={60} height={36} />
        </Card>
    );
}
