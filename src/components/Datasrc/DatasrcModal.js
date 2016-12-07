import React, { PropTypes } from 'react';
import { Modal, Table } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';
import numeral from 'numeral';

import messages from '../../messages/DatasrcIndexTb.message';
import DatasrcIndexTb from './DatasrcIndexTb';


const DatasrcModal = ({
    item,
    onOk,
    visible,
    onCancel
}) => {

	const modalOpts = {
    title: <FormattedMessage {...messages.indexcfg} />,
    visible,
    onOk,
    onCancel,
  };

  const tableProps = {
    item,
    size: 'small'
  };

  return (
    <Modal {...modalOpts}>
      <DatasrcIndexTb {...tableProps}/>
		</Modal>
	);
}




DatasrcModal.propTypes = {
  visible: PropTypes.any,
  item: PropTypes.array,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default DatasrcModal;