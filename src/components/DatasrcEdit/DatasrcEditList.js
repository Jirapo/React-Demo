import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Modal, Select, Button, Popconfirm, message } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';

import * as actions from '../../actions';
import messages from '../../messages/DatasrcIndexTb.message';
import styles from './DatasrcEditList.less';
import DatasrcIndexTb from '../Datasrc/DatasrcIndexTb';
import DatasrcEditModal from './DatasrcEditModal';


class DatasrcEditList extends Component {

	constructor(props){
		super(props);
		this.state = {
			item: props.item || [],
			showModal: false
		};
	}

	componentWillReceiveProps(next){
		if(next.item != this.props.item){
			this.setState({
				item: next.item || []
			});
		}
	}

	onDeleteItem(id){
		const {item} = this.state;
		const newItem = item.filter(d => d.id == id ? false : true);
		this.props.onSetItem(newItem);
		this.setState({item: newItem});
	}

	hideModal(){
		this.setState({showModal: false});
	}

	addItem(newItem){
		const {item} = this.state;

		if(item.length){
			const lastItem = item[item.length - 1];
			newItem.id = lastItem.id + 1;
		}else{
			newItem.id = 1;
		}
		newItem.size = 0;
		newItem.status = 'uncpmt';
		item.push(newItem);

		this.props.onSetItem(item);
		this.setState({item, showModal: false});
	}

	render(){
		const {item, showModal} = this.state

		const tableProps = {
	      item: item,
	      size: 'middle',
	      extendCol: {
	        title: <FormattedMessage {...messages.operation} />,
	        dataIndex: 'operation',
	        key: 'operation',
	        render: (text, record) => (
	            <Popconfirm title={<FormattedMessage {...messages.delDspt} />} 
	              onConfirm={()=> this.onDeleteItem(record.id)}>
	              <Button type="ghost" size="small"><FormattedMessage {...messages.delBtn} /></Button>
	            </Popconfirm>
	        ),
	      }
	    }

	   const modalProps = {
	   	visible: showModal,
	   	onOk: this.addItem.bind(this),
	   	onCancel: this.hideModal.bind(this),
	   };

	   const ModalGen = () => <DatasrcEditModal {...modalProps}/>;

		return(
			<div className={styles['index-wrap']}>
          <Button 
            className={styles['index-btn']}
            type="primary" size="small" 
            onClick={() => {
            	if(item.length === 5){
            		message.info('No more than 5 items.');
            	}else{
            		this.setState({showModal: true});
            	}
            }}>
            <FormattedMessage {...messages.addBtn} />
          </Button>
          <h4><FormattedMessage {...messages.indexcfg} /></h4>

          <DatasrcIndexTb {...tableProps}/>
          <ModalGen />
        	</div>
		)
	}

}

DatasrcEditList.propTypes = {
  item: PropTypes.array,
  onSetItem: PropTypes.func
};

export default DatasrcEditList;