import React, { useState, useTransition, useDeferredValue, memo } from 'react';
import { Card, Button, Input, Typography, Alert, Space, Tabs, List, Tag, Slider, Switch, Progress } from 'antd';
import { FiSearch, FiLayers, FiActivity, FiZap, FiClock } from 'react-icons/fi';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

// Heavy component for demonstration
const ExpensiveList = memo(({ filter, items }) => {
  const filteredItems = items.filter(item => 
    item.toLowerCase().includes(filter.toLowerCase())
  );
  
  // Simulate expensive computation
  const start = performance.now();
  while (performance.now() - start < 1) {
    // Artificial delay
  }
  
  return (
    <List
      size="small"
      bordered
      dataSource={filteredItems}
      renderItem={item => (
        <List.Item>
          <Text>{item}</Text>
        </List.Item>
      )}
      locale={{ emptyText: 'No matches found' }}
    />
  );
});

// Chart component that updates slowly
const SlowChart = ({ data }) => {
  // Simulate expensive rendering
  const start = performance.now();
  while (performance.now() - start < 2) {
    // Artificial delay
  }
  
  return (
    <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}>
      <Title level={5}>Analytics Chart</Title>
      {data.map((value, index) => (
        <div key={index} style={{ marginBottom: '8px' }}>
          <Text>Data {index + 1}:</Text>
          <Progress percent={value} />
        </div>
      ))}
    </div>
  );
};

const TransitionsDemo = () => {
  // useTransition demo state
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('1');
  const [inputValue, setInputValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  
  // useDeferredValue demo state
  const [searchQuery, setSearchQuery] = useState('');
  const deferredQuery = useDeferredValue(searchQuery);
  
  const [sliderValue, setSliderValue] = useState(50);
  const deferredSliderValue = useDeferredValue(sliderValue);
  
  // Toggle for comparison
  const [useTransitions, setUseTransitions] = useState(true);
  
  // Generate large dataset
  const generateItems = (count) => {
    return Array.from({ length: count }, (_, i) => 
      `Item ${i + 1} - ${['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS'][i % 5]}`
    );
  };
  
  const [items] = useState(() => generateItems(1000));
  
  // Generate chart data based on slider
  const chartData = Array.from({ length: 5 }, (_, i) => 
    Math.min(100, (deferredSliderValue + i * 10) % 100)
  );
  
  // Tab content
  const tabItems = [
    {
      key: '1',
      label: 'Overview',
      children: (
        <div>
          <Title level={4}>Transitions Overview</Title>
          <Paragraph>
            Transitions help keep your UI responsive by marking certain updates as non-urgent.
            This allows React to interrupt these updates if more urgent work comes in.
          </Paragraph>
        </div>
      )
    },
    {
      key: '2',
      label: 'Heavy Content',
      children: (
        <div>
          <Title level={4}>Heavy Computation</Title>
          <Paragraph>This tab contains expensive components that take time to render.</Paragraph>
          <SlowChart data={[75, 60, 90, 45, 80]} />
        </div>
      )
    },
    {
      key: '3',
      label: 'More Content',
      children: (
        <div>
          <Title level={4}>Additional Content</Title>
          <List
            dataSource={items.slice(0, 50)}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </div>
      )
    }
  ];
  
  const handleTabChange = (key) => {
    if (useTransitions) {
      startTransition(() => {
        setTab(key);
      });
    } else {
      setTab(key);
    }
  };
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (useTransitions) {
      startTransition(() => {
        setFilterValue(e.target.value);
      });
    } else {
      setFilterValue(e.target.value);
    }
  };

  return (
    <div>
      <Title level={2}>
        <FiLayers style={{ marginRight: '8px' }} />
        Transitions Demo (useTransition & useDeferredValue)
      </Title>
      
      <Alert
        message="About Transitions"
        description="Transitions let you update the state without blocking the UI. useTransition gives you control over transitions, while useDeferredValue lets you defer updating a value."
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Key Concepts:</Title>
        <ul>
          <li><strong>useTransition:</strong> Mark state updates as non-urgent</li>
          <li><strong>useDeferredValue:</strong> Defer re-rendering for non-critical parts</li>
          <li><strong>Concurrent Features:</strong> Keep UI responsive during expensive updates</li>
          <li><strong>Automatic Prioritization:</strong> React handles update scheduling</li>
        </ul>
      </Card>

      {/* Toggle for comparison */}
      <Card style={{ marginBottom: '24px', background: '#f9f9f9' }}>
        <Space align="center">
          <Switch
            checked={useTransitions}
            onChange={setUseTransitions}
            checkedChildren="Transitions ON"
            unCheckedChildren="Transitions OFF"
          />
          <Tag color={useTransitions ? 'green' : 'orange'}>
            {useTransitions ? 'Smooth Experience' : 'Blocking Updates'}
          </Tag>
          <Text type="secondary">
            Toggle to compare performance with and without transitions
          </Text>
        </Space>
      </Card>

      {/* useTransition Demo - Tabs */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>
          <FiZap style={{ marginRight: '8px' }} />
          useTransition - Non-blocking Tab Switches
        </Title>
        <Paragraph>
          Switch between tabs. With transitions enabled, the UI stays responsive even when 
          loading heavy content. The "Heavy Content" tab simulates expensive rendering.
        </Paragraph>
        
        {isPending && (
          <Alert
            message="Loading new tab content..."
            type="warning"
            icon={<FiClock />}
            style={{ marginBottom: '16px' }}
          />
        )}
        
        <Tabs
          activeKey={tab}
          onChange={handleTabChange}
          items={tabItems}
        />
      </Card>

      {/* useTransition Demo - Search Filter */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>
          <FiSearch style={{ marginRight: '8px' }} />
          useTransition - Non-blocking Search
        </Title>
        <Paragraph>
          Type to filter a large list. With transitions, typing stays responsive while 
          the expensive list filtering happens in the background.
        </Paragraph>
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Search items..."
            value={inputValue}
            onChange={handleInputChange}
            prefix={<FiSearch />}
            size="large"
          />
          
          {isPending && (
            <Tag color="processing" icon={<FiActivity />}>
              Filtering list...
            </Tag>
          )}
          
          <div style={{ height: '300px', overflow: 'auto' }}>
            <ExpensiveList filter={filterValue} items={items} />
          </div>
        </Space>
      </Card>

      {/* useDeferredValue Demo - Search */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>
          <FiActivity style={{ marginRight: '8px' }} />
          useDeferredValue - Deferred Search Results
        </Title>
        <Paragraph>
          The search input updates immediately, while results update with a deferred value.
          This keeps typing responsive even with expensive result rendering.
        </Paragraph>
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <Search
            placeholder="Type to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="large"
          />
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <Tag color="blue">Input: {searchQuery || '(empty)'}</Tag>
            <Tag color="green">Deferred: {deferredQuery || '(empty)'}</Tag>
            {searchQuery !== deferredQuery && (
              <Tag color="orange" icon={<FiClock />}>Updating...</Tag>
            )}
          </div>
          
          <Card style={{ background: '#f5f5f5' }}>
            <Title level={5}>Search Results for: "{deferredQuery}"</Title>
            {deferredQuery && (
              <List
                size="small"
                dataSource={items.filter(item => 
                  item.toLowerCase().includes(deferredQuery.toLowerCase())
                ).slice(0, 10)}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            )}
          </Card>
        </Space>
      </Card>

      {/* useDeferredValue Demo - Slider */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>
          <FiActivity style={{ marginRight: '8px' }} />
          useDeferredValue - Real-time Slider with Deferred Chart
        </Title>
        <Paragraph>
          Move the slider to see immediate feedback while the chart updates are deferred.
        </Paragraph>
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text>Adjust Value: {sliderValue}</Text>
            <Slider
              value={sliderValue}
              onChange={setSliderValue}
              style={{ marginBottom: '16px' }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <Tag color="blue">Current: {sliderValue}</Tag>
            <Tag color="green">Deferred: {deferredSliderValue}</Tag>
            {sliderValue !== deferredSliderValue && (
              <Tag color="orange" icon={<FiClock />}>Chart updating...</Tag>
            )}
          </div>
          
          <SlowChart data={chartData} />
        </Space>
      </Card>

      {/* Code Example */}
      <Card style={{ background: '#f5f5f5' }}>
        <Title level={4}>Code Examples</Title>
        <pre style={{ background: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
          {`// useTransition Example
function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('home');
  
  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  
  return (
    <>
      {isPending && <Spinner />}
      <TabButton onClick={() => selectTab('home')}>
        Home
      </TabButton>
      <TabButton onClick={() => selectTab('posts')}>
        Posts (slow)
      </TabButton>
      <TabContent tab={tab} />
    </>
  );
}

// useDeferredValue Example  
function SearchResults() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  return (
    <>
      <SearchInput
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <Suspense fallback={<Spinner />}>
        <Results query={deferredQuery} />
      </Suspense>
    </>
  );
}`}
        </pre>
      </Card>
    </div>
  );
};

export default TransitionsDemo;