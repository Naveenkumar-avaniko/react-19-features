import React from 'react';
import { Layout as AntLayout, Menu, Typography, Space } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiActivity, 
  FiServer, 
  FiZap, 
  FiTrendingUp,
  FiFileText,
  FiLayers,
  FiDatabase,
  FiCode,
  FiHash,
  FiCpu,
  FiGlobe
} from 'react-icons/fi';

const { Header, Content, Footer, Sider } = AntLayout;
const { Title } = Typography;

const Layout = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <FiHome size={18} />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: 'react-19',
      label: 'React 19 Features',
      type: 'group',
      children: [
        {
          key: '/use-sync-external-store',
          icon: <FiDatabase size={18} />,
          label: <Link to="/use-sync-external-store">useSyncExternalStore</Link>,
        },
        {
          key: '/use-insertion-effect',
          icon: <FiCode size={18} />,
          label: <Link to="/use-insertion-effect">useInsertionEffect</Link>,
        },
        {
          key: '/use-id',
          icon: <FiHash size={18} />,
          label: <Link to="/use-id">useId</Link>,
        },
        {
          key: '/automatic-batching',
          icon: <FiLayers size={18} />,
          label: <Link to="/automatic-batching">Automatic Batching</Link>,
        },
        {
          key: '/concurrent-features',
          icon: <FiCpu size={18} />,
          label: <Link to="/concurrent-features">Concurrent Mode</Link>,
        },
        {
          key: '/ssr-advancements',
          icon: <FiGlobe size={18} />,
          label: <Link to="/ssr-advancements">SSR Advancements</Link>,
        },
      ]
    },
    {
      key: 'react-18',
      label: 'React 18 Core Hooks',
      type: 'group',
      children: [
        {
          key: '/transitions',
          icon: <FiLayers size={18} />,
          label: <Link to="/transitions">useTransition & useDeferredValue</Link>,
        },
      ]
    }
  ];

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={280}
        style={{
          background: '#fff',
          borderRight: '1px solid #f0f0f0'
        }}
      >
        <div style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
            React 19 Demo
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <AntLayout>
        <Header style={{ 
          background: '#fff', 
          padding: '0 24px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Space>
            <Title level={3} style={{ margin: 0 }}>
              React 19 Features Showcase
            </Title>
          </Space>
        </Header>
        <Content style={{ 
          margin: '24px', 
          padding: '24px',
          background: '#fff',
          borderRadius: '8px',
          minHeight: 280
        }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center', background: '#fff', borderTop: '1px solid #f0f0f0' }}>
          React 19 Demo ©{new Date().getFullYear()} - Built with Ant Design
        </Footer>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;