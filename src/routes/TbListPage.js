import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Table, Popconfirm, Pagination,Button } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';


import * as actions from '../actions';
import TableList from '../components/Tblist/TableList';
import TableModal from '../components/Tblist/TableModal';

const messages = defineMessages({
  button: {
    id: 'Tblist.New.button',
    defaultMessage: '新建',
  },
});

class TbListPage extends Component {

  componentDidMount(){
    const {dispatch, tblist} = this.props;
    dispatch({
      type: actions.QUERY_TBLIST,
      payload: {}
    });
  }

  render() {
    const {
        tblist:{
          loading, data, total, current,currentItem, modalVisible, modalType
        },
        dispatch
      } = this.props;

    const tableListProps = {
      dataSource: data,
      loading,
      total,
      current,
      onPageChange(page) {
        dispatch({
          type: actions.QUERY_TBLIST,
          payload: {page}
        })
      },
      onEditItem(item) {
        dispatch({
          type: actions.SHOW_TBLIST_MODAL,
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        });
      },
      onDeleteItem(id) {
        dispatch({
          type: actions.DELETE_TBLIST,
          payload: {id},
        });
      },
    }

    const tableModalProps = {
      item: modalType === 'create' ? {} : currentItem,
      type: modalType,
      visible: modalVisible,
      onOk(data) {
        dispatch({
          type: modalType === 'create' ? actions.CREATE_TBLIST : actions.UPDATE_TBLIST,
          payload: data,
        });
      },
      onCancel() {
        dispatch({
          type: actions.HIDE_TBLIST_MODAL,
        });
      },
    };

    const TableModalGen = () => <TableModal {...tableModalProps} />;

    return (
      <div>
        <Button
          type="primary"
          size="default"
          style={{marginBottom: 10}}
          onClick={ e => dispatch({
                type: actions.SHOW_TBLIST_MODAL,
                payload: { modalType: 'create'}
              })
            }
          >
          <FormattedMessage {...messages.button} />
        </Button>

        <TableList {...tableListProps} />
        <TableModalGen />
      </div>
    )
  }
}

TbListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tblist: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    tblist: state.tblist,
  }
}


export default connect(mapStateToProps)(TbListPage);

