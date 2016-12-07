import React, { PropTypes } from 'react';
import { Table } from 'antd';
import { FormattedMessage } from 'react-intl';
import numeral from 'numeral';

import messages from '../../messages/DatasrcIndexTb.message';

const DatasrcIndexTb = ({
    item,
    extendCol,
    size
}) => {

	let columns = [
	    {
	      title: 'id',
	      dataIndex: 'id',
	      key: 'id',
	    }, {
	      title: <FormattedMessage {...messages.where} />,
	      dataIndex: 'where',
	      key: 'where',
	    }, {
	      title: <FormattedMessage {...messages.type} />,
	      dataIndex: 'type',
	      key: 'type',
	    },{
	      title: <FormattedMessage {...messages.updatetime} />,
	      dataIndex: 'updatetime',
	      key: 'updatetime',
	    },{
	      title: <FormattedMessage {...messages.size} />,
	      dataIndex: 'size',
	      key: 'size',
	      render:(text, record) => numeral(text).format('0 a')
	    },{
	      title: <FormattedMessage {...messages.status} />,
	      dataIndex: 'status',
	      key: 'status',
	      render:(text) => <FormattedMessage {...messages[text]} />
	    }];

	   if(extendCol){
	   	columns = [...columns, extendCol];
	   }

    return (
    	<Table
        columns={columns}
        dataSource={item}
        loading={false}
        rowKey={record => record.id}
        pagination={false}
        size={size}
      />
    );

}

DatasrcIndexTb.propTypes = {
  item: PropTypes.array,
  extendCol: PropTypes.object,
  size: PropTypes.string
};

export default DatasrcIndexTb;