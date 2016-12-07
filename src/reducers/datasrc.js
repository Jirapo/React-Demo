import * as actions from '../actions'


const initialState = {
  loading: false,
  data:[],
  total: 0,
  current: 1,
  currentItem: {},
  indexItem:[],
  modalVisible: false,
  id:'',
  msg:'',
  ack: true
};


const DATASRC = (state = initialState, action) => {
  // console.log('action', action)

  switch (action.type) {
    case actions.SHOW_DATASRC_LOADING:
      return { ...state, loading: true };
    case actions.QUERY_DATASRC_SUCCESS:
    case actions.DELETE_DATASRC_SUCCESS:
    case actions.CREATE_DATASRC_SUCCESS:
    case actions.UPDATE_DATASRC_SUCCESS:
      return { ...state, ...action.payload, loading: false, ack: true };
    case actions.SHOW_DATASRC_MODAL:
      return { ...state, ...action.payload, modalVisible: true };
    case actions.HIDE_DATASRC_MODAL:
      return { ...state, modalVisible: false };
    case actions.UPDATE_QUERYKEY_DATASRC:
    case actions.QUERY_DATASRC_FAILURE:
    case actions.CREATE_DATASRC_FAILURE:
      return { ...state, ...action.payload, ack: false };
    case actions.RESET_DATASRC_MSG:
      return {...state, ack: true, msg: ''};
    case actions.RESET_DATASRC:
      return initialState;
    default:
      return state
  }
}

export default DATASRC
