import React, { PropTypes } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';
const FormItem = Form.Item;
const Option = Select.Option;

import messages from '../../messages/TableModal.message';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};


const TableModal = ({
  visible,
  item = {},
  onOk,
  onCancel,
  type,
  loading,
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
    title: type === 'create'
      ? <FormattedMessage {...messages.newTitle} />
      : <FormattedMessage {...messages.editTitle} /> ,
    visible,
    onOk: handleOk,
    onCancel,
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        {
          type !== 'create' &&
          <FormItem
          label="ID："
          hasFeedback
          {...formItemLayout}
          >
          {getFieldDecorator('id', {
            initialValue: item.id
          })(
            <Input type="text" disabled/>
          )}
          </FormItem>
        }

        <FormItem
          label={<FormattedMessage {...messages.usrname} />}
          hasFeedback
          {...formItemLayout}
          >
          {getFieldDecorator('usrname', {
            initialValue: item.usrname,
            rules: [{ required: true, message: 'Required' },
              // { validator: checkNumber },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label={<FormattedMessage {...messages.password} />}
          hasFeedback
          {...formItemLayout}
          >
          {getFieldDecorator('password', {
            initialValue: item.password,
            rules: [{ required: true, message: 'Required' },
            ],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          label={<FormattedMessage {...messages.address} />}
          hasFeedback
          {...formItemLayout}
          >
          {getFieldDecorator('address', {
            initialValue: item.address,
            rules: [
              { required: true, message: 'Required' },
              {
                pattern: /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/,
                message: 'Invalid Address Type'
              }
            ],
          })(
            <Input type="address" />
          )}
        </FormItem>
        <FormItem
          label="Topic："
          hasFeedback
          {...formItemLayout}
          >
          {getFieldDecorator('topic', {
            initialValue: item.topic,
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
            initialValue: item.type,
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label={<FormattedMessage {...messages.server} />}
          hasFeedback
          {...formItemLayout}
          >
          {getFieldDecorator('server', {
            initialValue: item.server,
            rules: [
              { required: true, message: 'Required' },
              {
                pattern: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
                message: 'Invalid Server Type'
              }
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
         {...formItemLayout}
         label={<FormattedMessage {...messages.status} />}
         >
         {getFieldDecorator('status', {
           rules: [
             { required: true, message: 'Please select your status!' },
           ],
         })(
            <Select placeholder="Please select a status"
                 >
              <Option value="start" key="start"><FormattedMessage {...messages.start} /></Option>
              <Option value="stop" key="stop"><FormattedMessage {...messages.stop} /></Option>
            </Select>
         )}
       </FormItem>
      </Form>
    </Modal>
  );
};

TableModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  type: PropTypes.string,
};

export default Form.create({
  mapPropsToFields:({item}) =>({
    id: {value : item.id || ''},
    address: {value : item.address || ''},
    usrname: {value : item.usrname || ''},
    password: {value : item.password || ''},
    topic: {value : item.topic || ''},
    type: {value : item.type || ''},
    server: {value : item.server || ''},
    status: {value : item.status || ''}
  }) 
})(TableModal);

