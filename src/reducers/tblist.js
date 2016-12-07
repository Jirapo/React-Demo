import {
  QUERY_TBLIST,
  QUERY_TBLIST_SUCCESS,
  CREATE_TBLIST,
  CREATE_TBLIST_SUCCESS,
  UPDATE_TBLIST,
  UPDATE_TBLIST_SUCCESS,
  DELETE_TBLIST,
  DELETE_TBLIST_SUCCESS,
  SHOW_TBLIST_LOADING,
  SHOW_TBLIST_MODAL,
  HIDE_TBLIST_MODAL,
  UPDATE_QUERYKEY_TBLIST
} from '../actions';


const initialState = {
  loading: false,
  data:[],
  total: 0,
  current: 1,
  currentItem: {},
  modalVisible: false,
  modalType: 'create',
};


const tblist = (state = initialState, action) => {

  switch (action.type) {
    case 'SHOW_TBLIST_LOADING':
      return { ...state, loading: true };
    case 'QUERY_TBLIST_SUCCESS':
    case 'DELETE_TBLIST_SUCCESS':
    case 'CREATE_TBLIST_SUCCESS':
    case 'UPDATE_TBLIST_SUCCESS':
      return { ...state, ...action.payload, loading: false };
    case 'SHOW_TBLIST_MODAL':
      return { ...state, ...action.payload, modalVisible: true };
    case 'HIDE_TBLIST_MODAL':
      return { ...state, modalVisible: false };
    case 'UPDATE_QUERYKEY_TBLIST':
      return { ...state, ...action.payload };
    default:
      return state
  }
};

export default tblist;
