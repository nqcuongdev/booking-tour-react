import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';
import Tour from './tour/reducers';
import Destination from './destination/reducers';
import Notification from './notification/reducers';
import Hotel from './hotel/reducers';
import Order from './order/reducers';
import Post from './post/reducers';
import Review from './review/reducers';
import User from './user/reducers';

export default combineReducers({
    Auth,
    AppMenu,
    Layout,
    Tour,
    Destination,
    Notification,
    Hotel,
    Order,
    Post,
    Review,
    User,
});
