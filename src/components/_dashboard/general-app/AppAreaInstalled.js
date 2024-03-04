import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, TextField, CircularProgress } from '@material-ui/core';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

export default function AppAreaInstalled(props) {
    const { years, data, getData, loading } = props;
    const [year, setYear] = useState(years);
    const heading = year === undefined ? "" : "Total Users in " + year

    const [CHART_DATA, setCHART_DATA] = useState([]);

    useEffect(() => {
        if (data) {
            setYear(years);
            setCHART_DATA([data]);
        }
    }, [data, years]);

    const [seriesData, setSeriesData] = useState(2023);

    const handleChangeSeriesData = async (event) => {
        setSeriesData(Number(event.target.value));

        let startDate = `${event.target.value}-01-01T00:00:00`;
        let endDate = `${event.target.value}-12-31T23:59:59`;
        await getData(startDate, endDate, parseInt(event.target.value));
    };

    const chartOptions = merge(BaseOptionChart(), {
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    });

    return (
        <Card>
            <CardHeader
                title={heading}
                subheader=""
                action={
                    <TextField
                        select
                        fullWidth
                        value={seriesData}
                        SelectProps={{ native: true }}
                        onChange={handleChangeSeriesData}
                        sx={{
                            '& fieldset': { border: '0 !important' },
                            '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
                            '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
                            '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 }
                        }}
                    >
                        {/* {CHART_DATA.map((option) => (
                            <option key={option.year} value={option.year}>
                                {option.year}
                            </option>
                        ))} */}
                        {year !== undefined ? (
                            <>
                                <option key={year - 2} value={year - 2}>
                                    {year - 2}
                                </option>
                                <option key={year - 1} value={year - 1}>
                                    {year - 1}
                                </option>
                                <option key={year} value={year}>
                                    {year}
                                </option>
                                <option key={year + 1} value={year + 1}>
                                    {year + 1}
                                </option>
                                <option key={year + 2} value={year + 2}>
                                    {year + 2}
                                </option>
                            </>
                        ) : null}
                    </TextField>
                }
            />

            {loading ? (
                <div className="loader">
                    <br />
                    <CircularProgress
                        style={{
                            marginLeft: '20px',
                            display: 'flex',
                            'align-items': 'center',
                            'justify-content': 'center',
                            height: '100px;'
                        }}
                    />
                </div>
            ) : (
                <>
                        {CHART_DATA.map((item) => (
                            <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
                                {item.year === seriesData && (
                                    <ReactApexChart type="line" series={item.data} options={chartOptions} height={364} />
                                )}
                            </Box>
                        ))}
                    <br />
                </>
            )}
            <br />
        </Card>
    );
}
