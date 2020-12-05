import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';
import Tour from './tour/reducers';
import Destination from './destination/reducers';

export default combineReducers({
    Auth,
    AppMenu,
    Layout,
    Tour,
    Destination,
});
