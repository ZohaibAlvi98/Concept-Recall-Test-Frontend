import { useEffect } from 'react';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch } from '../../../redux/store';
import { getCards, getProfile, getInvoices, getAddressBook, getNotifications } from '../../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ParentBuilderForm from 'src/components/_dashboard/coach-builder/ParentBuilderForm';
import CategoryList from './CategoryList';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

export default function MainForm(props) {
    const { parentBackClick, handleSubmit } = props;
    const { themeStretch } = useSettings();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCards());
        dispatch(getAddressBook());
        dispatch(getInvoices());
        dispatch(getNotifications());
        dispatch(getProfile());
    }, [dispatch]);

    return (
        <Page title="Coach Builder">
            <div style={{ marginLeft: '20px' }}>
                <HeaderBreadcrumbs
                    heading="Coach Builder"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Coach Builder', setFunc: [props?.parentBackClick] },
                        { name: props?.coachBuilderData?.mainHeading, setFunc: [props?.parentBackClick] },
                        {
                            name:
                                props?.coachBuilderData?.gender.charAt(0).toUpperCase() +
                                props?.coachBuilderData?.gender.slice(1)
                        }
                    ]}
                />
            </div>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <ParentBuilderForm coachBuilderData={props?.coachBuilderData} handleSave={handleSubmit} />
            </Container>
            <br />

            <CategoryList
                categories={props?.coachBuilderData?.categories}
                handleCategoryEditClick={props?.handleCategoryEditClick}
                mainHeading={props?.coachBuilderData?.mainHeading}
                gender={props?.coachBuilderData?.gender}
            />
            <br />
            <LoadingButton style={{ marginLeft: '20px' }} type="submit" variant="contained" onClick={parentBackClick}>
                Back
            </LoadingButton>
        </Page>
    );
}
