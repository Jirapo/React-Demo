/* eslint-disable no-constant-condition */
import { parse } from 'qs';
import moment from 'moment';

import { take, put, call, fork, select} from 'redux-saga/effects';
import { takeEvery, takeLatest } from 'redux-saga';

import * as actions from '../actions';
import api from '../services';

// const action = type => ({type})


export function* queryTblist({payload}) {
  yield put({ type: actions.SHOW_TBLIST_LOADING });
  yield put({
      type: actions.UPDATE_QUERYKEY_TBLIST,
      payload: { page: 1, ...payload },
    });
  const { data } = yield call(api.tblist.query, parse(payload));

  if (data && data.success) {
    yield put({
      type: actions.QUERY_TBLIST_SUCCESS,
      payload: {
        data: data.data,
        total: data.page.total,
        current: data.page.current,
      }
    });
  }
}

export function* delTblist({payload}) {
  yield put({ type: actions.SHOW_TBLIST_LOADING });
  const {data} = yield call(api.tblist.remove, payload);

  if (data && data.success) {
    yield put({
      type: actions.DELETE_TBLIST_SUCCESS,
      payload: {
        data: data.data,
        total: data.page.total,
        current: data.page.current,
      },
    });
  }
}

export function* updateTblist({payload}) {
  yield put({ type: actions.HIDE_TBLIST_MODAL });
  yield put({ type: actions.SHOW_TBLIST_LOADING });

  payload.timestamp = moment().format('YYYYMMDD HH:mm:ss');

  const {data} = yield call(api.tblist.update, payload);

  if (data && data.success) {
    yield put({
      type: actions.UPDATE_TBLIST_SUCCESS,
      payload: {
        data: data.data,
        total: data.page.total,
        current: data.page.current,
      },
    });
  }
}

export function* createTblist({payload}) {
  yield put({ type: actions.HIDE_TBLIST_MODAL });
  yield put({ type: actions.SHOW_TBLIST_LOADING  });

  payload.timestamp = moment().format('YYYYMMDD HH:mm:ss');

  const {data} = yield call(api.tblist.create, payload);

  if (data && data.success) {
    yield put({
      type: actions.CREATE_TBLIST_SUCCESS,
      payload: {
        data: data.data,
        total: data.page.total,
        current: data.page.current,
      },
    });
  }
}


export function* watchTblist() {
  yield* [
    takeLatest(actions.QUERY_TBLIST, queryTblist),
    takeEvery(actions.DELETE_TBLIST, delTblist),
    takeEvery(actions.UPDATE_TBLIST, updateTblist),
    takeEvery(actions.CREATE_TBLIST, createTblist),
  ]
}



export function* queryDatasrc({payload}) {
  yield put({ type: actions.SHOW_DATASRC_LOADING });
  if(!payload.id){
    yield put({
      type: actions.UPDATE_QUERYKEY_DATASRC,
      payload: payload.id ? payload : { page: 1, ...payload },
    });
  }
  const { data } = yield call(api.datasrc.query, parse(payload));

  if (data && data.success) {
    yield put({
      type: actions.QUERY_DATASRC_SUCCESS,
      payload: payload.id 
        ? {currentItem: data.data}
        : {
          data: data.data,
          total: data.page.total,
          current: data.page.current,
        }
    });
  }else{
    yield put({
      type: actions.QUERY_DATASRC_FAILURE,
      payload:{
        msg: data.msg,
      }
    });
  }
}

export function* delDatasrc({payload}) {
  yield put({ type: actions.SHOW_DATASRC_LOADING });
  const {data} = yield call(api.datasrc.remove, payload);

  if (data && data.success) {
    yield put({
      type: actions.DELETE_DATASRC_SUCCESS,
      payload: {
        data: data.data,
        total: data.page.total,
        current: data.page.current,
      },
    });
  }
}

export function* updateDatasrc({payload}) {
  yield put({ type: actions.SHOW_DATASRC_LOADING  });

  const id = yield select(({ datasrc }) => datasrc.currentItem.id);
  const newItem = { ...payload, id };
  const {data} = yield call(api.datasrc.update, payload);

  if (data && data.success) {
    yield put({
      type: actions.UPDATE_DATASRC_SUCCESS,
      payload: {
        currentItem: newItem,
        msg: data.msg
      },
    });
  }
}

export function* createDatasrc({payload}) {
  yield put({ type: actions.SHOW_DATASRC_LOADING  });

  const {data} = yield call(api.datasrc.create, payload);

  if (data && data.success) {
    yield put({
      type: actions.CREATE_DATASRC_SUCCESS,
      payload: {
        currentItem: data.data,
        msg: data.msg
      },
    });
  }else{
    yield put({
      type: actions.CREATE_DATASRC_FAILURE,
      payload:{
        msg: data.msg,
        currentItem: payload,
        loading: false
      }
    });
  }
}


export function* watchDatasrc() {
  yield* [
    takeLatest(actions.QUERY_DATASRC, queryDatasrc),
    takeEvery(actions.DELETE_DATASRC, delDatasrc),
    takeEvery(actions.UPDATE_DATASRC, updateDatasrc),
    takeEvery(actions.CREATE_DATASRC, createDatasrc),
  ]
}

export default function* rootSaga() {
  yield [
    fork(watchDatasrc),
    fork(watchTblist),
  ]
}


/*
function* watchDelTblist() {
  while(true) {
    const {payload} = yield take(actions.DELETE_TBLIST)
    const {data} = yield call(api.tblist.remove, payload)
    if (data && data.success) {
      yield put({
        type: actions.DELETE_TBLIST_SUCCESS,
        payload: {
          data: data.data,
          total: data.page.total,
          current: data.page.current,
        },
      });
    }
  }
}
*/


