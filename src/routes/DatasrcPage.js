import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Table, Popconfirm, Pagination, Button } from 'antd';
import {  hashHistory, Link } from 'react-router';
import { FormattedMessage, defineMessages } from 'react-intl';

import * as actions from '../actions';
import DatasrcList from '../components/Datasrc/DatasrcList';
import DatasrcModal from '../components/Datasrc/DatasrcModal';


class DatasrcPage extends Component {

  componentDidMount(){
    const {dispatch, datasrc} = this.props;
    dispatch({
      type: actions.QUERY_DATASRC,
      payload: {}
    });
  }

  render() {
    const {
        datasrc:{
          loading, data, total, current,currentItem, modalVisible, indexItem
        },
        dispatch
      } = this.props;

    const DatasrcListProps = {
      dataSource: data,
      loading,
      total,
      current,
      onPageChange(page) {
        dispatch({
          type: actions.QUERY_DATASRC,
          payload: {page}
        });
      },
      onEditItem(id) {
        hashHistory.push('/dsudpt?id=' + id);

      },
      onViewItem(item){
        if(item.indexcfg.length > 0){
          dispatch({
            type: actions.SHOW_DATASRC_MODAL,
            payload: {
              indexItem: item.indexcfg,
            },
          });
        }
      },
      onDeleteItem(id) {
        dispatch({
          type: actions.DELETE_DATASRC,
          payload: {id},
        });
      },
    }
    
    const DatasrcModalProps = {
      item: indexItem,
      visible: modalVisible,
      onOk(data) {
        dispatch({ type: actions.HIDE_DATASRC_MODAL});
      },
      onCancel() {
        dispatch({ type: actions.HIDE_DATASRC_MODAL});
      },
    };
    
    const DatasrcModalGen = () => <DatasrcModal {...DatasrcModalProps} />;

    return (
      <div>
        <DatasrcList {...DatasrcListProps}/>
        <DatasrcModalGen />
      </div>
    )
  }
}

DatasrcPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  datasrc: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    datasrc: state.datasrc,
  }
}


export default connect(mapStateToProps)(DatasrcPage);
