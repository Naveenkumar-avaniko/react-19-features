import React, { Suspense, startTransition, useDeferredValue, useTransition, useState, useEffect, memo } from 'react';
import { Card, Button, Typography, Alert, Space, Slider, Switch, Tag, Row, Col, Progress, Spin } from 'antd';
import { FiCpu, FiZap, FiLayers, FiTrendingUp, FiActivity, FiClock } from 'react-icons/fi';

const { Title, Paragraph, Text } = Typography;

// Heavy computational component
const HeavyComponent = memo(({ complexity, data }) => {
  const startTime = performance.now();
  
  // Simulate heavy computation
  let result = 0;
  for (let i = 0; i < complexity * 1000; i++) {
    result += Math.random();
  }
  
  const endTime = performance.now();
  
  return (
    <Card size="small">
      <Text strong>Heavy Computation Result</Text>
      <br />
      <Text>Result: {result.toFixed(2)}</Text>
      <br />
      <Text type="secondary">
        Computed in {(endTime - startTime).toFixed(2)}ms
      </Text>
      <br />
      <Tag color="purple">Complexity: {complexity}</Tag>
    </Card>
  );
});

// Slow list component
const SlowList = memo(({ items, filter }) => {
  const filteredItems = items.filter(item => 
    item.toLowerCase().includes(filter.toLowerCase())
  );
  
  // Simulate slow rendering
  const startTime = performance.now();
  while (performance.now() - startTime < 2) {
    // Artificial delay
  }
  
  return (
    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
      {filteredItems.map((item, index) => (
        <div key={index} style={{ 
          padding: '8px', 
          borderBottom: '1px solid #f0f0f0',
          background: index % 2 === 0 ? '#fafafa' : '#fff'
        }}>
          {item}
        </div>
      ))}
      <div style={{ padding: '8px', textAlign: 'center' }}>
        <Text type="secondary">
          Showing {filteredItems.length} of {items.length} items
        </Text>
      </div>
    </div>
  );
});

// Component that simulates data fetching
const DataFetchingComponent = ({ delay }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setData(null);
    
    const timer = setTimeout(() => {
      setData({
        users: Math.floor(Math.random() * 1000),
        posts: Math.floor(Math.random() * 5000),
        comments: Math.floor(Math.random() * 10000)
      });
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (loading) {
    return (
      <Card style={{ textAlign: 'center', padding: '40px' }}>
        <Spin size="large" />
        <div style={{ marginTop: '16px' }}>
          <Text>Loading data... ({delay}ms)</Text>
        </div>
      </Card>
    );
  }

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card size="small" style={{ textAlign: 'center' }}>
          <Text strong>Users</Text>
          <br />
          <Text style={{ fontSize: '24px', color: '#1890ff' }}>
            {data.users}
          </Text>
        </Card>
      </Col>
      <Col span={8}>
        <Card size="small" style={{ textAlign: 'center' }}>
          <Text strong>Posts</Text>
          <br />
          <Text style={{ fontSize: '24px', color: '#52c41a' }}>
            {data.posts}
          </Text>
        </Card>
      </Col>
      <Col span={8}>
        <Card size="small" style={{ textAlign: 'center' }}>
          <Text strong>Comments</Text>
          <br />
          <Text style={{ fontSize: '24px', color: '#722ed1' }}>
            {data.comments}
          </Text>
        </Card>
      </Col>
    </Row>
  );
};

// Transition priority demo
const TransitionPriorityDemo = () => {
  const [isPending, startTransition] = useTransition();
  const [urgentState, setUrgentState] = useState(0);
  const [nonUrgentState, setNonUrgentState] = useState(0);
  const [complexity, setComplexity] = useState(50);

  const handleUrgentUpdate = () => {
    // Urgent update - not wrapped in startTransition
    setUrgentState(prev => prev + 1);
  };

  const handleNonUrgentUpdate = () => {
    // Non-urgent update - wrapped in startTransition
    startTransition(() => {
      setNonUrgentState(prev => prev + 1);
    });
  };

  const handleMixedUpdate = () => {
    // Urgent update first
    setUrgentState(prev => prev + 1);
    
    // Then non-urgent update
    startTransition(() => {
      setNonUrgentState(prev => prev + 1);
    });
  };

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiTrendingUp style={{ marginRight: '8px' }} />
        Update Priority Management
      </Title>
      <Paragraph>
        Concurrent React can prioritize updates. Urgent updates (like user input) 
        get higher priority than non-urgent updates (like data fetching results).
      </Paragraph>

      <div style={{ marginBottom: '16px' }}>
        <Text>Heavy computation complexity: {complexity}</Text>
        <Slider
          value={complexity}
          onChange={setComplexity}
          min={10}
          max={200}
          style={{ marginTop: '8px' }}
        />
      </div>

      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={8}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Text strong>Urgent Counter</Text>
            <br />
            <Text style={{ fontSize: '32px', color: '#ff4d4f' }}>
              {urgentState}
            </Text>
            <br />
            <Tag color="red">High Priority</Tag>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Text strong>Non-Urgent Counter</Text>
            <br />
            <Text style={{ fontSize: '32px', color: '#1890ff' }}>
              {nonUrgentState}
            </Text>
            <br />
            <Tag color={isPending ? 'orange' : 'blue'}>
              {isPending ? 'Pending...' : 'Low Priority'}
            </Tag>
          </Card>
        </Col>
        <Col span={8}>
          <HeavyComponent complexity={complexity} data={nonUrgentState} />
        </Col>
      </Row>

      <Space>
        <Button type="primary" onClick={handleUrgentUpdate}>
          Urgent Update
        </Button>
        <Button onClick={handleNonUrgentUpdate} loading={isPending}>
          Non-Urgent Update
        </Button>
        <Button onClick={handleMixedUpdate}>
          Mixed Update
        </Button>
      </Space>

      {isPending && (
        <Alert
          message="Non-urgent update in progress..."
          type="info"
          style={{ marginTop: '16px' }}
        />
      )}
    </Card>
  );
};

// Deferred value demo
const DeferredValueDemo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const [items] = useState(() => 
    Array.from({ length: 10000 }, (_, i) => 
      `Item ${i + 1} - ${['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML'][i % 5]}`
    )
  );

  const isStale = searchTerm !== deferredSearchTerm;

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiActivity style={{ marginRight: '8px' }} />
        Deferred Value Demo
      </Title>
      <Paragraph>
        useDeferredValue lets you defer updating parts of the UI that are expensive 
        to re-render, keeping the input responsive.
      </Paragraph>

      <div style={{ marginBottom: '16px' }}>
        <Text>Search Items:</Text>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search..."
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '8px',
            border: '1px solid #d9d9d9',
            borderRadius: '4px'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <Tag color="blue">Current Input: "{searchTerm}"</Tag>
        <Tag color={isStale ? 'orange' : 'green'}>
          Deferred Value: "{deferredSearchTerm}"
        </Tag>
        {isStale && <Tag color="orange" icon={<FiClock />}>Updating...</Tag>}
      </div>

      <div style={{ opacity: isStale ? 0.7 : 1, transition: 'opacity 0.2s' }}>
        <Suspense fallback={<Spin size="large" />}>
          <SlowList items={items} filter={deferredSearchTerm} />
        </Suspense>
      </div>
    </Card>
  );
};

// Suspense boundaries demo
const SuspenseBoundariesDemo = () => {
  const [showFast, setShowFast] = useState(true);
  const [showSlow, setShowSlow] = useState(true);

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiLayers style={{ marginRight: '8px' }} />
        Suspense Boundaries
      </Title>
      <Paragraph>
        Suspense boundaries allow parts of your UI to load independently, 
        showing fallbacks for components that are still loading.
      </Paragraph>

      <Space style={{ marginBottom: '16px' }}>
        <Switch
          checked={showFast}
          onChange={setShowFast}
          checkedChildren="Fast Component"
          unCheckedChildren="Fast Component"
        />
        <Switch
          checked={showSlow}
          onChange={setShowSlow}
          checkedChildren="Slow Component"
          unCheckedChildren="Slow Component"
        />
      </Space>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Fast Loading (500ms)" size="small">
            {showFast ? (
              <Suspense fallback={<Spin />}>
                <DataFetchingComponent delay={500} />
              </Suspense>
            ) : (
              <Text type="secondary">Component disabled</Text>
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Slow Loading (3000ms)" size="small">
            {showSlow ? (
              <Suspense fallback={<Spin />}>
                <DataFetchingComponent delay={3000} />
              </Suspense>
            ) : (
              <Text type="secondary">Component disabled</Text>
            )}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

// Time slicing demonstration
const TimeSlicingDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [useTimeSlicing, setUseTimeSlicing] = useState(true);

  const runHeavyTask = () => {
    setIsRunning(true);
    setProgress(0);

    if (useTimeSlicing) {
      // Simulate time slicing by breaking work into chunks
      const processChunk = (currentProgress) => {
        const startTime = performance.now();
        
        // Do work for about 5ms
        while (performance.now() - startTime < 5 && currentProgress < 100) {
          currentProgress += 0.5;
        }
        
        setProgress(currentProgress);
        
        if (currentProgress < 100) {
          // Yield to browser with setTimeout
          setTimeout(() => processChunk(currentProgress), 0);
        } else {
          setIsRunning(false);
        }
      };
      
      processChunk(0);
    } else {
      // Block the main thread
      const startTime = performance.now();
      let currentProgress = 0;
      
      while (currentProgress < 100) {
        // Simulate heavy work
        const chunkStart = performance.now();
        while (performance.now() - chunkStart < 10) {
          // Busy work
        }
        currentProgress += 2;
        setProgress(currentProgress);
      }
      
      setIsRunning(false);
    }
  };

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiCpu style={{ marginRight: '8px' }} />
        Time Slicing Simulation
      </Title>
      <Paragraph>
        Time slicing allows React to break up work into small chunks, 
        keeping the UI responsive during heavy computations.
      </Paragraph>

      <div style={{ marginBottom: '16px' }}>
        <Switch
          checked={useTimeSlicing}
          onChange={setUseTimeSlicing}
          disabled={isRunning}
          checkedChildren="Time Slicing ON"
          unCheckedChildren="Time Slicing OFF"
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Text>Progress: {progress.toFixed(1)}%</Text>
        <Progress 
          percent={progress} 
          status={isRunning ? 'active' : progress === 100 ? 'success' : undefined}
        />
      </div>

      <Space>
        <Button
          type="primary"
          onClick={runHeavyTask}
          loading={isRunning}
          disabled={isRunning}
        >
          {useTimeSlicing ? 'Run with Time Slicing' : 'Run Blocking Task'}
        </Button>
        <Tag color={useTimeSlicing ? 'green' : 'orange'}>
          {useTimeSlicing ? 'Non-blocking' : 'Blocking'}
        </Tag>
      </Space>

      {isRunning && (
        <Alert
          message={useTimeSlicing ? 
            "Task is running in small chunks. Try interacting with other UI elements!" : 
            "Task is blocking the main thread. UI will be unresponsive."
          }
          type={useTimeSlicing ? 'info' : 'warning'}
          style={{ marginTop: '16px' }}
        />
      )}
    </Card>
  );
};

const ConcurrentFeaturesDemo = () => {
  return (
    <div>
      <Title level={2}>
        <FiCpu style={{ marginRight: '8px' }} />
        Concurrent Features Demo
      </Title>
      
      <Alert
        message="About Concurrent React"
        description="Concurrent features in React allow the framework to prepare multiple versions of the UI at the same time, interrupt work when higher-priority updates come in, and keep the app responsive during heavy computations."
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Key Concurrent Features:</Title>
        <ul>
          <li><strong>Transitions:</strong> Mark updates as non-urgent</li>
          <li><strong>Deferred Values:</strong> Defer expensive re-renders</li>
          <li><strong>Suspense:</strong> Handle async operations declaratively</li>
          <li><strong>Time Slicing:</strong> Break work into interruptible chunks</li>
          <li><strong>Priority-based Scheduling:</strong> Handle urgent updates first</li>
          <li><strong>Concurrent Rendering:</strong> Prepare multiple UI versions</li>
        </ul>
      </Card>

      {/* Priority Management */}
      <TransitionPriorityDemo />

      {/* Deferred Values */}
      <DeferredValueDemo />

      {/* Suspense Boundaries */}
      <SuspenseBoundariesDemo />

      {/* Time Slicing */}
      <TimeSlicingDemo />

      {/* Benefits Summary */}
      <Card style={{ marginBottom: '24px', background: '#f0f9ff' }}>
        <Title level={4}>
          <FiZap style={{ marginRight: '8px' }} />
          Benefits of Concurrent Features
        </Title>
        <Row gutter={16}>
          <Col span={12}>
            <ul>
              <li><strong>Better User Experience:</strong> UI stays responsive</li>
              <li><strong>Improved Performance:</strong> Work can be interrupted</li>
              <li><strong>Smoother Interactions:</strong> High-priority updates first</li>
            </ul>
          </Col>
          <Col span={12}>
            <ul>
              <li><strong>Better Loading States:</strong> Fine-grained Suspense</li>
              <li><strong>Adaptive Performance:</strong> Adjusts to device capabilities</li>
              <li><strong>Progressive Enhancement:</strong> Graceful degradation</li>
            </ul>
          </Col>
        </Row>
      </Card>

      {/* Code Example */}
      <Card style={{ background: '#f5f5f5' }}>
        <Title level={4}>Code Example</Title>
        <pre style={{ background: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
          {`// Using transitions for non-urgent updates
import { useTransition } from 'react';

function SearchResults() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (newQuery) => {
    // Urgent: Update input immediately
    setQuery(newQuery);
    
    // Non-urgent: Search results can wait
    startTransition(() => {
      setResults(searchData(newQuery));
    });
  };

  return (
    <div>
      <input 
        value={query}
        onChange={e => handleSearch(e.target.value)}
      />
      {isPending && <Spinner />}
      <Results data={results} />
    </div>
  );
}

// Using deferred values
import { useDeferredValue } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  return (
    <div>
      <input 
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <Suspense fallback={<Loading />}>
        <SlowResults query={deferredQuery} />
      </Suspense>
    </div>
  );
}

// Using Suspense for data fetching
function UserProfile({ userId }) {
  const user = use(fetchUser(userId)); // New React 19 hook
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Wrapping with Suspense
function App() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <UserProfile userId={123} />
    </Suspense>
  );
}`}
        </pre>
      </Card>
    </div>
  );
};

export default ConcurrentFeaturesDemo;