import React from 'react';
import { Card, Row, Col, Typography, Tag, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import { 
  FiActivity, 
  FiZap, 
  FiTrendingUp,
  FiFileText,
  FiLayers,
  FiArrowRight,
  FiDatabase,
  FiCode,
  FiHash,
  FiCpu,
  FiGlobe
} from 'react-icons/fi';

const { Title, Paragraph } = Typography;

const Home = () => {
  const react19Features = [
    {
      title: 'useSyncExternalStore',
      description: 'Subscribe to external stores and automatically re-render when they change.',
      icon: <FiDatabase size={32} />,
      path: '/use-sync-external-store',
      tags: ['External State', 'Subscriptions', 'React 19'],
      color: '#eb2f96'
    },
    {
      title: 'useInsertionEffect',
      description: 'Perfect for CSS-in-JS libraries to inject styles before DOM mutations.',
      icon: <FiCode size={32} />,
      path: '/use-insertion-effect',
      tags: ['CSS-in-JS', 'Performance', 'React 19'],
      color: '#f5222d'
    },
    {
      title: 'useId',
      description: 'Generate unique IDs that are stable across server and client renders.',
      icon: <FiHash size={32} />,
      path: '/use-id',
      tags: ['SSR Safe', 'Accessibility', 'React 19'],
      color: '#faad14'
    },
    {
      title: 'Automatic Batching',
      description: 'React 19 automatically batches updates everywhere for better performance.',
      icon: <FiLayers size={32} />,
      path: '/automatic-batching',
      tags: ['Performance', 'Updates', 'React 19'],
      color: '#a0d911'
    },
    {
      title: 'Concurrent Mode',
      description: 'Time slicing, priority-based updates, and improved user experience.',
      icon: <FiCpu size={32} />,
      path: '/concurrent-features',
      tags: ['Concurrent', 'UX', 'React 19'],
      color: '#1890ff'
    },
    {
      title: 'SSR Advancements',
      description: 'Streaming SSR, selective hydration, and Suspense boundaries on server.',
      icon: <FiGlobe size={32} />,
      path: '/ssr-advancements',
      tags: ['SSR', 'Streaming', 'React 19'],
      color: '#52c41a'
    }
  ];

  const react18Features = [
    {
      title: 'useTransition & useDeferredValue',
      description: 'The famous concurrent hooks - mark updates as non-urgent and defer expensive computations.',
      icon: <FiLayers size={32} />,
      path: '/transitions',
      tags: ['Performance', 'Concurrent', 'Famous Hooks'],
      color: '#13c2c2'
    }
  ];

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={1}>Welcome to React Demo</Title>
        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
          Explore the latest features and improvements in React 18 & 19
        </Paragraph>
        <Space size="middle" style={{ marginTop: '16px' }}>
          <Tag color="blue">React {React.version}</Tag>
          <Tag color="green">JavaScript</Tag>
          <Tag color="purple">Ant Design 5</Tag>
        </Space>
      </div>

      {/* React 19 Features */}
      <Title level={2} style={{ marginBottom: '24px' }}>
        🚀 React 19 Features
      </Title>
      <Row gutter={[24, 24]} style={{ marginBottom: '48px' }}>
        {react19Features.map((feature, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              hoverable
              style={{ height: '100%', borderRadius: '12px' }}
              bodyStyle={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '16px',
                color: feature.color 
              }}>
                {feature.icon}
              </div>
              
              <Title level={4} style={{ marginBottom: '8px' }}>
                {feature.title}
              </Title>
              
              <Paragraph style={{ flex: 1, color: '#666' }}>
                {feature.description}
              </Paragraph>
              
              <Space wrap style={{ marginBottom: '16px' }}>
                {feature.tags.map(tag => (
                  <Tag key={tag} color={feature.color}>
                    {tag}
                  </Tag>
                ))}
              </Space>
              
              <Link to={feature.path}>
                <Button 
                  type="primary" 
                  icon={<FiArrowRight />}
                  style={{ 
                    width: '100%',
                    background: feature.color,
                    borderColor: feature.color
                  }}
                >
                  Explore Feature
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>

      {/* React 18 Features */}
      <Title level={2} style={{ marginBottom: '24px' }}>
        ⚡ React 18 Famous Hooks
      </Title>
      <Row gutter={[24, 24]} style={{ marginBottom: '48px' }}>
        {react18Features.map((feature, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              hoverable
              style={{ height: '100%', borderRadius: '12px' }}
              bodyStyle={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '16px',
                color: feature.color 
              }}>
                {feature.icon}
              </div>
              
              <Title level={4} style={{ marginBottom: '8px' }}>
                {feature.title}
              </Title>
              
              <Paragraph style={{ flex: 1, color: '#666' }}>
                {feature.description}
              </Paragraph>
              
              <Space wrap style={{ marginBottom: '16px' }}>
                {feature.tags.map(tag => (
                  <Tag key={tag} color={feature.color}>
                    {tag}
                  </Tag>
                ))}
              </Space>
              
              <Link to={feature.path}>
                <Button 
                  type="primary" 
                  icon={<FiArrowRight />}
                  style={{ 
                    width: '100%',
                    background: feature.color,
                    borderColor: feature.color
                  }}
                >
                  Explore Feature
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ marginTop: '48px', borderRadius: '12px', background: '#f0f2f5' }}>
        <Title level={3}>About React 18 & 19</Title>
        <Paragraph>
          This comprehensive demo showcases the evolution of React from version 18 to 19, 
          highlighting the groundbreaking features that have transformed how we build modern web applications.
        </Paragraph>
        <Paragraph>
          <strong>React 19</strong> brings advanced hooks like <strong>useSyncExternalStore</strong>, <strong>useInsertionEffect</strong>, 
          and <strong>useId</strong>, along with major improvements in automatic batching, concurrent mode, and SSR capabilities.
          <strong>React 18</strong> introduced the famous concurrent hooks <strong>useTransition</strong> and <strong>useDeferredValue</strong> 
          that revolutionized performance optimization.
        </Paragraph>
        <Paragraph>
          Each demo page provides interactive examples, performance comparisons, and real-world use cases 
          to help you understand and implement these features in your own applications.
        </Paragraph>
      </Card>
    </div>
  );
};

export default Home;