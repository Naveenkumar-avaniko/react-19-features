import React, { useSyncExternalStore, useState } from 'react';
import { Card, Button, Typography, Alert, Space, Tag, Row, Col, Switch } from 'antd';
import { FiDatabase, FiWifi, FiMonitor, FiRefreshCw, FiSettings } from 'react-icons/fi';

const { Title, Paragraph, Text } = Typography;

// Simple online/offline store
const createOnlineStore = () => {
  return {
    subscribe(callback) {
      const onOnline = () => callback();
      const onOffline = () => callback();
      
      window.addEventListener('online', onOnline);
      window.addEventListener('offline', onOffline);
      
      return () => {
        window.removeEventListener('online', onOnline);
        window.removeEventListener('offline', onOffline);
      };
    },
    getSnapshot() {
      return navigator.onLine;
    },
    getServerSnapshot() {
      return true;
    }
  };
};

// Simple counter store
const createSimpleCounter = () => {
  let count = 0;
  const listeners = new Set();

  return {
    subscribe(callback) {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    getSnapshot() {
      return count;
    },
    getServerSnapshot() {
      return 0;
    },
    increment() {
      count += 1;
      listeners.forEach(callback => callback());
    },
    decrement() {
      count -= 1;
      listeners.forEach(callback => callback());
    },
    reset() {
      count = 0;
      listeners.forEach(callback => callback());
    }
  };
};

const UseSyncExternalStoreDemo = () => {
  const [onlineStore] = useState(() => createOnlineStore());
  const [counterStore] = useState(() => createSimpleCounter());
  
  // Use the stores
  const isOnline = useSyncExternalStore(
    onlineStore.subscribe,
    onlineStore.getSnapshot,
    onlineStore.getServerSnapshot
  );
  
  const count = useSyncExternalStore(
    counterStore.subscribe,
    counterStore.getSnapshot,
    counterStore.getServerSnapshot
  );

  return (
    <div>
      <Title level={2}>
        <FiDatabase style={{ marginRight: '8px' }} />
        useSyncExternalStore Hook Demo
      </Title>
      
      <Alert
        message="About useSyncExternalStore"
        description="This hook allows React components to subscribe to external stores (like localStorage, global state, browser APIs) and automatically re-render when the external state changes."
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Key Benefits:</Title>
        <ul>
          <li>Safely integrate with external data sources</li>
          <li>Automatic subscription and cleanup</li>
          <li>SSR-safe with server snapshot support</li>
          <li>Concurrent rendering compatible</li>
          <li>Prevents tearing in concurrent updates</li>
        </ul>
      </Card>

      {/* Online Status Demo */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>
          <FiWifi style={{ marginRight: '8px' }} />
          Online Status Detection
        </Title>
        <Paragraph>
          This demo subscribes to the browser's online/offline events. 
          Try disconnecting your internet to see it update automatically.
        </Paragraph>
        
        <Space size="large">
          <Tag 
            color={isOnline ? 'green' : 'red'} 
            icon={<FiWifi />}
            style={{ padding: '8px 16px', fontSize: '16px' }}
          >
            {isOnline ? 'Online' : 'Offline'}
          </Tag>
          <Text>
            Status: <Text strong>{isOnline ? 'Connected' : 'Disconnected'}</Text>
          </Text>
        </Space>
      </Card>

      {/* Simple Counter Demo */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>
          <FiRefreshCw style={{ marginRight: '8px' }} />
          External Counter Store
        </Title>
        <Paragraph>
          A simple counter store that demonstrates how external state changes 
          automatically trigger React re-renders.
        </Paragraph>
        
        <Space direction="vertical" align="center">
          <div style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            color: '#1890ff',
            textAlign: 'center' 
          }}>
            {count}
          </div>
          
          <Space>
            <Button type="primary" onClick={counterStore.increment}>
              + Increment
            </Button>
            <Button onClick={counterStore.decrement}>
              - Decrement
            </Button>
            <Button danger onClick={counterStore.reset}>
              Reset
            </Button>
          </Space>
        </Space>
      </Card>

      {/* How it Works */}
      <Card style={{ marginBottom: '24px', background: '#f9f9f9' }}>
        <Title level={4}>How useSyncExternalStore Works</Title>
        <Row gutter={16}>
          <Col span={8}>
            <Card size="small">
              <Title level={5}>1. Subscribe</Title>
              <Text>Hook subscribes to external store changes</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small">
              <Title level={5}>2. Snapshot</Title>
              <Text>Gets current state when store changes</Text>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small">
              <Title level={5}>3. Re-render</Title>
              <Text>Component automatically updates</Text>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Use Cases */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Common Use Cases</Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <ul>
              <li><strong>Browser APIs:</strong> Online status, geolocation, media queries</li>
              <li><strong>Global State:</strong> Redux, Zustand, custom stores</li>
              <li><strong>External Libraries:</strong> Third-party state management</li>
            </ul>
          </Col>
          <Col span={12}>
            <ul>
              <li><strong>Real-time Data:</strong> WebSocket connections</li>
              <li><strong>Device APIs:</strong> Battery, network information</li>
              <li><strong>Local Storage:</strong> Persistent client-side data</li>
            </ul>
          </Col>
        </Row>
      </Card>

      {/* Code Example */}
      <Card style={{ background: '#f5f5f5' }}>
        <Title level={4}>Code Example</Title>
        <pre style={{ background: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
          {`// Create an external store
const createCounterStore = () => {
  let count = 0;
  const listeners = new Set();

  return {
    // Subscribe function - called when component mounts
    subscribe(callback) {
      listeners.add(callback);
      return () => listeners.delete(callback); // Cleanup
    },
    
    // Get current snapshot
    getSnapshot() {
      return count;
    },
    
    // Server-side snapshot (for SSR)
    getServerSnapshot() {
      return 0;
    },
    
    // Methods to update the store
    increment() {
      count++;
      // Notify all subscribers
      listeners.forEach(callback => callback());
    }
  };
};

// Use the store in a component
function Counter() {
  const [store] = useState(() => createCounterStore());
  
  const count = useSyncExternalStore(
    store.subscribe,        // Subscribe function
    store.getSnapshot,      // Get current value
    store.getServerSnapshot // Server-side value
  );
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={store.increment}>+</button>
    </div>
  );
}

// Online/Offline status example
function OnlineStatus() {
  const isOnline = useSyncExternalStore(
    // Subscribe to online/offline events
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    // Get current online status
    () => navigator.onLine,
    // Server snapshot
    () => true
  );
  
  return <div>Status: {isOnline ? 'Online' : 'Offline'}</div>;
}`}
        </pre>
      </Card>

      {/* Best Practices */}
      <Card style={{ marginBottom: '24px', background: '#fff7e6', border: '1px solid #ffd591' }}>
        <Title level={4}>Best Practices</Title>
        <ul>
          <li><strong>Always return cleanup function:</strong> Prevent memory leaks in subscribe</li>
          <li><strong>Use stable store instances:</strong> Create stores in useState or outside component</li>
          <li><strong>Handle SSR correctly:</strong> Provide getServerSnapshot for server rendering</li>
          <li><strong>Keep snapshots immutable:</strong> Return new objects when state changes</li>
          <li><strong>Debounce rapid updates:</strong> For high-frequency external changes</li>
        </ul>
      </Card>
    </div>
  );
};

export default UseSyncExternalStoreDemo;