import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Modal, Select, Button, Popconfirm, Spin, message } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';
import { hashHistory } from 'react-router';

const FormItem = Form.Item;
const Option = Select.Option;


import * as actions from '../actions';
import messages from '../messages/DatasrcList.message';
import DatasrcEditList from '../components/DatasrcEdit/DatasrcEditList';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  },
};


class DatasrcEditPage extends Component {


  componentDidMount(){
    const {dispatch, location:{ query }} = this.props;

    if(query.id){
      dispatch({
        type: actions.UPDATE_QUERYKEY_DATASRC,
        payload: query
      });
    }else{
      dispatch({
        type: actions.RESET_DATASRC,
      });
    }
  }

  componentWillReceiveProps(next){
    const {dispatch, location: {query}, datasrc: {msg, ack}} = next;
    const {datasrc} = this.props;

    if(query.id){
      if(next.datasrc.id != datasrc.id){
        dispatch({
          type: actions.QUERY_DATASRC,
          payload: query
        });
      }

      if(query.id != next.datasrc.id){
        dispatch({
          type: actions.UPDATE_QUERYKEY_DATASRC,
          payload: query
        });
      }
    }else if(next.datasrc.id){
      dispatch({
        type: actions.RESET_DATASRC,
      });
    }

    if(msg){
      if(ack){
        message.success(msg);
      }else{
        message.error(msg);
        if(msg == 'ID is not existed!') hashHistory.push('/dsudpt');
      }
      
      dispatch({
        type: actions.RESET_DATASRC_MSG,
      });
    }
   
  }

  handleSubmit(){
    const {form, datasrc, dispatch} = this.props;
    

    form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        if(datasrc.id){
          dispatch({
            type: actions.UPDATE_DATASRC,
            payload: { ...datasrc.currentItem, ...values, indexcfg: this.indexItem},
          });
        }else{
          dispatch({
            type: actions.CREATE_DATASRC,
            payload: {...datasrc.currentItem, ...values, indexcfg: this.indexItem},
          });
        }
      }
    });
  }

  resetForm(){
    this.props.form.resetFields();
  }

  onSetItem(newItem){
    this.indexItem = newItem;
  }

  render() {
    const {datasrc:{currentItem, loading}, dispatch, 
      form: {
      getFieldDecorator,
      validateFields,
      getFieldsValue,
      },
    } = this.props;


    const item = currentItem;
    this.indexItem = item.indexcfg || [];

    const listProps = {
      item: item.indexcfg,
      onSetItem: this.onSetItem.bind(this)
    };

    return (
      <Spin spinning={loading}>
      <Form horizontal>
        <FormItem
          label={<FormattedMessage {...messages.tbname} />}
          hasFeedback
          {...formItemLayout}
          >
          {getFieldDecorator('tbname', {
            initialValue: item.tbname,
            rules: [{ required: true, message: 'Required' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label={<FormattedMessage {...messages.tbdesp} />}
          hasFeedback
          {...formItemLayout}
          >
          {getFieldDecorator('tbdesp', {
            initialValue: item.tbdesp,
          })(
            <Input type="textarea" rows={2} />
          )}
        </FormItem>
        <FormItem
          label={<FormattedMessage {...messages.dbname} />}
          hasFeedback
          {...formItemLayout}
          >
          {getFieldDecorator('dbname', {
            initialValue: item.dbname,
            rules: [{ required: true, message: 'Required' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label={<FormattedMessage {...messages.key} />}
          hasFeedback
          {...formItemLayout}
          >
          {getFieldDecorator('key', {
            initialValue: item.key,
            rules: [{ required: true, message: 'Required' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label={<FormattedMessage {...messages.config} />}
          hasFeedback
          {...formItemLayout}
          >
          {getFieldDecorator('config', {
            initialValue: item.config,
            rules: [{ required: true, message: 'Required' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label={<FormattedMessage {...messages.fields} />}
          hasFeedback
          {...formItemLayout}
          >
          {getFieldDecorator('fields', {
            initialValue: item.fields,
            rules: [{ required: true, message: 'Required' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label={<FormattedMessage {...messages.cpstatus} />}
          hasFeedback
          {...formItemLayout}
          >
          {getFieldDecorator('cpstatus', {
            initialValue: item.cpstatus,
            rules: [{ required: true, message: 'Required' },
            ],
          })(
            <Select placeholder="Please select a status"
                 >
              <Option value="start" key="start"><FormattedMessage {...messages.start} /></Option>
              <Option value="stop" key="stop"><FormattedMessage {...messages.stop} /></Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label={<FormattedMessage {...messages.cptbname} />}
          hasFeedback
          {...formItemLayout}
          >
          {getFieldDecorator('cptbname', {
            initialValue: item.cptbname,
            rules: [{ required: true, message: 'Required' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label={<FormattedMessage {...messages.cmpcfg} />}
          hasFeedback
          {...formItemLayout}
          >
          {getFieldDecorator('cmpcfg', {
            initialValue: item.cmpcfg,
            rules: [{ required: true, message: 'Required' },
            ],
          })(
            <Select placeholder="Please select a status"
                 >
              <Option value="start" key="start"><FormattedMessage {...messages.start} /></Option>
              <Option value="stop" key="stop"><FormattedMessage {...messages.stop} /></Option>
            </Select>
          )}
        </FormItem>

        <DatasrcEditList {...listProps}/>

        <FormItem style={{textAlign: 'center'}}>
          <Button type="primary" onClick={this.handleSubmit.bind(this)}>
            <FormattedMessage {...messages.submitBtn} />
          </Button> {' '}
          <Button type="default" onClick={this.resetForm.bind(this)}>
            <FormattedMessage {...messages.resetBtn} />
          </Button>
        </FormItem>
      </Form>
      </Spin>
    )
  }
}

DatasrcEditPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  datasrc: PropTypes.object,
  form: PropTypes.object,
};

function mapStateToProps(state) {
  
  return {
    datasrc: state.datasrc,
  }
}


export default connect(mapStateToProps)(Form.create({
  mapPropsToFields:({datasrc:{currentItem}}) =>({
    tbname: {value : currentItem.tbname || ''},
    tbdesp: {value : currentItem.tbdesp || ''},
    dbname: {value : currentItem.dbname || ''},
    key: {value : currentItem.key || ''},
    config: {value : currentItem.config || ''},
    fields: {value : currentItem.fields || ''},
    cpstatus: {value : currentItem.cpstatus || ''},
    cptbname: {value : currentItem.cptbname || ''},
    cmpcfg: {value : currentItem.cmpcfg || ''}
  }) 
})(DatasrcEditPage));




