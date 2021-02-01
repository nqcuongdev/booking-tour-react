import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

// Auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));

// Dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));
// Destination
const ListDestination = React.lazy(() => import('../pages/destination/ListDestination'));
const HandleDestination = React.lazy(() => import('../pages/destination/HandleDestination'));

// Tour
const AllTour = React.lazy(() => import('../pages/tour/Tour'));
const HandleTour = React.lazy(() => import('../pages/tour/HandleTour'));
const TourCategory = React.lazy(() => import('../pages/tour/TourCategory'));
const TourStyle = React.lazy(() => import('../pages/tour/TourStyle'));
const TourAvailability = React.lazy(() => import('../pages/tour/Availability'));

// Hotel
const ListHotel = React.lazy(() => import('../pages/hotel/ListHotel'));
const HotelType = React.lazy(() => import('../pages/hotel/Type'));
const HandleForm = React.lazy(() => import('../pages/hotel/HandleForm'));
const Facility = React.lazy(() => import('../pages/hotel/Facility'));
const ListRoom = React.lazy(() => import('../pages/hotel/ListRoom'));

// Order
const ListOrder = React.lazy(() => import('../pages/order/ListOrder'));

// Post
const ListPost = React.lazy(() => import('../pages/post/ListPost'));
const HandlePost = React.lazy(() => import('../pages/post/HandlePost'));
const ListTag = React.lazy(() => import('../pages/post/ListTag'));

// Reviews
const ListReviews = React.lazy(() => import('../pages/review/ListReviews'));

//User
const ListUsers = React.lazy(() => import('../pages/user/ListUser'));

// pages
const Invoice = React.lazy(() => import('../pages/other/Invoice'));

// handle auth and authorization
const PrivateRoute = ({ component: Component, user, roles, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (!user) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
            }

            const loggedInUser = user;
            // check if route is restricted by role
            if (roles && roles.includes(loggedInUser.role)) {
                // authorized so return component
                return <Component {...props} />;
            }

            // role not authorized so redirect to home page
            // return <Redirect to={{ pathname: '/' }} />;
        }}
    />
);

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute,
};

// dashboards
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Dashboard',
    icon: FeatherIcon.Home,
    component: Dashboard,
    roles: ['admin'],
    route: PrivateRoute,
};

//Destination
const destinationRoutes = {
    path: '/destination',
    name: 'Destination',
    header: 'Apps',
    icon: FeatherIcon.Compass,
    children: [
        {
            path: '/destination/list-destination',
            name: 'List Destination',
            component: ListDestination,
            roles: ['admin', 'hotel_partner', 'tour_partner'],
            route: PrivateRoute,
        },
        {
            path: '/destination/:id',
            name: 'Add Destination',
            component: HandleDestination,
            isHidden: true,
            roles: ['admin', 'hotel_partner', 'tour_partner'],
            route: PrivateRoute,
        },
    ],
};

//Tour
const tourRoutes = {
    path: '/tour',
    name: 'Tour',
    icon: FeatherIcon.Package,
    children: [
        {
            path: '/tour/tour-category',
            name: 'Tour Category',
            component: TourCategory,
            roles: ['admin', 'tour_partner'],
            route: PrivateRoute,
        },
        {
            path: '/tour/tour-style',
            name: 'Tour Style',
            component: TourStyle,
            roles: ['admin', 'tour_partner'],
            route: PrivateRoute,
        },
        {
            path: '/tour/list-tour',
            name: 'List Tour',
            component: AllTour,
            roles: ['admin', 'tour_partner'],
            route: PrivateRoute,
        },
        {
            path: '/tour/schedule',
            name: 'Schedule',
            component: TourAvailability,
            roles: ['admin', 'tour_partner'],
            route: PrivateRoute,
        },
        {
            path: '/tour/:id',
            name: 'Add Tour',
            isHidden: true,
            component: HandleTour,
            roles: ['admin', 'tour_partner'],
            route: PrivateRoute,
        },
    ],
};

// Hotel
const hotelRoutes = {
    path: '/hotel',
    name: 'Hotel',
    icon: FeatherIcon.Briefcase,
    children: [
        {
            path: '/hotel/list-hotel',
            name: 'List Hotel',
            component: ListHotel,
            roles: ['admin', 'hotel_partner'],
            route: PrivateRoute,
        },
        {
            path: '/hotel/hotel-type',
            name: 'Hotel Type',
            component: HotelType,
            roles: ['admin', 'hotel_partner'],
            route: PrivateRoute,
        },
        {
            path: '/hotel/hotel-facility',
            name: 'Hotel Facility',
            component: Facility,
            roles: ['admin', 'hotel_partner'],
            route: PrivateRoute,
        },
        {
            path: '/hotel/:id',
            name: 'Add Hotel',
            isHidden: true,
            component: HandleForm,
            roles: ['admin', 'hotel_partner'],
            route: PrivateRoute,
        },
        {
            path: '/room/:id/list-room',
            name: 'List Room',
            component: ListRoom,
            roles: ['admin', 'hotel_partner'],
            route: PrivateRoute,
        },
        {
            isHidden: true,
            path: '/invoice/:id',
            name: 'Invoice',
            component: Invoice,
            roles: ['admin'],
            route: PrivateRoute,
        },
    ],
};

// order
const orderRoutes = {
    path: '/order/list-order',
    name: 'Order',
    icon: FeatherIcon.ShoppingBag,
    component: ListOrder,
    route: PrivateRoute,
    roles: ['admin', 'hotel_partner', 'tour_partner'],
};

// Post
const postRoutes = {
    path: '/post',
    name: 'Post',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/post/list-post',
            name: 'List Post',
            component: ListPost,
            route: PrivateRoute,
            roles: ['admin', 'hotel_partner', 'tour_partner'],
        },
        {
            path: '/post/list-tag',
            name: 'List Tag',
            component: ListTag,
            route: PrivateRoute,
            roles: ['admin', 'hotel_partner', 'tour_partner'],
        },
        {
            path: '/post/:id',
            name: 'Add Post',
            component: HandlePost,
            isHidden: true,
            route: PrivateRoute,
            roles: ['admin', 'hotel_partner', 'tour_partner'],
        },
    ],
};

// Reviews
const reviewRoutes = {
    path: '/review/list-review',
    name: 'Review',
    icon: FeatherIcon.Star,
    component: ListReviews,
    route: PrivateRoute,
    roles: ['admin', 'hotel_partner', 'tour_partner'],
};

// Users
const userRoutes = {
    path: '/user/list-user',
    name: 'User',
    icon: FeatherIcon.Users,
    component: ListUsers,
    route: PrivateRoute,
    roles: ['admin'],
};

const appRoutes = [destinationRoutes, tourRoutes, hotelRoutes, orderRoutes, postRoutes, reviewRoutes, userRoutes];

// auth
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        },
        {
            path: '/account/logout',
            name: 'Logout',
            component: Logout,
            route: Route,
        },
        {
            path: '/account/confirm',
            name: 'Confirm',
            component: Confirm,
            route: Route,
        },
        {
            path: '/account/forget-password',
            name: 'Forget Password',
            component: ForgetPassword,
            route: Route,
        },
    ],
};

// flatten the list of all nested routes
const flattenRoutes = (routes) => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach((item) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [rootRoute, dashboardRoutes, ...appRoutes, authRoutes];

const authProtectedRoutes = [dashboardRoutes, ...appRoutes];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
