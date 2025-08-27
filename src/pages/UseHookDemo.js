import React, { Suspense, use, useState } from 'react';
import { Card, Button, Typography, Spin, Alert, Space, Divider, Tag, Row, Col } from 'antd';
import { FiRefreshCw, FiDatabase, FiClock } from 'react-icons/fi';

const { Title, Paragraph, Text } = Typography;

// Simulated API call that returns a promise
const fetchUserData = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = {
        1: { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', status: 'Active' },
        2: { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', status: 'Active' },
        3: { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Away' },
      };
      resolve(users[userId] || { id: userId, name: 'Unknown User', email: 'N/A', role: 'N/A', status: 'Inactive' });
    }, 1500);
  });
};

const fetchPosts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Introduction to React 19', views: 1234, date: '2024-03-15' },
        { id: 2, title: 'Understanding the use() Hook', views: 892, date: '2024-03-14' },
        { id: 3, title: 'Building Modern React Apps', views: 2341, date: '2024-03-13' },
      ]);
    }, 2000);
  });
};

// Component using the use() hook
const UserProfile = ({ userPromise }) => {
  const user = use(userPromise);
  
  return (
    <Card style={{ marginBottom: '16px' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Text strong>Name:</Text> <Text>{user.name}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Email:</Text> <Text>{user.email}</Text>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '8px' }}>
        <Col span={12}>
          <Text strong>Role:</Text> <Tag color="blue">{user.role}</Tag>
        </Col>
        <Col span={12}>
          <Text strong>Status:</Text> 
          <Tag color={user.status === 'Active' ? 'green' : user.status === 'Away' ? 'orange' : 'default'}>
            {user.status}
          </Tag>
        </Col>
      </Row>
    </Card>
  );
};

const PostsList = ({ postsPromise }) => {
  const posts = use(postsPromise);
  
  return (
    <Card>
      <Title level={4}>Recent Posts</Title>
      {posts.map(post => (
        <div key={post.id} style={{ 
          padding: '12px', 
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <Text strong>{post.title}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              <FiClock style={{ marginRight: '4px' }} />
              {post.date}
            </Text>
          </div>
          <Tag color="purple">{post.views} views</Tag>
        </div>
      ))}
    </Card>
  );
};

const UseHookDemo = () => {
  const [userId, setUserId] = useState(1);
  const [userPromise, setUserPromise] = useState(() => fetchUserData(1));
  const [postsPromise, setPostsPromise] = useState(() => fetchPosts());
  const [refreshKey, setRefreshKey] = useState(0);

  const loadUser = (id) => {
    setUserId(id);
    setUserPromise(fetchUserData(id));
  };

  const refreshData = () => {
    setUserPromise(fetchUserData(userId));
    setPostsPromise(fetchPosts());
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div>
      <Title level={2}>
        <FiDatabase style={{ marginRight: '8px' }} />
        use() Hook Demo
      </Title>
      
      <Alert
        message="About the use() Hook"
        description="The use() hook in React 19 allows you to read the value of a resource like a Promise or context. It integrates with Suspense to handle loading states automatically."
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Key Features:</Title>
        <ul>
          <li>Read promises directly in components during render</li>
          <li>Automatic integration with Suspense boundaries</li>
          <li>Can be called conditionally (unlike other hooks)</li>
          <li>Works with both data fetching and context</li>
        </ul>
      </Card>

      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Interactive Demo</Title>
        <Paragraph>
          Click the buttons below to load different users. Notice how Suspense handles 
          the loading state automatically when using the use() hook.
        </Paragraph>
        
        <Space wrap>
          <Button type={userId === 1 ? 'primary' : 'default'} onClick={() => loadUser(1)}>
            Load User 1
          </Button>
          <Button type={userId === 2 ? 'primary' : 'default'} onClick={() => loadUser(2)}>
            Load User 2
          </Button>
          <Button type={userId === 3 ? 'primary' : 'default'} onClick={() => loadUser(3)}>
            Load User 3
          </Button>
          <Button icon={<FiRefreshCw />} onClick={refreshData}>
            Refresh All Data
          </Button>
        </Space>
      </Card>

      <Row gutter={16} key={refreshKey}>
        <Col span={12}>
          <Title level={4}>User Information</Title>
          <Suspense fallback={
            <Card style={{ marginBottom: '16px', textAlign: 'center' }}>
              <Spin size="large" />
              <Paragraph style={{ marginTop: '16px' }}>Loading user data...</Paragraph>
            </Card>
          }>
            <UserProfile userPromise={userPromise} />
          </Suspense>
        </Col>
        
        <Col span={12}>
          <Suspense fallback={
            <Card style={{ textAlign: 'center' }}>
              <Spin size="large" />
              <Paragraph style={{ marginTop: '16px' }}>Loading posts...</Paragraph>
            </Card>
          }>
            <PostsList postsPromise={postsPromise} />
          </Suspense>
        </Col>
      </Row>

      <Divider />

      <Card style={{ background: '#f5f5f5' }}>
        <Title level={4}>Code Example</Title>
        <pre style={{ background: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
          {`// Using the use() hook with a Promise
const UserProfile = ({ userPromise }) => {
  // use() unwraps the promise value
  const user = use(userPromise);
  
  return <div>{user.name}</div>;
};

// Parent component with Suspense
function App() {
  const userPromise = fetchUserData(userId);
  
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}`}
        </pre>
      </Card>
    </div>
  );
};

export default UseHookDemo;