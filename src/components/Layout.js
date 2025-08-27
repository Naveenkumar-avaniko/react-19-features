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
  FiGlobe,
  FiThumbsUp,
  FiLoader,
  FiLink,
  FiSettings
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
          key: '/react-19-enhancements',
          icon: <FiSettings size={18} />,
          label: <Link to="/react-19-enhancements">React 19 Enhancements</Link>,
        },
        {
          key: '/automatic-batching',
          icon: <FiLayers size={18} />,
          label: <Link to="/automatic-batching">Automatic Batching</Link>,
        },
        {
          key: '/ssr-advancements',
          icon: <FiServer size={18} />,
          label: <Link to="/ssr-advancements">SSR Advancements</Link>,
        },
        {
          key: '/use-optimistic',
          icon: <FiThumbsUp size={18} />,
          label: <Link to="/use-optimistic">useOptimistic</Link>,
        },
        {
          key: '/use-form-status',
          icon: <FiLoader size={18} />,
          label: <Link to="/use-form-status">useFormStatus</Link>,
        },
        {
          key: '/use-action-state',
          icon: <FiActivity size={18} />,
          label: <Link to="/use-action-state">useActionState</Link>,
        },
        {
          key: '/use-hook',
          icon: <FiLink size={18} />,
          label: <Link to="/use-hook">use() Hook</Link>,
        },
        {
          key: '/use-deferred-value',
          icon: <FiCpu size={18} />,
          label: <Link to="/use-deferred-value">useDeferredValue</Link>,
        },
      ]
    }
  ];

  return (
    <AntLayout style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={300}
        style={{
          background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
          borderRight: 'none',
          boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          height: '100vh',
          zIndex: 1000,
          overflowY: 'auto'
        }}
      >
        <div style={{ 
          padding: '24px', 
          textAlign: 'center', 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
        }}>
          <Title level={4} style={{ 
            margin: 0, 
            color: 'white',
            fontSize: '20px',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            React 19 Demo
          </Title>
        </div>
        <div style={{ height: 'calc(100vh - 80px)', overflowY: 'auto', paddingBottom: '20px' }}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ 
              borderRight: 0,
              background: 'transparent',
              color: 'white'
            }}
            theme="dark"
          />
        </div>
      </Sider>
      <AntLayout style={{ marginLeft: '300px' }}>
        <Header style={{ 
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', 
          padding: '0 32px',
          borderBottom: 'none',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <Space>
            <Title level={3} style={{ 
              margin: 0,
              color: 'white',
              fontSize: '24px',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
              React 19 Features Showcase
            </Title>
          </Space>
        </Header>
        <Content style={{ 
          margin: '24px', 
          padding: '32px',
          background: 'white',
          borderRadius: '16px',
          minHeight: 280,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <Outlet />
        </Content>
        <Footer style={{ 
          textAlign: 'center', 
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', 
          borderTop: 'none',
          color: 'white',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.1)'
        }}>
          <span style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            React 19 Demo ©{new Date().getFullYear()} - Built with Ant Design
          </span>
        </Footer>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;