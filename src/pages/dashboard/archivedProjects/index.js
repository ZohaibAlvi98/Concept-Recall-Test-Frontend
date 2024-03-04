import { useEffect, useState } from 'react';
import List from './List';
import CoreHttpHandler from 'src/http/services/CoreHttpHandler';
import Swal from 'sweetalert2';
import LoadingScreen from 'src/components/LoadingScreen';

export default function ArchivedProjects() {

    const [loading, setLoading] = useState(false);
    const [projectData, setProjectData] = useState([])
    const [type, setType] = useState('current')

    useEffect(() => {
        getProjectData();
    }, []);

    const getProjectData = async () => {
        let data = {
            key: ':type',
            value: 'archived'
        }
        CoreHttpHandler.request(
            'projects',
            'fetchAll',
            {
                ...data
            },
            (response) => {
                setProjectData(response);
            },
            (failure) => {
                console.log(failure);
            }
        );
    };

    const handleFilterChange = (filterBy, filterValue, sortBy, sortOrder) => {
        let params = {
            filterBy, filterValue, sortBy, sortOrder, type: 'archived'
        }
        CoreHttpHandler.request(
            'projects',
            'search',
            {
                ...params
            },
            (response) => {
                setProjectData(response);
            },
            (failure) => {
                console.log(failure);
            }
        );
    }

    return (
        <>
            {loading ? (
                <LoadingScreen
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        position: 'fixed',
                        zIndex: 9999,
                        top: 0,
                        left: 0
                    }}
                />
            ) : (
                <></>
            )}

            <>
                <List projectData={projectData?.data?.data} getProjectData={getProjectData} handleFilterChange={handleFilterChange} />
            </>

        </>
    );
}
