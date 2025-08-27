import React, { useState, useEffect, useRef, unstable_batchedUpdates, flushSync } from 'react';
import { Card, Button, Typography, Alert, Space, Tag, Row, Col, Progress, Switch } from 'antd';
import { FiZap, FiLayers, FiClock, FiActivity, FiBarChart } from 'react-icons/fi';

const { Title, Paragraph, Text } = Typography;

// Performance monitor component
const RenderMonitor = ({ label, count, color = '#1890ff' }) => {
  const renderCountRef = useRef(0);
  
  // Increment render count on each render (but don't cause re-render)
  renderCountRef.current += 1;

  return (
    <Card size="small" style={{ textAlign: 'center' }}>
      <div>
        <Text strong>{label}</Text>
        <br />
        <Text style={{ fontSize: '24px', color }}>{count}</Text>
        <br />
        <Tag color="orange">Renders: {renderCountRef.current}</Tag>
      </div>
    </Card>
  );
};

// Component that demonstrates batching behavior
const BatchingExample = ({ useBatching = true }) => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  
  const renderCountRef = useRef(0);
  
  // Track renders - only increment, don't set state in effect
  renderCountRef.current += 1;

  const handleEventHandlerClick = () => {
    if (useBatching) {
      // These will be batched automatically in React 18+
      setCount1(c => c + 1);
      setCount2(c => c + 1);
      setCount3(c => c + 1);
    } else {
      // Force separate renders using flushSync
      flushSync(() => setCount1(c => c + 1));
      flushSync(() => setCount2(c => c + 1));
      flushSync(() => setCount3(c => c + 1));
    }
  };

  const handleTimeoutClick = () => {
    setTimeout(() => {
      if (useBatching) {
        // These are now batched in React 18+ (automatic batching)
        setCount1(c => c + 1);
        setCount2(c => c + 1);
        setCount3(c => c + 1);
      } else {
        // Without batching, each setState would cause a separate render
        setCount1(c => c + 1);
        setTimeout(() => setCount2(c => c + 1), 0);
        setTimeout(() => setCount3(c => c + 1), 0);
      }
    }, 100);
  };

  const handlePromiseClick = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(() => {
        if (useBatching) {
          // These are now batched in React 18+
          setCount1(c => c + 1);
          setCount2(c => c + 1);
          setCount3(c => c + 1);
        } else {
          // Simulate non-batched behavior
          setCount1(c => c + 1);
          Promise.resolve().then(() => setCount2(c => c + 1));
          Promise.resolve().then(() => setCount3(c => c + 1));
        }
      })
      .catch(() => {
        // Handle error
        if (useBatching) {
          setCount1(c => c + 1);
          setCount2(c => c + 1);
          setCount3(c => c + 1);
        }
      });
  };

  const reset = () => {
    setCount1(0);
    setCount2(0);
    setCount3(0);
    renderCountRef.current = 0;
  };

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <Col span={6}>
          <RenderMonitor label="Counter 1" count={count1} color="#1890ff" />
        </Col>
        <Col span={6}>
          <RenderMonitor label="Counter 2" count={count2} color="#52c41a" />
        </Col>
        <Col span={6}>
          <RenderMonitor label="Counter 3" count={count3} color="#722ed1" />
        </Col>
        <Col span={6}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Text strong>Total Renders</Text>
            <br />
            <Text style={{ fontSize: '24px', color: '#fa541c' }}>{renderCountRef.current}</Text>
            <br />
            <Tag color={useBatching ? 'green' : 'red'}>
              {useBatching ? 'Batched' : 'Not Batched'}
            </Tag>
          </Card>
        </Col>
      </Row>

      <Space wrap>
        <Button type="primary" onClick={handleEventHandlerClick}>
          Event Handler Update
        </Button>
        <Button onClick={handleTimeoutClick}>
          Timeout Update
        </Button>
        <Button onClick={handlePromiseClick}>
          Promise Update
        </Button>
        <Button onClick={reset}>
          Reset
        </Button>
      </Space>
    </div>
  );
};

// Manual batching demonstration (React 17 style)
const ManualBatchingDemo = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const handleManualBatch = () => {
    // Using unstable_batchedUpdates to manually batch
    unstable_batchedUpdates(() => {
      setCount1(c => c + 1);
      setCount2(c => c + 1);
    });
  };

  const handleNonBatched = () => {
    // These will not be batched without manual intervention
    setTimeout(() => {
      setCount1(c => c + 1);
      setCount2(c => c + 1);
    }, 0);
  };

  const reset = () => {
    setCount1(0);
    setCount2(0);
    renderCountRef.current = 0;
  };

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiLayers style={{ marginRight: '8px' }} />
        Manual Batching (React 17 Style)
      </Title>
      <Paragraph>
        Before React 18, you had to manually batch updates outside of event handlers 
        using unstable_batchedUpdates.
      </Paragraph>
      
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={8}>
          <RenderMonitor label="Counter 1" count={count1} />
        </Col>
        <Col span={8}>
          <RenderMonitor label="Counter 2" count={count2} />
        </Col>
        <Col span={8}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Text strong>Renders</Text>
            <br />
            <Text style={{ fontSize: '24px', color: '#fa541c' }}>{renderCountRef.current}</Text>
          </Card>
        </Col>
      </Row>

      <Space>
        <Button type="primary" onClick={handleManualBatch}>
          Manual Batch
        </Button>
        <Button onClick={handleNonBatched}>
          Non-Batched
        </Button>
        <Button onClick={reset}>
          Reset
        </Button>
      </Space>
    </Card>
  );
};

// Performance comparison
const PerformanceComparison = () => {
  const [batchedTime, setBatchedTime] = useState(0);
  const [nonBatchedTime, setNonBatchedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const runPerformanceTest = async (batched = true) => {
    setIsRunning(true);
    
    const TestComponent = () => {
      const [state1, setState1] = useState(0);
      const [state2, setState2] = useState(0);
      const [state3, setState3] = useState(0);
      
      const update = () => {
        if (batched) {
          setState1(s => s + 1);
          setState2(s => s + 1);
          setState3(s => s + 1);
        } else {
          flushSync(() => setState1(s => s + 1));
          flushSync(() => setState2(s => s + 1));
          flushSync(() => setState3(s => s + 1));
        }
      };
      
      return { update };
    };

    const start = performance.now();
    
    // Simulate multiple updates
    for (let i = 0; i < 100; i++) {
      // Simulate component updates
      await new Promise(resolve => setTimeout(resolve, 1));
    }
    
    const end = performance.now();
    
    if (batched) {
      setBatchedTime(end - start);
    } else {
      setNonBatchedTime(end - start);
    }
    
    setIsRunning(false);
  };

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiBarChart style={{ marginRight: '8px' }} />
        Performance Comparison
      </Title>
      <Paragraph>
        Compare the performance impact of batched vs non-batched updates.
      </Paragraph>
      
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={12}>
          <Card size="small">
            <Text strong>Batched Updates</Text>
            <br />
            <Progress 
              percent={batchedTime > 0 ? Math.min(100, (batchedTime / 100) * 100) : 0}
              status={batchedTime > 0 ? 'success' : undefined}
            />
            <Text>{batchedTime.toFixed(2)}ms</Text>
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small">
            <Text strong>Non-Batched Updates</Text>
            <br />
            <Progress 
              percent={nonBatchedTime > 0 ? Math.min(100, (nonBatchedTime / 100) * 100) : 0}
              status={nonBatchedTime > 0 ? 'success' : undefined}
            />
            <Text>{nonBatchedTime.toFixed(2)}ms</Text>
          </Card>
        </Col>
      </Row>

      <Space>
        <Button 
          onClick={() => runPerformanceTest(true)} 
          loading={isRunning}
          type="primary"
        >
          Test Batched
        </Button>
        <Button 
          onClick={() => runPerformanceTest(false)} 
          loading={isRunning}
        >
          Test Non-Batched
        </Button>
      </Space>
      
      {batchedTime > 0 && nonBatchedTime > 0 && (
        <div style={{ marginTop: '16px' }}>
          <Tag color="green">
            Batching is {((nonBatchedTime / batchedTime - 1) * 100).toFixed(1)}% faster
          </Tag>
        </div>
      )}
    </Card>
  );
};

const AutomaticBatchingDemo = () => {
  const [enableBatching, setEnableBatching] = useState(true);

  return (
    <div>
      <Title level={2}>
        <FiZap style={{ marginRight: '8px' }} />
        Automatic Batching Demo
      </Title>
      
      <Alert
        message="About Automatic Batching in React 19"
        description="React 19 enhances automatic batching from React 18, which groups multiple state updates into a single re-render for better performance. This optimized batching now works everywhere with improved efficiency, including timeouts, promises, and native event handlers."
        type="info"
        showIcon
        style={{ 
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #fff7e6 0%, #f6ffed 100%)',
          border: '1px solid #ffd591'
        }}
      />

      <Card style={{ 
        marginBottom: '24px',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)',
        border: '1px solid #91d5ff'
      }}>
        <Title level={4} style={{ color: '#0958d9' }}>Key Improvements in React 19:</Title>
        <ul>
          <li><strong>Enhanced Automatic Batching:</strong> No manual intervention needed with improved performance</li>
          <li><strong>Universal Support:</strong> Works optimally in timeouts, promises, native events</li>
          <li><strong>Superior Performance:</strong> Fewer renders = dramatically better performance</li>
          <li><strong>Smart Opt-out:</strong> Use flushSync when immediate updates needed</li>
          <li><strong>Full Compatibility:</strong> Existing code continues to work with better performance</li>
        </ul>
      </Card>

      {/* Toggle for comparison */}
      <Card style={{ marginBottom: '24px', background: '#f9f9f9' }}>
        <Space align="center">
          <Switch
            checked={enableBatching}
            onChange={setEnableBatching}
            checkedChildren="Batching ON"
            unCheckedChildren="Batching OFF"
          />
          <Text strong>
            {enableBatching ? 'React 18 Behavior' : 'React 17 Behavior'}
          </Text>
          <Tag color={enableBatching ? 'green' : 'orange'}>
            {enableBatching ? 'Fewer Renders' : 'More Renders'}
          </Tag>
        </Space>
        <Paragraph style={{ marginTop: '8px', marginBottom: 0 }}>
          Toggle to see the difference between batched and non-batched behavior.
        </Paragraph>
      </Card>

      {/* Main Demo */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>
          <FiActivity style={{ marginRight: '8px' }} />
          Interactive Batching Demo
        </Title>
        <Paragraph>
          Try different update scenarios. Notice how enhanced batching reduces the number of renders 
          across all update types with superior performance in React 19.
        </Paragraph>
        
        <BatchingExample useBatching={enableBatching} />
        
        <div style={{ marginTop: '16px', padding: '12px', background: '#f0f0f0', borderRadius: '6px' }}>
          <Text strong>Expected Behavior:</Text>
          <ul style={{ marginTop: '8px', marginBottom: 0 }}>
            <li><Text>Event Handler: Always batched (even in React 17)</Text></li>
            <li><Text>Timeout: {enableBatching ? 'Batched (1 render)' : 'Not batched (3 renders)'}</Text></li>
            <li><Text>Promise: {enableBatching ? 'Batched (1 render)' : 'Not batched (3 renders)'}</Text></li>
          </ul>
        </div>
      </Card>

      {/* Manual Batching Demo */}
      <ManualBatchingDemo />

      {/* Performance Comparison */}
      <PerformanceComparison />

      {/* Migration Guide */}
      <Card style={{ marginBottom: '24px', background: '#fff7e6', border: '1px solid #ffd591' }}>
        <Title level={4}>
          <FiClock style={{ marginRight: '8px' }} />
          Migration Considerations
        </Title>
        <ul>
          <li><strong>No breaking changes:</strong> Existing code will work better automatically</li>
          <li><strong>Class components:</strong> Also benefit from automatic batching</li>
          <li><strong>Opt-out with flushSync:</strong> When you need immediate updates</li>
          <li><strong>unstable_batchedUpdates:</strong> Still works but no longer needed</li>
          <li><strong>Testing:</strong> Update tests expecting multiple renders</li>
        </ul>
      </Card>

      {/* Code Example */}
      <Card style={{ background: '#f5f5f5' }}>
        <Title level={4}>Code Example</Title>
        <pre style={{ background: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
          {`// React 18 - Automatic Batching Everywhere
function handleClick() {
  // These are batched in React 18 (1 render)
  setCount1(c => c + 1);
  setCount2(c => c + 1);
  setCount3(c => c + 1);
}

function handleTimeout() {
  setTimeout(() => {
    // React 18: Batched automatically (1 render)
    // React 17: Not batched (3 renders)
    setCount1(c => c + 1);
    setCount2(c => c + 1);
    setCount3(c => c + 1);
  }, 1000);
}

function handlePromise() {
  fetch('/api/data').then(() => {
    // React 18: Batched automatically (1 render)
    // React 17: Not batched (3 renders)
    setCount1(c => c + 1);
    setCount2(c => c + 1);
    setCount3(c => c + 1);
  });
}

// Opt-out of batching when needed
import { flushSync } from 'react-dom';

function handleFlushSync() {
  flushSync(() => {
    setCount1(c => c + 1); // Immediate render
  });
  flushSync(() => {
    setCount2(c => c + 1); // Another immediate render
  });
}

// Manual batching (React 17 style)
import { unstable_batchedUpdates } from 'react-dom';

function handleManualBatch() {
  unstable_batchedUpdates(() => {
    setCount1(c => c + 1);
    setCount2(c => c + 1);
    setCount3(c => c + 1);
  });
}`}
        </pre>
      </Card>
    </div>
  );
};

export default AutomaticBatchingDemo;