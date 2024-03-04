import { Container, Grid, Skeleton } from '@material-ui/core';

// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ProjectCard from 'src/components/_dashboard/project/cards/ProjectCard';
import Filter from 'src/components/_dashboard/project/filter';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    {[...Array(8)].map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '115%', borderRadius: 2 }} />
      </Grid>
    ))}
  </>
);

export default function UserCards(props) {
  const {projectData,handleFilterChange,getProjectData} = props

  return (
    <Page title="Archived Projects">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading="Archived Projects"
          links={[
            { name: 'Dashboard' },
            { name: 'Archived Projects' }
          ]}
        />
        <Filter handleFilterChange={handleFilterChange} getProjectData={props.getProjectData} />

        <Grid container spacing={3}>
          {projectData?.map((project) => (
            <Grid key={project.id} item xs={12} sm={6} md={4}>
              <ProjectCard project={project} getProjectData={props.getProjectData} handleSave={props?.handleSubmit} />
            </Grid>
          ))}

           {/* {!projectData?.length && SkeletonLoad} */}
           <br />
          {projectData?.length === 0 ? (
          <Grid container justifyContent="center" alignItems="center" style={{ height: '40vh' }}>
            <h3>No Data Found</h3>
          </Grid>
        ) : null}
        </Grid>
       <br />

      </Container>
    </Page>
  );
}
