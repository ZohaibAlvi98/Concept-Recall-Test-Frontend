import {
    Card,
    Container
} from '@material-ui/core';

// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import ProjectCard from './ProjectCards';


export default function List(props) {
    const {projectData, handleFilterChange } = props
    const { themeStretch } = useSettings();

    return (
        <Page title="Projects">
            {/* <div style={{ marginLeft: '20px' }}>
                <HeaderBreadcrumbs
                    heading="Current Projects"
                    links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Current Projects' }]}
                />
            </div> */}

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <Card>
                    <br />

                    {/* <h3 style={{ marginLeft: '20px' }}>Archived Projects</h3> */}

                    <Scrollbar>
                        <br />
                        <ProjectCard handleSubmit={props?.handleSubmit} projectData={projectData} getProjectData={props.getProjectData}  handleFilterChange={handleFilterChange}  />
                    </Scrollbar>

                  
                </Card>
            </Container>
            <br />
            <br />


           
        </Page>
    );
}
