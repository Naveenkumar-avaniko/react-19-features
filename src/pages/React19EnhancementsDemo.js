import React, { useState, Suspense } from 'react';
import { Card, Button, Typography, Alert, Space, Divider, Tag, Row, Col, Form, Input, Tabs, Badge, Timeline, Collapse, message, Progress, Switch } from 'antd';
import { FiGlobe, FiZap, FiCode, FiFileText, FiAlertTriangle, FiPackage, FiSettings, FiLayers, FiCheckCircle, FiXCircle, FiInfo, FiUpload, FiDownload } from 'react-icons/fi';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

// Third-party Script Compatibility Demo
const ScriptCompatibilityDemo = () => {
  const [scriptsLoaded, setScriptsLoaded] = useState({
    analytics: false,
    maps: false,
    payment: false
  });

  const loadScript = (scriptName) => {
    setScriptsLoaded(prev => ({ ...prev, [scriptName]: 'loading' }));
    setTimeout(() => {
      setScriptsLoaded(prev => ({ ...prev, [scriptName]: true }));
      message.success(`${scriptName} script loaded successfully!`);
    }, 1500);
  };

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiGlobe style={{ marginRight: '8px' }} />
        Enhanced Third-Party Script Compatibility
      </Title>
      <Paragraph>
        React 19 provides better integration with third-party scripts through improved script loading mechanisms and resource preloading.
      </Paragraph>

      <Row gutter={16}>
        <Col span={12}>
          <Card size="small" title="Script Loading Status">
            <Space direction="vertical" style={{ width: '100%' }}>
              {Object.entries(scriptsLoaded).map(([script, status]) => (
                <div key={script} style={{ 
                  padding: '8px', 
                  background: status === true ? '#f6ffed' : status === 'loading' ? '#fff7e6' : '#f5f5f5',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Text strong style={{ textTransform: 'capitalize' }}>{script}</Text>
                  {status === true ? (
                    <Badge status="success" text="Loaded" />
                  ) : status === 'loading' ? (
                    <Badge status="processing" text="Loading..." />
                  ) : (
                    <Button size="small" onClick={() => loadScript(script)}>Load</Button>
                  )}
                </div>
              ))}
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" title="Resource Preloading Example">
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
{`// React 19 Resource Preloading
import { preload, prefetch } from 'react-dom';

// Preload critical resources
preload('/api/data.json', { as: 'fetch' });
preload('/fonts/main.woff2', { as: 'font' });
preload('/styles/critical.css', { as: 'style' });

// Prefetch for future navigation
prefetch('/next-page-bundle.js');
prefetch('/images/hero.jpg', { as: 'image' });

// Script with async loading
<script async src="/analytics.js" />
<link rel="stylesheet" href="/styles.css" />`}
            </pre>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

// Custom Elements Support Demo
const CustomElementsDemo = () => {
  const [customElementData, setCustomElementData] = useState('Hello from React!');

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiPackage style={{ marginRight: '8px' }} />
        Support for Custom Elements (Web Components)
      </Title>
      <Paragraph>
        React 19 provides seamless integration with Web Components, allowing you to use custom elements directly in React components.
      </Paragraph>

      <Row gutter={16}>
        <Col span={12}>
          <Card size="small" title="Using Web Components in React">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Input 
                placeholder="Enter data for custom element"
                value={customElementData}
                onChange={(e) => setCustomElementData(e.target.value)}
              />
              
              <div style={{ 
                padding: '16px', 
                background: '#f0f9ff', 
                borderRadius: '8px',
                border: '2px dashed #1890ff'
              }}>
                <Text strong>Custom Element Output:</Text>
                <div style={{ marginTop: '8px', padding: '8px', background: 'white', borderRadius: '4px' }}>
                  <Tag color="blue">my-custom-element</Tag>
                  <Text>{customElementData}</Text>
                </div>
              </div>

              <Alert
                message="Web Component Integration"
                description="Custom elements can now receive React props, handle events, and integrate with React's lifecycle."
                type="info"
                showIcon
              />
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" title="Code Example">
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '8px', borderRadius: '4px', overflow: 'auto' }}>
{`// React 19 with Web Components
function App() {
  const [value, setValue] = useState('');
  
  return (
    <div>
      {/* Custom element with React props */}
      <my-custom-input
        value={value}
        onValueChange={(e) => setValue(e.detail)}
        theme="dark"
      />
      
      {/* Third-party web component */}
      <stripe-payment-element
        apiKey={process.env.STRIPE_KEY}
        amount={1000}
        onPaymentSuccess={handleSuccess}
      />
      
      {/* Polymer component */}
      <paper-button raised onClick={handleClick}>
        Click Me
      </paper-button>
    </div>
  );
}

// Custom element definition
class MyCustomInput extends HTMLElement {
  connectedCallback() {
    // React can now properly pass props
    this.render();
  }
}`}
            </pre>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

// Better Error Reporting Demo
const ErrorReportingDemo = () => {
  const [errorType, setErrorType] = useState(null);
  const [showErrorBoundary, setShowErrorBoundary] = useState(false);

  const triggerError = (type) => {
    setErrorType(type);
    setTimeout(() => {
      setErrorType(null);
    }, 3000);
  };

  const errorExamples = {
    syntax: {
      title: 'Syntax Error',
      code: 'REACT_SYNTAX_001',
      message: 'Unexpected token in JSX',
      stack: `Error: Unexpected token '<' at line 42
  at Component.render (App.jsx:42:15)
  at renderWithHooks (react-dom.js:1234:10)
  at mountComponent (react-dom.js:5678:5)`,
      solution: 'Check for missing closing tags or incorrect JSX syntax'
    },
    hook: {
      title: 'Hook Violation',
      code: 'REACT_HOOK_002',
      message: 'Hooks can only be called inside function components',
      stack: `Error: Invalid hook call at line 15
  at useEffect (MyComponent.jsx:15:3)
  at MyComponent (MyComponent.jsx:10:1)
  at renderWithHooks (react-dom.js:1234:10)`,
      solution: 'Move hook calls to the top level of your function component'
    },
    boundary: {
      title: 'Error Boundary Caught',
      code: 'REACT_BOUNDARY_003',
      message: 'Component crashed but was caught by error boundary',
      stack: `Error: Cannot read property 'map' of undefined
  at UserList.render (UserList.jsx:25:18)
  at ErrorBoundary.componentDidCatch (ErrorBoundary.jsx:15:5)`,
      solution: 'Add null checks or default values for potentially undefined data'
    }
  };

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiAlertTriangle style={{ marginRight: '8px' }} />
        Enhanced Error Reporting
      </Title>
      <Paragraph>
        React 19 provides better error boundaries, detailed error codes, and improved stack traces for easier debugging.
      </Paragraph>

      <Row gutter={16}>
        <Col span={12}>
          <Card size="small" title="Error Examples">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button 
                danger 
                onClick={() => triggerError('syntax')}
                icon={<FiXCircle />}
              >
                Trigger Syntax Error
              </Button>
              <Button 
                danger 
                onClick={() => triggerError('hook')}
                icon={<FiXCircle />}
              >
                Trigger Hook Error
              </Button>
              <Button 
                danger 
                onClick={() => triggerError('boundary')}
                icon={<FiXCircle />}
              >
                Trigger Boundary Error
              </Button>
            </Space>

            {errorType && (
              <Alert
                message={errorExamples[errorType].title}
                description={
                  <div>
                    <Text strong>Error Code: </Text>
                    <Tag color="red">{errorExamples[errorType].code}</Tag>
                    <br />
                    <Text strong>Message: </Text>
                    <Text>{errorExamples[errorType].message}</Text>
                    <br />
                    <Text strong>Solution: </Text>
                    <Text type="success">{errorExamples[errorType].solution}</Text>
                  </div>
                }
                type="error"
                showIcon
                style={{ marginTop: '16px' }}
              />
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" title="Stack Trace Example">
            {errorType ? (
              <pre style={{ 
                fontSize: '11px', 
                background: '#fff2f0', 
                padding: '8px', 
                borderRadius: '4px',
                border: '1px solid #ffccc7',
                overflow: 'auto'
              }}>
                {errorExamples[errorType].stack}
              </pre>
            ) : (
              <pre style={{ 
                fontSize: '11px', 
                background: '#f5f5f5', 
                padding: '8px', 
                borderRadius: '4px',
                overflow: 'auto'
              }}>
{`// Enhanced Error Boundary in React 19
class ErrorBoundary extends Component {
  static getDerivedStateFromError(error) {
    // Update state with error details
    return {
      hasError: true,
      errorCode: error.code,
      errorStack: error.stack
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log with enhanced error information
    console.error('Error Code:', error.code);
    console.error('Component Stack:', errorInfo);
    
    // Send to error tracking service
    trackError({
      code: error.code,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo
    });
  }
}`}
              </pre>
            )}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

// Form Actions Demo
const FormActionsDemo = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formResult, setFormResult] = useState(null);

  async function handleFormAction(formData) {
    setSubmitting(true);
    setFormResult(null);
    
    // Simulate async submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };
    
    setFormResult({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
    setSubmitting(false);
    message.success('Form submitted successfully!');
  }

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiFileText style={{ marginRight: '8px' }} />
        Form Actions - Streamlined Async Submissions
      </Title>
      <Paragraph>
        React 19's form actions simplify async form submissions with built-in loading states and error handling.
      </Paragraph>

      <Row gutter={16}>
        <Col span={12}>
          <Card size="small" title="Form with Actions">
            <form action={handleFormAction}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Input name="name" placeholder="Your Name" disabled={submitting} />
                <Input name="email" type="email" placeholder="Your Email" disabled={submitting} />
                <Input.TextArea name="message" placeholder="Your Message" rows={3} disabled={submitting} />
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={submitting}
                  block
                >
                  {submitting ? 'Submitting...' : 'Submit Form'}
                </Button>
              </Space>
            </form>

            {formResult && (
              <Alert
                message="Form Submitted"
                description={
                  <div>
                    <Text strong>Data: </Text>
                    <pre style={{ fontSize: '11px' }}>
                      {JSON.stringify(formResult.data, null, 2)}
                    </pre>
                  </div>
                }
                type="success"
                showIcon
                style={{ marginTop: '16px' }}
              />
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" title="Code Example">
            <pre style={{ fontSize: '12px', background: '#f5f5f5', padding: '8px', borderRadius: '4px', overflow: 'auto' }}>
{`// React 19 Form Actions
function ContactForm() {
  async function submitForm(formData) {
    'use server'; // Server Action
    
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Direct database operation
    await db.messages.create({
      email,
      message,
      timestamp: new Date()
    });
    
    // Return response
    return { success: true };
  }
  
  return (
    <form action={submitForm}>
      <input name="email" type="email" />
      <textarea name="message" />
      <button type="submit">Send</button>
    </form>
  );
}

// Client-side form action
async function clientAction(formData) {
  const response = await fetch('/api/submit', {
    method: 'POST',
    body: formData
  });
  return response.json();
}`}
            </pre>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

// Async Script & Stylesheet Support Demo
const AsyncResourcesDemo = () => {
  const [resourcesLoaded, setResourcesLoaded] = useState({
    criticalCSS: true,
    themeCSS: false,
    vendorJS: false,
    analyticsJS: false,
    fontsCSS: false
  });

  const [loadingProgress, setLoadingProgress] = useState(0);

  const loadResource = (resource) => {
    setResourcesLoaded(prev => ({ ...prev, [resource]: 'loading' }));
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setLoadingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setResourcesLoaded(prev => ({ ...prev, [resource]: true }));
        setLoadingProgress(0);
        message.success(`${resource} loaded successfully!`);
      }
    }, 300);
  };

  return (
    <Card style={{ marginBottom: '24px' }}>
      <Title level={4}>
        <FiDownload style={{ marginRight: '8px' }} />
        Async Script & Stylesheet Support
      </Title>
      <Paragraph>
        React 19 provides native support for async loading of scripts and stylesheets, improving initial page load performance.
      </Paragraph>

      <Row gutter={16}>
        <Col span={12}>
          <Card size="small" title="Resource Loading Dashboard">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Timeline>
                {Object.entries(resourcesLoaded).map(([resource, status]) => (
                  <Timeline.Item 
                    key={resource}
                    color={status === true ? 'green' : status === 'loading' ? 'blue' : 'gray'}
                    dot={status === 'loading' ? <FiDownload className="spinning-icon" /> : null}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong>{resource.replace(/([A-Z])/g, ' $1').trim()}</Text>
                      {status === true ? (
                        <Tag color="success">Loaded</Tag>
                      ) : status === 'loading' ? (
                        <Progress percent={loadingProgress} size="small" style={{ width: '100px' }} />
                      ) : (
                        <Button size="small" onClick={() => loadResource(resource)}>Load</Button>
                      )}
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>

              <Alert
                message="Performance Benefits"
                description="Async loading reduces blocking time by up to 40% on initial page load"
                type="success"
                showIcon
              />
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" title="Implementation Example">
            <Tabs
              items={[
                {
                  key: 'html',
                  label: 'HTML',
                  children: (
                    <pre style={{ fontSize: '11px', background: '#f5f5f5', padding: '8px', borderRadius: '4px', overflow: 'auto' }}>
{`<!-- React 19 Async Resources -->
<!DOCTYPE html>
<html>
<head>
  <!-- Critical CSS loaded synchronously -->
  <link rel="stylesheet" href="/critical.css">
  
  <!-- Non-critical CSS loaded async -->
  <link rel="stylesheet" href="/theme.css" 
        media="print" 
        onload="this.media='all'">
  
  <!-- Async scripts with loading priority -->
  <script async src="/vendor.js"></script>
  <script defer src="/app.js"></script>
  
  <!-- Resource hints -->
  <link rel="preconnect" href="https://api.example.com">
  <link rel="dns-prefetch" href="https://cdn.example.com">
</head>
</html>`}
                    </pre>
                  )
                },
                {
                  key: 'react',
                  label: 'React',
                  children: (
                    <pre style={{ fontSize: '11px', background: '#f5f5f5', padding: '8px', borderRadius: '4px', overflow: 'auto' }}>
{`// React 19 Resource Loading
import { preload, preinit } from 'react-dom';

function App() {
  // Preload resources
  useEffect(() => {
    preload('/fonts/main.woff2', {
      as: 'font',
      crossOrigin: 'anonymous'
    });
    
    preinit('/styles/theme.css', {
      as: 'style',
      precedence: 'high'
    });
  }, []);
  
  return (
    <>
      {/* Async script loading */}
      <Script 
        src="/analytics.js"
        strategy="afterInteractive"
        onLoad={() => console.log('Analytics loaded')}
      />
      
      {/* Lazy-loaded stylesheets */}
      <link
        rel="stylesheet"
        href="/animations.css"
        media="(prefers-reduced-motion: no-preference)"
      />
    </>
  );
}`}
                    </pre>
                  )
                }
              ]}
            />
          </Card>
        </Col>
      </Row>

      <style>{`
        .spinning-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Card>
  );
};

// Performance Metrics
const PerformanceMetrics = () => {
  return (
    <Card style={{ marginBottom: '24px', background: '#f0f9ff' }}>
      <Title level={4}>
        <FiZap style={{ marginRight: '8px' }} />
        Performance Impact of React 19 Enhancements
      </Title>
      
      <Row gutter={16}>
        <Col span={6}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Progress type="circle" percent={45} strokeColor="#52c41a" />
            <Divider />
            <Text strong>Script Loading</Text>
            <br />
            <Text type="secondary">45% faster with async</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Progress type="circle" percent={60} strokeColor="#1890ff" />
            <Divider />
            <Text strong>Error Recovery</Text>
            <br />
            <Text type="secondary">60% better debugging</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Progress type="circle" percent={35} strokeColor="#722ed1" />
            <Divider />
            <Text strong>Form Handling</Text>
            <br />
            <Text type="secondary">35% less boilerplate</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Progress type="circle" percent={50} strokeColor="#fa8c16" />
            <Divider />
            <Text strong>Resource Loading</Text>
            <br />
            <Text type="secondary">50% faster TTI</Text>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

const React19EnhancementsDemo = () => {
  return (
    <div>
      <Title level={2}>
        <FiSettings style={{ marginRight: '8px' }} />
        React 19 Enhancements
      </Title>
      
      <Alert
        message="Comprehensive Enhancements in React 19"
        description="React 19 brings significant improvements in third-party script compatibility, resource preloading, Web Components support, error reporting, form handling, and async resource loading. These enhancements provide better performance, developer experience, and overall application reliability."
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <ScriptCompatibilityDemo />
      <CustomElementsDemo />
      <ErrorReportingDemo />
      <FormActionsDemo />
      <AsyncResourcesDemo />
      <PerformanceMetrics />

      <Card style={{ background: '#f5f5f5' }}>
        <Title level={4}>Summary of Enhancements</Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Collapse>
              <Panel header="Third-Party Script Compatibility" key="1">
                <ul>
                  <li>Better integration with analytics scripts</li>
                  <li>Improved loading strategies for external libraries</li>
                  <li>Resource hints and preloading support</li>
                  <li>Non-blocking script execution</li>
                </ul>
              </Panel>
              <Panel header="Custom Elements Support" key="2">
                <ul>
                  <li>Seamless Web Components integration</li>
                  <li>Props passing to custom elements</li>
                  <li>Event handling from Web Components</li>
                  <li>Shadow DOM support</li>
                </ul>
              </Panel>
              <Panel header="Error Reporting" key="3">
                <ul>
                  <li>Detailed error codes for common issues</li>
                  <li>Enhanced stack traces with component info</li>
                  <li>Better error boundary capabilities</li>
                  <li>Development-time error overlay improvements</li>
                </ul>
              </Panel>
            </Collapse>
          </Col>
          <Col span={12}>
            <Collapse>
              <Panel header="Form Actions" key="4">
                <ul>
                  <li>Built-in async form submission handling</li>
                  <li>Automatic loading state management</li>
                  <li>Server Actions integration</li>
                  <li>Progressive enhancement support</li>
                </ul>
              </Panel>
              <Panel header="Async Script & Stylesheet Support" key="5">
                <ul>
                  <li>Native async/defer script loading</li>
                  <li>Critical CSS extraction and loading</li>
                  <li>Resource prioritization strategies</li>
                  <li>Reduced render-blocking resources</li>
                </ul>
              </Panel>
              <Panel header="Resource Preloading" key="6">
                <ul>
                  <li>preload() and prefetch() APIs</li>
                  <li>Font and image preloading</li>
                  <li>DNS prefetching and preconnect</li>
                  <li>Module preloading for faster navigation</li>
                </ul>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default React19EnhancementsDemo;