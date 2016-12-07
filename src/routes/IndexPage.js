import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Menu, Icon, Row, Col, Button } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import styles from './IndexPage.css';
import messages from '../messages/IndexPage.message'


function IndexPage({ children, dispatch}) {

  return (
    <div className={styles.container}>
      <div className={styles.locales}>
          <a className="ant-btn ant-btn-default" href='index-en.html'> HOME </a>  {' '}
          <a className="ant-btn ant-btn-default" href='index.html'> 中文首页 </a> 
      </div>
      <Row>
        <Col span={5}>
          <Menu
            style={{ width: 240 }}
            defaultOpenKeys={['sub1', 'sub2']}
            selectedKeys={[]}
            mode="inline"
          >
            <SubMenu key="sub1" title={<FormattedMessage {...messages.navTopTitle} />}>
              <Menu.Item key="1">
                <Link to='/dsudpt' activeClassName='active'><FormattedMessage {...messages.navSubTitle1} /></Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to='/tblist' activeClassName='active'><FormattedMessage {...messages.navSubTitle2} /></Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
        <Col span={19}>{children}</Col>
      </Row>
    </div>
  );
}


IndexPage.propTypes = {
};

function mapStateToProps(state) {
  return {
    locales: state.locales,
  }
}


export default connect()(IndexPage);


