import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
import Register from 'src/pages/authentication/Register';
import CompletedProjects from 'src/pages/dashboard/completedProjects';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname } = useLocation();
    const isDashboard = pathname.includes('/dashboard');

    return (
        <Suspense
            fallback={
                <LoadingScreen
                    sx={{
                        ...(!isDashboard && {
                            top: 0,
                            left: 0,
                            width: 1,
                            zIndex: 9999,
                            position: 'fixed'
                        })
                    }}
                />
            }
        >
            <Component {...props} />
        </Suspense>
    );
};

export default function Router() {
    return useRoutes([
        {
            path: 'auth',
            children: [
                {
                    path: 'login',
                    element: (
                        <GuestGuard>
                            <Login />
                        </GuestGuard>
                    )
                },
                {
                    path: 'register',
                    element: (
                      <GuestGuard>
                        <Register />
                      </GuestGuard>
                    )
                  },
                { path: 'login-unprotected', element: <Login /> }
            ]
        },

        // Dashboard Routes
        {
            path: 'dashboard',
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
            children: [
                { index: true, element: <Navigate to="/dashboard/app" replace /> },
                { path: 'app', element: <GeneralApp /> },
                { path: 'projects/all', element: <CurrentProject /> },
                { path: 'projects/archived', element: <ArchivedProject /> },
                { path: 'projects/completed', element: <CompletedProjects /> }

            ]
        },

        // Main Routes
        {
            path: '*',
            element: <LogoOnlyLayout />,
            children: [
                // { path: 'coming-soon', element: <ComingSoon /> },
                // { path: 'maintenance', element: <Maintenance /> },
                // { path: 'payment', element: <Payment /> },
                { path: '404', element: <NotFound /> },
                { path: '*', element: <Navigate to="/404" replace /> }
            ]
        },
        {
            path: '/',
            element: <MainLayout />,
            children: [
                { index: true, element: <Navigate to="/auth/login" replace /> }
                // { path: 'about-us', element: <About /> },
                // { path: 'contact-us', element: <Contact /> },
                // { path: 'faqs', element: <Faqs /> }
            ]
        },
        { path: '*', element: <Navigate to="/404" replace /> }
    ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));

// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));

const CurrentProject = Loadable(lazy(() => import('../pages/dashboard/currentProjects/index')));

const ArchivedProject = Loadable(lazy(() => import('../pages/dashboard/archivedProjects/index')));

const NotFound = Loadable(lazy(() => import('../pages/Page404')));
