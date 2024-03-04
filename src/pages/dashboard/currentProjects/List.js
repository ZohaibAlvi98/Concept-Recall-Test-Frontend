import {
    Card,
    Container,
    Fab
} from '@material-ui/core';

// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import ScrollDialog from 'src/components/_dashboard/project/ScrollDialog';
import { Add } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCards';


export default function List(props) {
    const {projectData, handleFilterChange} = props
    const { themeStretch } = useSettings();
    const [type,setType] = useState()
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState()

    useEffect(()=>{
        if(type == 'edit'){
            setOpen(true)
        }
    },[type])

    return (
        <Page title="Current Projects">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Card>
                    <br />

                    {/* <h3 style={{ marginLeft: '20px' }}>All Current Projects</h3> */}

                    <Scrollbar>
                        <br />
                        <ProjectCard handleFilterChange={handleFilterChange} projectData={projectData} getProjectData={props.getProjectData} setType={setType} setEditData={setEditData} />
                    </Scrollbar>

                  
                </Card>
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
                <Fab onClick={() => setOpen(true)} size="small">
                    <Add style={{ width: '20px' }} />
                </Fab>
            </div>
            <ScrollDialog
                projectData={editData} 
                open={open}
                setOpen={setOpen}
                handleSave={props.handleSave}
                setLoading={props.setLoading}
                type={type}
                setType={setType}
            />
            </Container>
            <br />
            <br />


           
        </Page>
    );
}
