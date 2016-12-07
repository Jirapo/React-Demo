import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Pagination, Button } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';

import messages from '../../messages/DatasrcList.message';

const DatasrcList = ({
    total,
    current,
    loading,
    dataSource,
    onPageChange,
    onDeleteItem,
    onViewItem,
    onEditItem
}) => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: <FormattedMessage {...messages.tbname} />,
      dataIndex: 'tbname',
      key: 'tbname',
    }, {
    //   title: <FormattedMessage {...messages.tbdesp} />,
    //   dataIndex: 'tbdesp',
    //   key: 'tbdesp',
    //   render:(text, record) => (text.substr(0, 10) + '...')
    // },{
      title: <FormattedMessage {...messages.dbname} />,
      dataIndex: 'dbname',
      key: 'dbname',
    },{
      title: <FormattedMessage {...messages.key} />,
      dataIndex: 'key',
      key: 'key',
    },{
    //   title: <FormattedMessage {...messages.config} />,
    //   dataIndex: 'config',
    //   key: 'config',
    // },{
      title: <FormattedMessage {...messages.fields} />,
      dataIndex: 'fields',
      key: 'fields',
    },{
      title: <FormattedMessage {...messages.cpstatus} />,
      dataIndex: 'cpstatus',
      key: 'cpstatus',
      render: (text) => <FormattedMessage {...messages[text]} />
    },{
      title: <FormattedMessage {...messages.cptbname} />,
      dataIndex: 'cptbname',
      key: 'cptbname',
    },{
      title: <FormattedMessage {...messages.cmpcfg} />,
      dataIndex: 'cmpcfg',
      key: 'cmpcfg',
      render: (text) => <FormattedMessage {...messages[text]} />
    },{
      fixed: 'right',
      width: 80,
      title: <FormattedMessage {...messages.indexcfg} />,
      key: 'indexcfg',
      render: (text, record) => (
          <Button 
            type="ghost" 
            size="small" 
            disabled={record.indexcfg.length === 0}
            onClick={() => onViewItem(record)}>
            <FormattedMessage {...messages.viewBtn} />
          </Button>
      ),
    },{
      fixed: 'right',
      width: 120,
      title: <FormattedMessage {...messages.operation} />,
      key: 'operation',
      render: (text, record) => (
        <p>
          <Button type="ghost" size="small" onClick={() => onEditItem(record.id)}><FormattedMessage {...messages.editBtn} /></Button>
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
        scroll={{ x: 1250 }}
        size="middle"
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

DatasrcList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onViewItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
};

export default DatasrcList;
