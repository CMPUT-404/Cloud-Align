
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import { Layout, Menu} from 'antd';

const { Header, Content, Footer } = Layout;

ReactDOM.render(
  <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
          <Menu.Item key="1">Profile</Menu.Item>
          <Menu.Item key="2">Timeline</Menu.Item>
          <Menu.Item key="3">Friends</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <App />
    </Content>
    <Footer style={{ textAlign: 'center' }}>Cloud-Align</Footer>
  </Layout>,
  document.getElementById("root")
);
          