import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Pagination, Button } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';

import messages from '../../messages/TableList.message';

const TableList = ({
    total,
    current,
    loading,
    dataSource,
    onPageChange,
    onDeleteItem,
    onEditItem
}) => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: <FormattedMessage {...messages.server} />,
      dataIndex: 'server',
      key: 'server',
    }, {
      title: 'Topic',
      dataIndex: 'topic',
      key: 'topic',
    },{
      title: <FormattedMessage {...messages.type} />,
      dataIndex: 'type',
      key: 'type',
    }, {
      title: <FormattedMessage {...messages.timestamp} />,
      dataIndex: 'timestamp',
      key: 'timestamp',
    },{
      title: <FormattedMessage {...messages.status} />,
      dataIndex: 'status',
      key: 'status',
      render: (text) => <FormattedMessage {...messages[text]} />
    },{
      title: <FormattedMessage {...messages.operation} />,
      key: 'operation',
      render: (text, record) => (
        <p>
          <Button type="ghost" size="small" onClick={() => onEditItem(record)}><FormattedMessage {...messages.editBtn} /></Button>
          &nbsp;
          <Popconfirm title={<FormattedMessage {...messages.delDspt} />} onConfirm={()=> onDeleteItem(record.id)}>
            <Button type="ghost" size="small"><FormattedMessage {...messages.delBtn} /></Button>
          </Popconfirm>
        </p>
      ),
    }];


  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={10}
        onChange={onPageChange}
      />
    </div>
  );
}

TableList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
};

export default TableList;
