import React, { useId, useState, useRef } from 'react';
import { Card, Button, Typography, Alert, Space, Form, Input, Checkbox, Radio, Select, Row, Col, Tag } from 'antd';
import { FiHash, FiUser, FiMail, FiLock, FiEye, FiSettings } from 'react-icons/fi';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// Custom form field component using useId
const FormField = ({ label, type = 'text', required = false, options = [], ...props }) => {
  const id = useId();
  const descId = useId();
  
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return <TextArea id={id} aria-describedby={descId} {...props} />;
      case 'select':
        return (
          <Select id={id} aria-describedby={descId} {...props}>
            {options.map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
      case 'checkbox':
        return <Checkbox id={id} aria-describedby={descId} {...props}>{label}</Checkbox>;
      case 'radio':
        return (
          <Radio.Group id={id} aria-describedby={descId} {...props}>
            {options.map(option => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      default:
        return <Input id={id} type={type} aria-describedby={descId} {...props} />;
    }
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      {type !== 'checkbox' && (
        <label htmlFor={id} style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
          {label} {required && <Text type="danger">*</Text>}
        </label>
      )}
      {renderInput()}
      <div id={descId} style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
        Field ID: <Text code>{id}</Text> | Description ID: <Text code>{descId}</Text>
      </div>
    </div>
  );
};

// Component that demonstrates multiple useId calls
const MultipleIdsComponent = () => {
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const formId = useId();

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiHash style={{ marginRight: '8px' }} />
        Multiple useId in Single Component
      </Title>
      <Paragraph>
        Each useId call generates a unique ID, even within the same component.
      </Paragraph>
      
      <form id={formId}>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor={nameId}>Name:</label>
          <Input id={nameId} placeholder="Enter your name" />
          <Text type="secondary" style={{ fontSize: '12px' }}>ID: {nameId}</Text>
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor={emailId}>Email:</label>
          <Input id={emailId} type="email" placeholder="Enter your email" />
          <Text type="secondary" style={{ fontSize: '12px' }}>ID: {emailId}</Text>
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor={phoneId}>Phone:</label>
          <Input id={phoneId} type="tel" placeholder="Enter your phone" />
          <Text type="secondary" style={{ fontSize: '12px' }}>ID: {phoneId}</Text>
        </div>
        
        <Tag color="blue">Form ID: {formId}</Tag>
      </form>
    </Card>
  );
};

// Component that shows useId with prefixes
const PrefixedIdsComponent = () => {
  const baseId = useId();
  
  // You can create related IDs by adding suffixes
  const titleId = `${baseId}-title`;
  const contentId = `${baseId}-content`;
  const footerId = `${baseId}-footer`;

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiSettings style={{ marginRight: '8px' }} />
        Related IDs with Prefixes
      </Title>
      <Paragraph>
        You can create related IDs by combining useId with custom suffixes.
      </Paragraph>
      
      <div>
        <div id={titleId} style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          Article Title
          <Tag style={{ marginLeft: '8px' }} color="green">ID: {titleId}</Tag>
        </div>
        <div id={contentId} style={{ marginBottom: '8px' }}>
          This is the article content that relates to the title above.
          <Tag style={{ marginLeft: '8px' }} color="orange">ID: {contentId}</Tag>
        </div>
        <div id={footerId} style={{ fontSize: '12px', color: '#666' }}>
          Article footer information.
          <Tag style={{ marginLeft: '8px' }} color="purple">ID: {footerId}</Tag>
        </div>
        
        <div style={{ marginTop: '12px' }}>
          <Text strong>Base ID from useId(): </Text>
          <Text code>{baseId}</Text>
        </div>
      </div>
    </Card>
  );
};

// Accessibility demo
const AccessibilityDemo = () => {
  const [showErrors, setShowErrors] = useState(false);

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiEye style={{ marginRight: '8px' }} />
        Accessibility with useId
      </Title>
      <Paragraph>
        useId helps create accessible forms by generating unique IDs for proper label association 
        and ARIA attributes.
      </Paragraph>
      
      <Space style={{ marginBottom: '16px' }}>
        <Button onClick={() => setShowErrors(!showErrors)}>
          {showErrors ? 'Hide' : 'Show'} Error States
        </Button>
      </Space>

      <FormField
        label="Full Name"
        placeholder="Enter your full name"
        required
      />
      
      <FormField
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        required
      />
      
      <FormField
        label="Password"
        type="password"
        placeholder="Enter your password"
        required
      />
      
      <FormField
        label="Country"
        type="select"
        placeholder="Select your country"
        options={[
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'ca', label: 'Canada' },
          { value: 'au', label: 'Australia' }
        ]}
      />
      
      <FormField
        label="Gender"
        type="radio"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
          { value: 'prefer-not-to-say', label: 'Prefer not to say' }
        ]}
      />
      
      <FormField
        label="Comments"
        type="textarea"
        placeholder="Any additional comments"
        rows={3}
      />
      
      <FormField
        type="checkbox"
        label="I agree to the terms and conditions"
      />
    </Card>
  );
};

// SSR Compatibility Demo
const SSRDemo = () => {
  const [isClient, setIsClient] = useState(false);
  const serverId = useId();
  
  // Simulate client-side hydration
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>SSR Compatibility</Title>
      <Paragraph>
        useId generates the same ID on both server and client, preventing hydration mismatches.
      </Paragraph>
      
      <div style={{ background: '#f0f0f0', padding: '16px', borderRadius: '8px' }}>
        <Row gutter={16}>
          <Col span={12}>
            <div>
              <Text strong>Server Render ID:</Text>
              <br />
              <Text code>{serverId}</Text>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <Text strong>Hydration Status:</Text>
              <br />
              <Tag color={isClient ? 'green' : 'orange'}>
                {isClient ? 'Hydrated' : 'Server'}
              </Tag>
            </div>
          </Col>
        </Row>
        
        <div style={{ marginTop: '12px' }}>
          <Text type="secondary">
            The ID remains consistent across server and client rendering, 
            preventing React hydration errors.
          </Text>
        </div>
      </div>
    </Card>
  );
};

// Counter component to show unique IDs across instances
const CounterWithId = ({ index }) => {
  const id = useId();
  const [count, setCount] = useState(0);

  return (
    <Card size="small" style={{ textAlign: 'center' }}>
      <div>
        <Text strong>Counter {index}</Text>
        <br />
        <Text style={{ fontSize: '24px' }}>{count}</Text>
        <br />
        <Space>
          <Button size="small" onClick={() => setCount(c => c - 1)}>-</Button>
          <Button size="small" onClick={() => setCount(c => c + 1)}>+</Button>
        </Space>
        <br />
        <Text type="secondary" style={{ fontSize: '11px' }}>
          ID: {id}
        </Text>
      </div>
    </Card>
  );
};

const UseIdDemo = () => {
  const [componentCount, setComponentCount] = useState(3);

  return (
    <div>
      <Title level={2}>
        <FiHash style={{ marginRight: '8px' }} />
        useId Hook Demo
      </Title>
      
      <Alert
        message="About useId"
        description="useId generates unique IDs that are stable across server and client renders. It's perfect for accessibility attributes, form labels, and avoiding hydration mismatches in SSR applications."
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Key Benefits:</Title>
        <ul>
          <li>Generates unique IDs that are stable across renders</li>
          <li>SSR-safe - same ID on server and client</li>
          <li>Perfect for accessibility attributes (aria-describedby, aria-labelledby)</li>
          <li>Eliminates need for manually managing ID counters</li>
          <li>Prevents hydration mismatches</li>
        </ul>
      </Card>

      {/* Multiple IDs Demo */}
      <MultipleIdsComponent />

      {/* Prefixed IDs Demo */}
      <PrefixedIdsComponent />

      {/* Accessibility Demo */}
      <AccessibilityDemo />

      {/* Component Instances Demo */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Unique IDs Across Component Instances</Title>
        <Paragraph>
          Each component instance gets its own unique ID, even when rendered multiple times.
        </Paragraph>
        
        <Space style={{ marginBottom: '16px' }}>
          <Text>Component Count:</Text>
          <Button onClick={() => setComponentCount(c => Math.max(1, c - 1))}>-</Button>
          <Text>{componentCount}</Text>
          <Button onClick={() => setComponentCount(c => Math.min(6, c + 1))}>+</Button>
        </Space>
        
        <Row gutter={[16, 16]}>
          {Array.from({ length: componentCount }, (_, i) => (
            <Col key={i} span={8}>
              <CounterWithId index={i + 1} />
            </Col>
          ))}
        </Row>
      </Card>

      {/* SSR Demo */}
      <SSRDemo />

      {/* Best Practices */}
      <Card style={{ marginBottom: '24px', background: '#f9f9f9' }}>
        <Title level={4}>Best Practices</Title>
        <ul>
          <li><Text strong>Don't use for CSS selectors:</Text> IDs change between renders in development</li>
          <li><Text strong>Don't use for keys:</Text> Use stable identifiers for React keys</li>
          <li><Text strong>Perfect for accessibility:</Text> aria-describedby, aria-labelledby, etc.</li>
          <li><Text strong>Use prefixes for related elements:</Text> Create related IDs with suffixes</li>
          <li><Text strong>SSR compatible:</Text> No need for client-side checks</li>
        </ul>
      </Card>

      {/* Code Example */}
      <Card style={{ background: '#f5f5f5' }}>
        <Title level={4}>Code Example</Title>
        <pre style={{ background: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
          {`// Basic usage
function FormField({ label, ...inputProps }) {
  const id = useId();
  
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...inputProps} />
    </>
  );
}

// With accessibility attributes
function AccessibleField({ label, error, help }) {
  const id = useId();
  const errorId = useId();
  const helpId = useId();
  
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-describedby={error ? errorId : helpId}
        aria-invalid={!!error}
      />
      {error && (
        <div id={errorId} role="alert">
          {error}
        </div>
      )}
      {help && (
        <div id={helpId}>
          {help}
        </div>
      )}
    </div>
  );
}

// Creating related IDs
function Dialog() {
  const id = useId();
  const titleId = \`\${id}-title\`;
  const descId = \`\${id}-desc\`;
  
  return (
    <div
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <h2 id={titleId}>Dialog Title</h2>
      <p id={descId}>Dialog description</p>
    </div>
  );
}`}
        </pre>
      </Card>
    </div>
  );
};

export default UseIdDemo;