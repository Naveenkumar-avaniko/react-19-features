import React, { Suspense, use, useState, useEffect, useMemo, useCallback } from 'react';
import { Card, Button, Typography, Spin, Alert, Space, Divider, Tag, Row, Col, Tabs } from 'antd';
import { FiRefreshCw, FiDatabase, FiClock, FiZap, FiCode, FiArrowRight } from 'react-icons/fi';

const { Title, Paragraph, Text } = Typography;

// Simulated API calls
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

// Create a resource cache
const createResource = (promise) => {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    (data) => {
      status = 'success';
      result = data;
    },
    (error) => {
      status = 'error';
      result = error;
    }
  );
  
  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw result;
      return result;
    }
  };
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

// Old way with useEffect
const UserProfileOldWay = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchUserData(userId).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, [userId]);

  if (loading) {
    return (
      <Card style={{ marginBottom: '16px', textAlign: 'center' }}>
        <Spin size="large" />
        <Paragraph style={{ marginTop: '16px' }}>Loading user data...</Paragraph>
      </Card>
    );
  }

  return (
    <Card style={{ marginBottom: '16px' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Text strong>Name:</Text> <Text>{user?.name}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Email:</Text> <Text>{user?.email}</Text>
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

// Comparison examples
const ComparisonExamples = () => {
  return (
    <div>
      {/* useEffect vs use() Comparison */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>
          <FiCode style={{ marginRight: '8px' }} />
          useEffect vs use() Hook Comparison
        </Title>
        
        <Row gutter={16}>
          <Col span={12}>
            <Card size="small" title="Before: useEffect (React 18)" style={{ background: '#fff5f5' }}>
              <pre style={{ fontSize: '12px', overflow: 'auto' }}>
{`function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchUser(userId)
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <Spinner />;
  if (error) return <Error />;
  return <div>{user.name}</div>;
}`}
              </pre>
              <Divider />
              <Text type="danger">Drawbacks:</Text>
              <ul style={{ fontSize: '12px' }}>
                <li>Manual loading state management</li>
                <li>Manual error handling</li>
                <li>More boilerplate code</li>
                <li>Waterfall loading pattern</li>
              </ul>
            </Card>
          </Col>
          
          <Col span={12}>
            <Card size="small" title="After: use() Hook (React 19)" style={{ background: '#f0f9ff' }}>
              <pre style={{ fontSize: '12px', overflow: 'auto' }}>
{`function UserProfile({ userPromise }) {
  // Simple and clean!
  const user = use(userPromise);
  return <div>{user.name}</div>;
}

// Parent component
function App() {
  const userPromise = fetchUser(userId);
  
  return (
    <Suspense fallback={<Spinner />}>
      <ErrorBoundary fallback={<Error />}>
        <UserProfile userPromise={userPromise} />
      </ErrorBoundary>
    </Suspense>
  );
}`}
              </pre>
              <Divider />
              <Text type="success">Benefits:</Text>
              <ul style={{ fontSize: '12px' }}>
                <li>Automatic loading via Suspense</li>
                <li>Automatic error via Error Boundaries</li>
                <li>Cleaner, less code</li>
                <li>Better performance with parallel loading</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* useMemo/useCallback Replacement */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>
          <FiZap style={{ marginRight: '8px' }} />
          Replacing useMemo & useCallback with use()
        </Title>
        
        <Row gutter={16}>
          <Col span={12}>
            <Card size="small" title="Before: useMemo/useCallback">
              <pre style={{ fontSize: '12px', overflow: 'auto' }}>
{`// Expensive computation with useMemo
function ExpensiveComponent({ data }) {
  const processedData = useMemo(() => {
    return expensiveProcessing(data);
  }, [data]);
  
  const handleClick = useCallback(() => {
    doSomething(processedData);
  }, [processedData]);
  
  return <div onClick={handleClick}>{processedData}</div>;
}

// Async data with manual caching
function DataComponent({ id }) {
  const [cache, setCache] = useState({});
  
  const data = useMemo(() => {
    if (!cache[id]) {
      fetchData(id).then(result => {
        setCache(prev => ({ ...prev, [id]: result }));
      });
    }
    return cache[id];
  }, [id, cache]);
  
  return data ? <div>{data}</div> : <Loading />;
}`}
              </pre>
            </Card>
          </Col>
          
          <Col span={12}>
            <Card size="small" title="After: use() Hook" style={{ background: '#f0f9ff' }}>
              <pre style={{ fontSize: '12px', overflow: 'auto' }}>
{`// Expensive async computation with use()
function ExpensiveComponent({ dataPromise }) {
  // use() handles caching automatically!
  const processedData = use(dataPromise);
  
  // No need for useCallback - React 19 optimizes this
  const handleClick = () => {
    doSomething(processedData);
  };
  
  return <div onClick={handleClick}>{processedData}</div>;
}

// Async data with automatic caching
function DataComponent({ id }) {
  // Create promise once, use() caches the result
  const dataPromise = useMemo(
    () => fetchData(id),
    [id]
  );
  
  // use() automatically handles the promise
  const data = use(dataPromise);
  
  return <div>{data}</div>;
}`}
              </pre>
            </Card>
          </Col>
        </Row>

        <Alert
          message="Key Improvements in React 19"
          description={
            <ul>
              <li><strong>Automatic Memoization:</strong> React 19's compiler automatically memoizes expensive computations</li>
              <li><strong>No useCallback needed:</strong> Functions are automatically optimized by the React 19 compiler</li>
              <li><strong>Promise Caching:</strong> use() hook automatically caches promise results</li>
              <li><strong>Cleaner Code:</strong> Less boilerplate, more readable components</li>
            </ul>
          }
          type="success"
          showIcon
          style={{ marginTop: '16px' }}
        />
      </Card>

      {/* Use Cases */}
      <Card style={{ marginBottom: '24px', background: '#f6ffed' }}>
        <Title level={4}>When useMemo/useCallback are Replaced by use() in React 19</Title>
        
        <Row gutter={16}>
          <Col span={8}>
            <Card size="small" title="Data Fetching">
              <Text strong>Old Way:</Text>
              <pre style={{ fontSize: '11px' }}>
{`useMemo + useEffect + useState`}
              </pre>
              <Divider />
              <Text strong>New Way:</Text>
              <pre style={{ fontSize: '11px' }}>
{`use(promise) + Suspense`}
              </pre>
            </Card>
          </Col>
          
          <Col span={8}>
            <Card size="small" title="Resource Reading">
              <Text strong>Old Way:</Text>
              <pre style={{ fontSize: '11px' }}>
{`useContext + useMemo`}
              </pre>
              <Divider />
              <Text strong>New Way:</Text>
              <pre style={{ fontSize: '11px' }}>
{`use(context) - conditional!`}
              </pre>
            </Card>
          </Col>
          
          <Col span={8}>
            <Card size="small" title="Async Dependencies">
              <Text strong>Old Way:</Text>
              <pre style={{ fontSize: '11px' }}>
{`useCallback + dependency array`}
              </pre>
              <Divider />
              <Text strong>New Way:</Text>
              <pre style={{ fontSize: '11px' }}>
{`Compiler optimization + use()`}
              </pre>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
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

  const tabItems = [
    {
      key: '1',
      label: 'Interactive Demo',
      children: (
        <div>
          <Card style={{ marginBottom: '24px' }}>
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
              <Title level={4}>With use() Hook (React 19)</Title>
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
              <Title level={4}>With useEffect (Old Way)</Title>
              <UserProfileOldWay userId={userId} />
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: '16px' }}>
            <Col span={24}>
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
        </div>
      )
    },
    {
      key: '2',
      label: 'Comparisons & Replacements',
      children: <ComparisonExamples />
    },
    {
      key: '3',
      label: 'Code Examples',
      children: (
        <div>
          <Card style={{ marginBottom: '24px' }}>
            <Title level={4}>Complete Example: Data Fetching Pattern</Title>
            <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
{`// React 19 with use() hook
import { use, Suspense } from 'react';

// Create a cached promise
const userPromiseCache = new Map();

function getUserPromise(userId) {
  if (!userPromiseCache.has(userId)) {
    userPromiseCache.set(userId, fetchUser(userId));
  }
  return userPromiseCache.get(userId);
}

// Component using use()
function UserProfile({ userId }) {
  const userPromise = getUserPromise(userId);
  const user = use(userPromise);
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// Conditional use() - only possible with use(), not other hooks!
function ConditionalProfile({ userId, showDetails }) {
  const userPromise = getUserPromise(userId);
  const user = use(userPromise);
  
  // use() can be called conditionally!
  if (showDetails) {
    const detailsPromise = getUserDetails(userId);
    const details = use(detailsPromise);
    return <DetailedProfile user={user} details={details} />;
  }
  
  return <SimpleProfile user={user} />;
}

// Parent component
function App() {
  const [userId, setUserId] = useState(1);
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <UserProfile userId={userId} />
    </Suspense>
  );
}`}
            </pre>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <Title level={4}>Advanced Pattern: Parallel Data Loading</Title>
            <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
{`// Parallel loading with use() - Much better than waterfall!
function Dashboard() {
  // All promises start loading immediately
  const userPromise = fetchUser();
  const postsPromise = fetchPosts();
  const statsPromise = fetchStats();
  
  // use() reads them when ready
  const user = use(userPromise);
  const posts = use(postsPromise);
  const stats = use(statsPromise);
  
  return (
    <>
      <UserInfo user={user} />
      <PostsList posts={posts} />
      <Statistics stats={stats} />
    </>
  );
}

// Old way would cause waterfall loading:
function OldDashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    fetchUser().then(setUser); // Loads first
  }, []);
  
  useEffect(() => {
    if (user) {
      fetchPosts(user.id).then(setPosts); // Waits for user
    }
  }, [user]);
  
  useEffect(() => {
    if (posts) {
      fetchStats(posts).then(setStats); // Waits for posts
    }
  }, [posts]);
  
  // Waterfall: user -> posts -> stats
}`}
            </pre>
          </Card>
        </div>
      )
    }
  ];

  return (
    <div>
      <Title level={2}>
        <FiDatabase style={{ marginRight: '8px' }} />
        use() Hook Demo
      </Title>
      
      <Alert
        message="About the use() Hook"
        description="The use() hook in React 19 allows you to read the value of resources like Promises and contexts. It integrates with Suspense, can be called conditionally, and replaces many use cases of useEffect, useMemo, and useCallback."
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Key Features & Benefits:</Title>
        <Row gutter={16}>
          <Col span={12}>
            <ul>
              <li>Read promises directly during render</li>
              <li>Automatic Suspense integration</li>
              <li>Can be called conditionally (unique among hooks!)</li>
              <li>Works with promises, contexts, and resources</li>
            </ul>
          </Col>
          <Col span={12}>
            <ul>
              <li>Replaces useEffect for data fetching</li>
              <li>Replaces useMemo for async computations</li>
              <li>Automatic caching of promise results</li>
              <li>Enables parallel data loading patterns</li>
            </ul>
          </Col>
        </Row>
      </Card>

      <Tabs items={tabItems} />
    </div>
  );
};

export default UseHookDemo;