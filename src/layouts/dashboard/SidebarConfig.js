// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
    coach: getIcon('ic_coach'),
    completed: getIcon('ic_completed'),
    dashboard: getIcon('ic_dashboard'),
    archived: getIcon('archived'),

};

const sidebarConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
        subheader: 'Panel',
        items: [
            {
                title: 'Dashboard',
                path: PATH_DASHBOARD.general.app,
                icon: ICONS.dashboard
            },
            { title: 'Current Projects', path: PATH_DASHBOARD.general.currentProjects, icon: ICONS.coach },
            { title: 'Archived Projects', path: PATH_DASHBOARD.general.archivedProjects, icon: ICONS.archived },
            { title: 'Completed Projects', path: PATH_DASHBOARD.general.completedProjects, icon: ICONS.completed },
            ]
    }
];

export default sidebarConfig;
