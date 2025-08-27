import React, { Suspense, useState, useEffect } from 'react';
import { Card, Button, Typography, Alert, Space, Tag, Row, Col, Timeline, Divider } from 'antd';
import { FiServer, FiGlobe, FiZap, FiLayers, FiDownload, FiEye, FiClock } from 'react-icons/fi';

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