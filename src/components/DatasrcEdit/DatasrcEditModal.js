import React, { PropTypes } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';
const FormItem = Form.Item;
const Option = Select.Option;

import messages from '../../messages/DatasrcIndexTb.message';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};


const DatasrcEditModal = ({
  visible,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },
  }) => {

  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = { ...getFieldsValue()};
      onOk(data);
    });
  }


  const modalOpts = {
    title: <FormattedMessage {...messages.addBtn} />,
    visible,
    onOk: handleOk,
    onCancel,
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem
          label={<FormattedMessage {...messages.where} />}
          hasFeedback
          {...formItemLayout}
          >
          {getFieldDecorator('where', {
            // initialValue: item.where,
            rules: [{ required: true, message: 'Required' },
              // { validator: checkNumber },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label={<FormattedMessage {...messages.type} />}
          hasFeedback
          {...formItemLayout}
          >
          {getFieldDecorator('type', {
            rules: [{ required: true, message: 'Required' },
            ],
          })(
            <Select placeholder="Please select a type">
              <Option value="TO_MANY" key="TO_MANY">TO_MANY</Option>
              <Option value="TO_ONE" key="TO_ONE">TO_ONE</Option>
            </Select>
          )}
        </FormItem>
        
      </Form>
    </Modal>
  );
};

DatasrcEditModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  // item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(DatasrcEditModal);

