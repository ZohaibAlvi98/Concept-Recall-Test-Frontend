import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';


// material
import { alpha, styled } from '@material-ui/core/styles';
import { Box, Card, Grid, Avatar, Tooltip, Divider, Typography, IconButton } from '@material-ui/core';
// utils

import { getImageUrl } from '../../../../utils/imageUrl.js';
import CoreHttpHandler from 'src/http/services/CoreHttpHandler.js';
import Swal from 'sweetalert2';
// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  paddingTop: 'calc(100% * 9 / 16)',
  '&:before': {
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
    // backdropFilter: 'blur(3px)',
    // WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
    borderTopLeftRadius: theme.shape.borderRadiusMd,
    borderTopRightRadius: theme.shape.borderRadiusMd,
    // backgroundColor: alpha(theme.palette.primary.darker, 0.72)
  }
}));

const CoverImgStyle = styled('img')({
  top: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});


ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  getProjectData: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  setEditData: PropTypes.func.isRequired
};

export default function ProjectCard({ getProjectData,setType,setEditData,project, ...other }) {
  const { _id, name, image, status,description, techStacks,liveUrl, repoLink} = project;

  const SOCIALS = [
    {
      name: 'Git Repo',
      icon: <Icon icon={"mdi:github"} width={20} height={20} color="#1877F2" />,
      url: repoLink
    },
    {
      name: 'Live Url',
      icon: <Icon icon={"dashicons:admin-site"} width={20} height={20} color="#D7336D" />,
      url: liveUrl
    }
  ];

  const handleIconClick = (url) => {
    window.open(url, '_blank');
  };

  const handleEditClick = () => {
    setType('edit')
    setEditData(project)
  };
  
  const handleArchiveClick = (_id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: 'This will add the project to archived',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, sure!',
      cancelButtonText: 'No'
  }).then((result) => {
      if (result.isConfirmed) {
          // setLoading(true);

          let data = {
            projectId: _id,
            status: "archived"
          }
          CoreHttpHandler.request(
            'projects',
            'changeStatus',
            {
              ...data
            },
            async(response) => {
              await getProjectData()
                
            },
            (failure) => {
                console.log(failure);
            }
        );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
  };
  
  const handleCompleteClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will add the project to completed',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, sure!',
      cancelButtonText: 'No'
  }).then((result) => {
      if (result.isConfirmed) {
          // setLoading(true);

          let data = {
            projectId: _id,
            status: "completed"
          }
          CoreHttpHandler.request(
            'projects',
            'changeStatus',
            {
              ...data
            },
            async(response) => {
              await getProjectData()
                
            },
            (failure) => {
                console.log(failure);
            }
        );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
    });
  };

  function InfoItem() {
    return (
      <>
      <Grid item xs={12}>
        {/* Edit project button */}
        <IconButton onClick={handleEditClick}>
          <Icon icon={"material-symbols:edit-outline"} />
        </IconButton>
  
        {/* Archive button */}
        <IconButton onClick={()=>{handleArchiveClick(_id)}}>
          <Icon icon={"material-symbols:archive"} />
        </IconButton>
  
        {/* Checkmark button for marking as complete */}
        <IconButton onClick={handleCompleteClick}>
          <Icon icon={"ic:baseline-check"} />
        </IconButton>
      </Grid>
    </>
  
    );
  }
  

  const imageUrl = getImageUrl(image);

  return (
    <Card {...other}>
      <CardMediaStyle>
        {/* <SvgIconStyle
          color="paper"
          src="/static/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            bottom: -26,
            position: 'absolute'
          }}
        />
        <Avatar
          alt={name}
          src={avatarUrl}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            position: 'absolute',
            transform: 'translateY(-50%)'
          }}
        /> */}
        <CoverImgStyle alt="cover" src={imageUrl} />
      </CardMediaStyle>

      <Typography variant="subtitle1" align="center" sx={{ mt: 6 }}>
        {name}
      </Typography>
      <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
        {description.length > 50 ? description.substring(0,50) + "..." : description}
      </Typography>

      <br />
      <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
        {techStacks}
      </Typography>

      <Box sx={{ textAlign: 'center', mt: 2, mb: 2.5 }}>
        {SOCIALS.map((social) => (
          <Tooltip key={social.name} title={social.name}>
            <IconButton onClick={() => handleIconClick(social.url)}>{social.icon}</IconButton>
          </Tooltip>
        ))}
      </Box>

      <Divider />
      <br />
      {status == "current" ?
      <Grid container sx={{ py: 3, textAlign: 'center' }}>
        {InfoItem()}
      </Grid> : null}
      
    </Card>
  );
}
