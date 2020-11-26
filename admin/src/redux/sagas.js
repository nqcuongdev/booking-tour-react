import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import appMenuSaga from './appMenu/saga';
import tourSaga from './tour/saga';

export default function* rootSaga(getState) {
    yield all([authSaga(), layoutSaga(), appMenuSaga(), tourSaga()]);
}
