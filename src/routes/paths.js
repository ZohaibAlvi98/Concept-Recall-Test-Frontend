// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    general: {
      app: path(ROOTS_DASHBOARD, '/app'),
      currentProjects: path(ROOTS_DASHBOARD, '/projects/all'),
      archivedProjects: path(ROOTS_DASHBOARD, '/projects/archived'),
      completedProjects: path(ROOTS_DASHBOARD, '/projects/completed')
  }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
