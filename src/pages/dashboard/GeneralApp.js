// material
import { Container, Grid } from '@material-ui/core';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import {
    AppWelcome,
    AppAreaInstalled,
    AppTotalInstalled,
    AppTotalActiveUsers,
    AppNewInvoice,
    AppTotalDownloads,
    AppCurrentDownload
} from '../../components/_dashboard/general-app';
import { useEffect, useState } from 'react';
import CoreHttpHandler from 'src/http/services/CoreHttpHandler';

// ----------------------------------------------------------------------

export default function GeneralApp() {
    const { themeStretch } = useSettings();
    const { user } = useAuth();

    const [data, setData] = useState();
    const [year, setYear] = useState();

    const [loading, setLoading] = useState(false);
    const [totalActiveUsers, setTotalActiveUsers] = useState();
    const [totalEarnings, setTotalEarnings] = useState();

    useEffect(() => {
        getData();
        getCardData();
    }, []);

    const getData = (startDate, endDate, year) => {
        setLoading(true);
        if (startDate === undefined) {
            let year = new Date().getFullYear();
            setYear(year);
            startDate = `${year}-01-01T00:00:00`;
            endDate = `${year}-12-31T23:59:59`;
        } else {
            setYear(year);
        }
        return new Promise((resolve, reject) => {
            let data = {
                startDate,
                endDate
            };
           
        });
    };

    const getCardData = () => {
        return new Promise((resolve, reject) => {
            // CoreHttpHandler.request(
            //     'dashboard',
            //     'all',
            //     {},
            //     (response) => {
            //         setLoading(false);
            //         setTotalActiveUsers(response?.data?.data?.userCount);
            //         setTotalEarnings(response?.data?.data?.totalEarning);
            //         resolve(response);
            //     },
            //     (failure) => {
            //         console.log(failure);
            //         reject(failure);
            //     }
            // );
        });
    };

    return (
        <Page title="BOW Admin Panel">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <AppWelcome displayName={user?.username} />
                    </Grid>

                    {/* <Grid item xs={12} md={4}>
                      <AppFeatured />
                  </Grid> */}

                    <Grid item xs={12} md={6}>
                        <AppTotalActiveUsers data={6} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <AppTotalInstalled />
                    </Grid>

                    {/* <Grid item xs={12} md={4}>
                      <AppTotalDownloads />
                  </Grid> */}
{/* 
                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentDownload />
                    </Grid> */}

                    <Grid item xs={12} lg={12}>
                        <AppAreaInstalled />
                    </Grid>

                    {/* <Grid item xs={12} lg={12}>
                        <AppNewInvoice data={totalEarnings} />
                    </Grid> */}

                    {/* <Grid item xs={12} md={6} lg={4}>
                        <AppTopRelated />
                    </Grid> */}

                    {/* <Grid item xs={12} md={6} lg={4}>
                        <AppTopInstalledCountries />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppTopAuthors />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <Stack spacing={3}>
                            <AppWidgets1 />
                            <AppWidgets2 />
                        </Stack>
                    </Grid> */}
                </Grid>
            </Container>
        </Page>
    );
}
