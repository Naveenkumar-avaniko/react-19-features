import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Card, Button, Typography, Alert, Space, Tag, Row, Col, Timeline, Divider, Input, Form, message } from 'antd';
import { FiServer, FiGlobe, FiZap, FiLayers, FiDownload, FiEye, FiClock, FiDatabase, FiCode, FiBox, FiLink } from 'react-icons/fi';

const { Title, Paragraph, Text } = Typography;

// Simulate different hydration strategies
const HydrationDemo = () => {
  const [hydrationStage, setHydrationStage] = useState('server');
  const [interactiveComponents, setInteractiveComponents] = useState(new Set());

  const stages = [
    { key: 'server', label: 'Server Render', description: 'HTML generated on server' },
    { key: 'downloading', label: 'Downloading JS', description: 'Client downloading JavaScript bundles' },
    { key: 'hydrating', label: 'Hydrating', description: 'React taking over server-rendered HTML' },
    { key: 'interactive', label: 'Interactive', description: 'App fully interactive' }
  ];

  const components = [
    { id: 'header', name: 'Header', priority: 'high', delay: 500 },
    { id: 'sidebar', name: 'Sidebar', priority: 'medium', delay: 1000 },
    { id: 'content', name: 'Main Content', priority: 'high', delay: 800 },
    { id: 'footer', name: 'Footer', priority: 'low', delay: 1500 }
  ];

  const simulateHydration = () => {
    setHydrationStage('server');
    setInteractiveComponents(new Set());

    setTimeout(() => {
      setHydrationStage('downloading');
    }, 500);

    setTimeout(() => {
      setHydrationStage('hydrating');
      
      // Simulate selective hydration - high priority components first
      components
        .sort((a, b) => {
          const priority = { high: 1, medium: 2, low: 3 };
          return priority[a.priority] - priority[b.priority];
        })
        .forEach((component, index) => {
          setTimeout(() => {
            setInteractiveComponents(prev => new Set([...prev, component.id]));
          }, component.delay + (index * 200));
        });
    }, 1500);

    setTimeout(() => {
      setHydrationStage('interactive');
    }, 3000);
  };

  const getComponentStatus = (componentId) => {
    if (hydrationStage === 'server' || hydrationStage === 'downloading') {
      return 'server-rendered';
    }
    if (hydrationStage === 'hydrating') {
      return interactiveComponents.has(componentId) ? 'interactive' : 'hydrating';
    }
    return 'interactive';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'server-rendered': return '#d9d9d9';
      case 'hydrating': return '#faad14';
      case 'interactive': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiZap style={{ marginRight: '8px' }} />
        Progressive Hydration Demo
      </Title>
      <Paragraph>
        React 18's new SSR features enable selective hydration, where high-priority 
        components become interactive first, improving perceived performance.
      </Paragraph>

      <Space style={{ marginBottom: '16px' }}>
        <Button type="primary" onClick={simulateHydration}>
          Simulate Hydration Process
        </Button>
        <Tag color="blue">
          Current Stage: {stages.find(s => s.key === hydrationStage)?.label}
        </Tag>
      </Space>

      <Row gutter={16} style={{ marginBottom: '16px' }}>
        {components.map(component => (
          <Col key={component.id} span={6}>
            <Card 
              size="small"
              style={{ 
                backgroundColor: getStatusColor(getComponentStatus(component.id)),
                color: getComponentStatus(component.id) === 'server-rendered' ? '#666' : '#000'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <Text strong>{component.name}</Text>
                <br />
                <Tag color={
                  component.priority === 'high' ? 'red' :
                  component.priority === 'medium' ? 'orange' : 'default'
                }>
                  {component.priority} priority
                </Tag>
                <br />
                <Text style={{ fontSize: '12px' }}>
                  {getComponentStatus(component.id)}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Timeline size="small" items={stages.map(stage => ({
        color: hydrationStage === stage.key ? 'blue' : 
               stages.findIndex(s => s.key === hydrationStage) > stages.findIndex(s => s.key === stage.key) ? 'green' : 'gray',
        children: (
          <div>
            <Text strong>{stage.label}</Text>
            <br />
            <Text type="secondary">{stage.description}</Text>
          </div>
        )
      }))} />
    </Card>
  );
};

// Streaming SSR demonstration
const StreamingDemo = () => {
  const [streamingStage, setStreamingStage] = useState('initial');
  const [loadedChunks, setLoadedChunks] = useState(new Set());

  const chunks = [
    { id: 'shell', name: 'App Shell', delay: 200, size: '5KB' },
    { id: 'header', name: 'Header Component', delay: 400, size: '2KB' },
    { id: 'nav', name: 'Navigation', delay: 600, size: '3KB' },
    { id: 'content', name: 'Main Content', delay: 1000, size: '8KB' },
    { id: 'sidebar', name: 'Sidebar', delay: 1200, size: '4KB' },
    { id: 'footer', name: 'Footer', delay: 1500, size: '1KB' }
  ];

  const simulateStreaming = () => {
    setStreamingStage('streaming');
    setLoadedChunks(new Set());

    chunks.forEach(chunk => {
      setTimeout(() => {
        setLoadedChunks(prev => new Set([...prev, chunk.id]));
      }, chunk.delay);
    });

    setTimeout(() => {
      setStreamingStage('complete');
    }, 2000);
  };

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiDownload style={{ marginRight: '8px' }} />
        Streaming SSR Demo
      </Title>
      <Paragraph>
        Streaming SSR allows sending HTML to the client in chunks as they become ready, 
        rather than waiting for the entire page to be rendered on the server.
      </Paragraph>

      <Space style={{ marginBottom: '16px' }}>
        <Button type="primary" onClick={simulateStreaming}>
          Start Streaming
        </Button>
        <Tag color={streamingStage === 'streaming' ? 'processing' : streamingStage === 'complete' ? 'success' : 'default'}>
          {streamingStage === 'initial' && 'Ready to Stream'}
          {streamingStage === 'streaming' && 'Streaming...'}
          {streamingStage === 'complete' && 'Stream Complete'}
        </Tag>
      </Space>

      <div style={{ 
        border: '2px dashed #d9d9d9', 
        borderRadius: '8px', 
        padding: '16px',
        background: '#fafafa',
        minHeight: '200px'
      }}>
        <Text strong style={{ display: 'block', marginBottom: '12px' }}>
          Client Receiving Stream:
        </Text>
        
        {chunks.map(chunk => (
          <div 
            key={chunk.id}
            style={{
              padding: '8px',
              margin: '4px 0',
              borderRadius: '4px',
              background: loadedChunks.has(chunk.id) ? '#e6f7ff' : '#f5f5f5',
              border: loadedChunks.has(chunk.id) ? '1px solid #91d5ff' : '1px solid #d9d9d9',
              opacity: loadedChunks.has(chunk.id) ? 1 : 0.5,
              transition: 'all 0.3s ease'
            }}
          >
            <Space>
              <Text strong>{chunk.name}</Text>
              <Tag size="small">{chunk.size}</Tag>
              {loadedChunks.has(chunk.id) ? (
                <Tag color="green" size="small">Loaded</Tag>
              ) : streamingStage === 'streaming' ? (
                <Tag color="orange" size="small">Waiting...</Tag>
              ) : (
                <Tag size="small">Pending</Tag>
              )}
            </Space>
          </div>
        ))}
        
        {streamingStage === 'initial' && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Text type="secondary">Click "Start Streaming" to begin</Text>
          </div>
        )}
      </div>
    </Card>
  );
};

// Suspense boundaries in SSR
const SSRSuspenseDemo = () => {
  const [showDemo, setShowDemo] = useState(false);

  const SlowComponent = ({ delay, name }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
      const timer = setTimeout(() => {
        setData(`${name} loaded after ${delay}ms`);
        setLoading(false);
      }, delay);

      return () => clearTimeout(timer);
    }, [delay, name]);

    if (loading) {
      return (
        <Card size="small" style={{ background: '#f5f5f5' }}>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <FiClock /> Loading {name}...
          </div>
        </Card>
      );
    }

    return (
      <Card size="small" style={{ background: '#f0f9ff' }}>
        <Text>{data}</Text>
      </Card>
    );
  };

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiLayers style={{ marginRight: '8px' }} />
        Suspense Boundaries in SSR
      </Title>
      <Paragraph>
        React 18 allows Suspense boundaries in SSR, enabling parts of the page 
        to be sent to the client while other parts are still loading on the server.
      </Paragraph>

      <Space style={{ marginBottom: '16px' }}>
        <Button type="primary" onClick={() => setShowDemo(!showDemo)}>
          {showDemo ? 'Reset Demo' : 'Start SSR Suspense Demo'}
        </Button>
      </Space>

      {showDemo && (
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card title="Fast Component" size="small">
              <SlowComponent delay={500} name="Fast Component" />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Medium Component" size="small">
              <SlowComponent delay={1500} name="Medium Component" />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Slow Component" size="small">
              <SlowComponent delay={3000} name="Slow Component" />
            </Card>
          </Col>
        </Row>
      )}
    </Card>
  );
};

// Server Actions Demo
const ServerActionsDemo = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // Simulated server action
  const submitToServer = async (data) => {
    setSubmitting(true);
    // Simulate server processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true, message: `Data processed for ${data.name}`, timestamp: new Date().toISOString() };
  };

  const handleSubmit = async () => {
    try {
      const response = await submitToServer(formData);
      setResult(response);
      message.success('Form submitted successfully!');
    } catch (error) {
      message.error('Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiDatabase style={{ marginRight: '8px' }} />
        Server Actions
      </Title>
      <Paragraph>
        Server Actions in React 19 enable seamless server-side data handling directly within React components.
        Forms can now submit directly to server functions without separate API endpoints.
      </Paragraph>

      <Row gutter={16}>
        <Col span={12}>
          <Card size="small" title="Example Form with Server Action">
            <Form layout="vertical">
              <Form.Item label="Name">
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your name"
                />
              </Form.Item>
              <Form.Item label="Email">
                <Input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter your email"
                />
              </Form.Item>
              <Button 
                type="primary" 
                onClick={handleSubmit}
                loading={submitting}
                disabled={!formData.name || !formData.email}
              >
                Submit to Server
              </Button>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" title="Server Action Code Example">
            <pre style={{ background: '#f5f5f5', padding: '8px', fontSize: '12px', overflow: 'auto' }}>
{`// Server Action (runs on server)
'use server';

async function submitForm(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  // Database operation
  await db.users.create({ name, email });
  
  return { success: true };
}

// Client Component
function Form() {
  return (
    <form action={submitForm}>
      <input name="name" />
      <input name="email" />
      <button type="submit">Submit</button>
    </form>
  );
}`}
            </pre>
          </Card>
        </Col>
      </Row>

      {result && (
        <Alert
          message="Server Response"
          description={`${result.message} at ${result.timestamp}`}
          type="success"
          showIcon
          style={{ marginTop: '16px' }}
        />
      )}
    </Card>
  );
};

// React DOM Static APIs Demo
const ReactDOMStaticAPIsDemo = () => {
  const [hydrationMode, setHydrationMode] = useState('traditional');
  const [showComparison, setShowComparison] = useState(false);

  const hydrationModes = [
    {
      mode: 'traditional',
      name: 'Traditional Hydration',
      description: 'React 18 and earlier',
      code: `ReactDOM.hydrate(<App />, container);`
    },
    {
      mode: 'hydrateRoot',
      name: 'HydrateRoot (React 19)',
      description: 'Improved hydration with better error recovery',
      code: `const root = ReactDOM.hydrateRoot(container, <App />);`
    },
    {
      mode: 'createRoot',
      name: 'CreateRoot with SSR',
      description: 'Unified API for client and server',
      code: `const root = ReactDOM.createRoot(container, {
  hydrate: true,
  onRecoverableError: (error) => {
    console.log('Recovered from:', error);
  }
});`
    }
  ];

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiCode style={{ marginRight: '8px' }} />
        React DOM Static APIs
      </Title>
      <Paragraph>
        React 19 introduces improved hydration and SSR with ReactDOM.hydrateRoot, providing better error recovery
        and performance optimization for server-rendered applications.
      </Paragraph>

      <Space style={{ marginBottom: '16px' }}>
        {hydrationModes.map(mode => (
          <Button
            key={mode.mode}
            type={hydrationMode === mode.mode ? 'primary' : 'default'}
            onClick={() => setHydrationMode(mode.mode)}
          >
            {mode.name}
          </Button>
        ))}
      </Space>

      <Card size="small" style={{ marginBottom: '16px' }}>
        <Title level={5}>{hydrationModes.find(m => m.mode === hydrationMode)?.name}</Title>
        <Paragraph>{hydrationModes.find(m => m.mode === hydrationMode)?.description}</Paragraph>
        <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px' }}>
          {hydrationModes.find(m => m.mode === hydrationMode)?.code}
        </pre>
      </Card>

      <Button onClick={() => setShowComparison(!showComparison)}>
        {showComparison ? 'Hide' : 'Show'} Feature Comparison
      </Button>

      {showComparison && (
        <Row gutter={16} style={{ marginTop: '16px' }}>
          <Col span={12}>
            <Card size="small" title="Before (React 18)">
              <ul style={{ paddingLeft: '20px' }}>
                <li>Separate hydrate() function</li>
                <li>Limited error recovery</li>
                <li>No progressive enhancement</li>
                <li>Hydration mismatches cause errors</li>
              </ul>
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" title="After (React 19)" style={{ background: '#f0f9ff' }}>
              <ul style={{ paddingLeft: '20px' }}>
                <li>Unified hydrateRoot() API</li>
                <li>Improved error recovery</li>
                <li>Progressive enhancement support</li>
                <li>Graceful mismatch handling</li>
              </ul>
            </Card>
          </Col>
        </Row>
      )}
    </Card>
  );
};

// Refs as Props Demo
const RefsAsPropsDemo = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [cleanupLog, setCleanupLog] = useState([]);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);

  // Simulated component with ref cleanup
  const ComponentWithRefCleanup = ({ ref }) => {
    useEffect(() => {
      if (ref?.current) {
        setCleanupLog(prev => [...prev, `Component mounted, ref attached to ${ref.current.tagName}`]);
        
        // Cleanup function for ref
        return () => {
          setCleanupLog(prev => [...prev, `Component unmounting, cleaning up ref`]);
          // Cleanup resources
          if (ref.current) {
            ref.current = null;
          }
        };
      }
    }, [ref]);

    return (
      <div>
        <Input ref={ref} placeholder="Component with ref cleanup" />
      </div>
    );
  };

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiLink style={{ marginRight: '8px' }} />
        Refs as Props & Cleanup Functions
      </Title>
      <Paragraph>
        React 19 allows passing refs as props directly and introduces cleanup functions for refs,
        enabling cleaner resource management when components unmount.
      </Paragraph>

      <Row gutter={16}>
        <Col span={12}>
          <Card size="small" title="Refs as Props Example">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button onClick={() => setShowDemo(!showDemo)}>
                {showDemo ? 'Hide' : 'Show'} Demo
              </Button>
              
              {showDemo && (
                <ComponentWithRefCleanup ref={inputRef} />
              )}

              <Button 
                ref={buttonRef}
                onClick={() => {
                  if (inputRef.current) {
                    inputRef.current.focus();
                    message.info('Input focused using ref!');
                  }
                }}
              >
                Focus Input Using Ref
              </Button>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" title="Code Example">
            <pre style={{ background: '#f5f5f5', padding: '8px', fontSize: '12px', overflow: 'auto' }}>
{`// React 19: Refs as props
function MyComponent({ ref }) {
  return <input ref={ref} />;
}

// Parent component
function Parent() {
  const inputRef = useRef();
  
  return (
    <MyComponent ref={inputRef} />
  );
}

// Cleanup function for refs
function ComponentWithCleanup() {
  const ref = useRef();
  
  useEffect(() => {
    // Setup
    const element = ref.current;
    element?.addEventListener('focus', handleFocus);
    
    // Cleanup function
    return () => {
      element?.removeEventListener('focus', handleFocus);
      ref.current = null; // Clean up ref
    };
  }, []);
  
  return <div ref={ref}>Content</div>;
}`}
            </pre>
          </Card>
        </Col>
      </Row>

      {cleanupLog.length > 0 && (
        <Card size="small" title="Cleanup Log" style={{ marginTop: '16px' }}>
          <Timeline size="small" items={cleanupLog.map(log => ({ children: log }))} />
        </Card>
      )}
    </Card>
  );
};

// Performance comparison
const PerformanceComparison = () => {
  const metrics = {
    react17: {
      fcp: '2.1s',
      lcp: '3.8s',
      fid: '180ms',
      cls: '0.15',
      ttfb: '800ms',
      tti: '4.2s'
    },
    react18: {
      fcp: '1.2s',
      lcp: '2.1s',
      fid: '45ms',
      cls: '0.05',
      ttfb: '300ms',
      tti: '2.8s'
    }
  };

  const improvements = {
    fcp: '43%',
    lcp: '45%',
    fid: '75%',
    cls: '67%',
    ttfb: '63%',
    tti: '33%'
  };

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiEye style={{ marginRight: '8px' }} />
        Performance Improvements
      </Title>
      <Paragraph>
        React 18's SSR improvements provide significant performance benefits across key metrics.
      </Paragraph>

      <Row gutter={16}>
        <Col span={8}>
          <Card size="small" title="React 17 SSR">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div><Text strong>First Contentful Paint:</Text> {metrics.react17.fcp}</div>
              <div><Text strong>Largest Contentful Paint:</Text> {metrics.react17.lcp}</div>
              <div><Text strong>First Input Delay:</Text> {metrics.react17.fid}</div>
              <div><Text strong>Cumulative Layout Shift:</Text> {metrics.react17.cls}</div>
              <div><Text strong>Time to First Byte:</Text> {metrics.react17.ttfb}</div>
              <div><Text strong>Time to Interactive:</Text> {metrics.react17.tti}</div>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" title="React 18 SSR" style={{ background: '#f0f9ff' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div><Text strong>First Contentful Paint:</Text> <Text style={{ color: '#52c41a' }}>{metrics.react18.fcp}</Text></div>
              <div><Text strong>Largest Contentful Paint:</Text> <Text style={{ color: '#52c41a' }}>{metrics.react18.lcp}</Text></div>
              <div><Text strong>First Input Delay:</Text> <Text style={{ color: '#52c41a' }}>{metrics.react18.fid}</Text></div>
              <div><Text strong>Cumulative Layout Shift:</Text> <Text style={{ color: '#52c41a' }}>{metrics.react18.cls}</Text></div>
              <div><Text strong>Time to First Byte:</Text> <Text style={{ color: '#52c41a' }}>{metrics.react18.ttfb}</Text></div>
              <div><Text strong>Time to Interactive:</Text> <Text style={{ color: '#52c41a' }}>{metrics.react18.tti}</Text></div>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" title="Improvements" style={{ background: '#f6ffed' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div><Tag color="green">FCP: {improvements.fcp} faster</Tag></div>
              <div><Tag color="green">LCP: {improvements.lcp} faster</Tag></div>
              <div><Tag color="green">FID: {improvements.fid} faster</Tag></div>
              <div><Tag color="green">CLS: {improvements.cls} better</Tag></div>
              <div><Tag color="green">TTFB: {improvements.ttfb} faster</Tag></div>
              <div><Tag color="green">TTI: {improvements.tti} faster</Tag></div>
            </Space>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

const SSRAdvancementsDemo = () => {
  return (
    <div>
      <Title level={2}>
        <FiServer style={{ marginRight: '8px' }} />
        SSR Advancements in React 19
      </Title>
      
      <Alert
        message="React 19 SSR Advancements"
        description="React 19 builds upon React 18's foundation with enhanced Server-Side Rendering including improved streaming SSR, optimized selective hydration, and advanced Suspense boundaries on the server, dramatically improving loading performance and user experience."
        type="info"
        showIcon
        style={{ 
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 100%)',
          border: '1px solid #91d5ff'
        }}
      />

      <Card style={{ 
        marginBottom: '24px',
        background: 'linear-gradient(135deg, #f6ffed 0%, #f0f9ff 100%)',
        border: '1px solid #b7eb8f'
      }}>
        <Title level={4} style={{ color: '#389e0d' }}>Major SSR Improvements in React 19:</Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <ul>
              <li><strong>Streaming SSR:</strong> Send HTML in chunks as ready</li>
              <li><strong>Selective Hydration:</strong> Prioritize interactive components</li>
              <li><strong>Suspense on Server:</strong> Handle async operations gracefully</li>
            </ul>
          </Col>
          <Col span={12}>
            <ul>
              <li><strong>Automatic Batching:</strong> Improved hydration performance</li>
              <li><strong>Concurrent Features:</strong> Non-blocking server rendering</li>
              <li><strong>Better Error Handling:</strong> Graceful degradation</li>
            </ul>
          </Col>
        </Row>
      </Card>

      {/* Progressive Hydration */}
      <HydrationDemo />

      {/* Streaming SSR */}
      <StreamingDemo />

      {/* SSR Suspense */}
      <SSRSuspenseDemo />

      {/* Performance Comparison */}
      <PerformanceComparison />

      {/* Server Actions Demo */}
      <ServerActionsDemo />

      {/* React DOM Static APIs Demo */}
      <ReactDOMStaticAPIsDemo />

      {/* Refs as Props Demo */}
      <RefsAsPropsDemo />

      {/* Migration Guide */}
      <Card style={{ marginBottom: '24px', background: '#fff7e6', border: '1px solid #ffd591' }}>
        <Title level={4}>Migration to React 19 SSR</Title>
        <Divider />
        <Row gutter={16}>
          <Col span={12}>
            <Text strong>Before (React 17):</Text>
            <pre style={{ background: '#f5f5f5', padding: '8px', fontSize: '12px', marginTop: '8px' }}>
{`// Server
import { renderToString } from 'react-dom/server';

const html = renderToString(<App />);

// Client  
import { hydrate } from 'react-dom';

hydrate(<App />, container);`}
            </pre>
          </Col>
          <Col span={12}>
            <Text strong>After (React 19):</Text>
            <pre style={{ background: '#f0f9ff', padding: '8px', fontSize: '12px', marginTop: '8px' }}>
{`// Server
import { renderToPipeableStream } from 'react-dom/server';

const stream = renderToPipeableStream(<App />);

// Client
import { createRoot } from 'react-dom/client';

const root = createRoot(container);
root.render(<App />);`}
            </pre>
          </Col>
        </Row>
      </Card>

      {/* Code Example */}
      <Card style={{ background: '#f5f5f5' }}>
        <Title level={4}>Complete SSR Example</Title>
        <pre style={{ background: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
          {`// Server-side (Express + React 18)
import express from 'express';
import { renderToPipeableStream } from 'react-dom/server';

const app = express();

app.get('*', (req, res) => {
  const stream = renderToPipeableStream(
    <App url={req.url} />,
    {
      bootstrapScripts: ['/main.js'],
      onShellReady() {
        // Shell is ready, start streaming
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/html');
        stream.pipe(res);
      },
      onShellError(error) {
        // Handle shell errors
        res.statusCode = 500;
        res.send('<h1>Something went wrong</h1>');
      },
      onAllReady() {
        // All content is ready
        console.log('All content ready');
      },
      onError(error) {
        console.error('Streaming error:', error);
      }
    }
  );
});

// App component with Suspense boundaries
function App({ url }) {
  return (
    <html>
      <head>
        <title>React 18 SSR</title>
      </head>
      <body>
        <div id="root">
          <Header />
          <Suspense fallback={<NavSkeleton />}>
            <Navigation />
          </Suspense>
          <main>
            <Suspense fallback={<ContentSkeleton />}>
              <MainContent url={url} />
            </Suspense>
          </main>
          <Suspense fallback={<FooterSkeleton />}>
            <Footer />
          </Suspense>
        </div>
      </body>
    </html>
  );
}

// Client-side hydration
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// Component that uses Suspense
function MainContent({ url }) {
  const data = use(fetchPageData(url)); // React 19 use() hook
  
  return (
    <article>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </article>
  );
}`}
        </pre>
      </Card>
    </div>
  );
};

export default SSRAdvancementsDemo;