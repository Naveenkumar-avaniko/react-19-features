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
  FiGlobe,
  FiThumbsUp,
  FiLoader,
  FiLink,
  FiServer,
  FiSettings
} from 'react-icons/fi';

const { Title, Paragraph } = Typography;

const Home = () => {
  const react19Features = [
    {
      title: 'React 19 Enhancements',
      description: 'Third-party scripts, Custom Elements, Error Reporting, Form Actions, and Async Resources.',
      icon: <FiSettings size={32} />,
      path: '/react-19-enhancements',
      tags: ['Enhancements', 'Performance', 'React 19'],
      color: '#722ed1',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      title: 'Automatic Batching',
      description: 'React 19 automatically batches updates everywhere for better performance.',
      icon: <FiLayers size={32} />,
      path: '/automatic-batching',
      tags: ['Performance', 'Updates', 'React 19'],
      color: '#a0d911',
      gradient: 'linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)'
    },
    {
      title: 'SSR Advancements',
      description: 'Server Actions, React DOM Static APIs, and Refs as Props with cleanup functions.',
      icon: <FiServer size={32} />,
      path: '/ssr-advancements',
      tags: ['SSR', 'Server Actions', 'React 19'],
      color: '#52c41a',
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
    },
    {
      title: 'useOptimistic',
      description: 'Optimistically update UI while async requests are in progress with automatic rollback.',
      icon: <FiThumbsUp size={32} />,
      path: '/use-optimistic',
      tags: ['Optimistic UI', 'UX', 'React 19'],
      color: '#eb2f96',
      gradient: 'linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)'
    },
    {
      title: 'useFormStatus',
      description: 'Access form submission state from any child component without prop drilling.',
      icon: <FiLoader size={32} />,
      path: '/use-form-status',
      tags: ['Forms', 'State', 'React 19'],
      color: '#f5222d',
      gradient: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)'
    },
    {
      title: 'useActionState',
      description: 'Manage state for async actions with automatic pending state and error handling.',
      icon: <FiActivity size={32} />,
      path: '/use-action-state',
      tags: ['Actions', 'State', 'React 19'],
      color: '#faad14',
      gradient: 'linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)'
    },
    {
      title: 'use Hook',
      description: 'Read resources like promises and contexts directly in render, enabling simpler async patterns.',
      icon: <FiLink size={32} />,
      path: '/use-hook',
      tags: ['Async', 'Resources', 'React 19'],
      color: '#1890ff',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'useDeferredValue',
      description: 'Defer updating a value to keep the UI responsive during expensive re-renders.',
      icon: <FiCpu size={32} />,
      path: '/use-deferred-value',
      tags: ['Performance', 'Defer', 'React 19'],
      color: '#13c2c2',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  // Removed React 18 features section as requested

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }}>
      <div style={{ padding: '20px' }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '48px',
          padding: '80px 20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)',
            pointerEvents: 'none'
          }} />
          <Title level={1} style={{ 
            color: 'white', 
            margin: 0, 
            fontSize: '56px',
            fontWeight: 'bold',
            textShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            Welcome to React 19 Features Demo
          </Title>
          <Paragraph style={{ 
            fontSize: '22px', 
            color: 'rgba(255, 255, 255, 0.95)', 
            margin: '24px auto',
            maxWidth: '600px',
            lineHeight: '1.6'
          }}>
            Explore the cutting-edge features and improvements that make React 19 revolutionary
          </Paragraph>
          <Space size="large" style={{ marginTop: '32px' }}>
            <Tag style={{ 
              background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
              border: 'none',
              color: 'white',
              padding: '8px 20px', 
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
            }}>
              React {React.version}
            </Tag>
            <Tag style={{ 
              background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
              border: 'none',
              color: 'white',
              padding: '8px 20px', 
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(78, 205, 196, 0.3)'
            }}>
              JavaScript
            </Tag>
            <Tag style={{ 
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              border: 'none',
              color: 'white',
              padding: '8px 20px', 
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(250, 112, 154, 0.3)'
            }}>
              Ant Design 5
            </Tag>
          </Space>
        </div>

        {/* React 19 Features */}
        <Title level={2} style={{ 
          marginBottom: '32px',
          fontSize: '40px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center'
        }}>
          🚀 React 19 Features
        </Title>
        <Row gutter={[32, 32]} style={{ marginBottom: '48px' }}>
          {react19Features.map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable
                style={{ 
                  height: '100%', 
                  borderRadius: '20px',
                  background: 'white',
                  border: 'none',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                }}
                bodyStyle={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '32px' }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: feature.gradient
                }} />
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '20px',
                  width: '70px',
                  height: '70px',
                  borderRadius: '16px',
                  background: feature.gradient,
                  color: 'white',
                  boxShadow: `0 8px 20px ${feature.color}40`,
                  fontSize: '28px'
                }}>
                  {feature.icon}
                </div>
                
                <Title level={4} style={{ 
                  marginBottom: '12px',
                  fontSize: '20px',
                  background: feature.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {feature.title}
                </Title>
                
                <Paragraph style={{ 
                  flex: 1, 
                  color: '#666',
                  fontSize: '15px',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </Paragraph>
                
                <Space wrap style={{ marginBottom: '20px' }}>
                  {feature.tags.map(tag => (
                    <Tag 
                      key={tag} 
                      style={{
                        background: `${feature.color}15`,
                        color: feature.color,
                        border: `1px solid ${feature.color}30`,
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontWeight: '500'
                      }}
                    >
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
                      background: feature.gradient,
                      border: 'none',
                      height: '48px',
                      fontSize: '16px',
                      fontWeight: '600',
                      borderRadius: '12px',
                      boxShadow: `0 8px 20px ${feature.color}30`,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 12px 24px ${feature.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = `0 8px 20px ${feature.color}30`;
                    }}
                  >
                    Explore Feature
                  </Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>

        <Card style={{ 
          marginTop: '48px', 
          borderRadius: '24px', 
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          border: 'none',
          boxShadow: '0 20px 40px rgba(240, 147, 251, 0.3)',
          padding: '40px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at bottom left, rgba(255,255,255,0.1) 0%, transparent 60%)',
            pointerEvents: 'none'
          }} />
          <Title level={3} style={{ 
            color: 'white',
            fontSize: '32px',
            marginBottom: '24px',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            About React 19
          </Title>
          <Paragraph style={{ 
            color: 'rgba(255, 255, 255, 0.95)', 
            fontSize: '18px',
            lineHeight: '1.8',
            marginBottom: '20px'
          }}>
            This comprehensive demo showcases the groundbreaking features in React 19 
            that have transformed how we build modern web applications.
          </Paragraph>
          <Paragraph style={{ 
            color: 'rgba(255, 255, 255, 0.95)', 
            fontSize: '18px',
            lineHeight: '1.8',
            marginBottom: '20px'
          }}>
            <strong style={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>React 19</strong> brings advanced hooks like{' '}
            <strong style={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>useOptimistic</strong>,{' '}
            <strong style={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>useFormStatus</strong>,{' '}
            <strong style={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>useActionState</strong>, and the{' '}
            <strong style={{ color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>use</strong> hook, along with major improvements in automatic batching, 
            Server Actions, and enhanced SSR capabilities including React DOM Static APIs and Refs as Props.
          </Paragraph>
          <Paragraph style={{ 
            color: 'rgba(255, 255, 255, 0.95)', 
            fontSize: '18px',
            lineHeight: '1.8'
          }}>
            Each demo page provides interactive examples, performance comparisons, and real-world use cases 
            to help you understand and implement these features in your own applications.
          </Paragraph>
        </Card>
      </div>
    </div>
  );
};

export default Home;