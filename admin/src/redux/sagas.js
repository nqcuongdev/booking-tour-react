import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import appMenuSaga from './appMenu/saga';
import tourSaga from './tour/saga';
import destinationSaga from './destination/saga';
import notificationSaga from './notification/saga';
import hotelSaga from './hotel/saga';
import orderSaga from './order/saga';
import postSaga from './post/saga';
import reviewSaga from './review/saga';
import userSaga from './user/saga';

export default function* rootSaga(getState) {
    yield all([
        authSaga(),
        layoutSaga(),
        appMenuSaga(),
        tourSaga(),
        destinationSaga(),
        notificationSaga(),
        hotelSaga(),
        orderSaga(),
        postSaga(),
        reviewSaga(),
        userSaga(),
    ]);
}
