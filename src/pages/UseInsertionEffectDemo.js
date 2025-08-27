import React from 'react';
import { Card, Typography, Alert } from 'antd';
import { FiCode } from 'react-icons/fi';

const { Title, Paragraph } = Typography;

const UseInsertionEffectDemo = () => {
  return (
    <div>
      <Title level={2}>
        <FiCode style={{ marginRight: '8px' }} />
        useInsertionEffect Hook Demo
      </Title>
      
      <Alert
        message="About useInsertionEffect"
        description="useInsertionEffect runs before DOM mutations, making it perfect for CSS-in-JS libraries to inject styles before the browser paints. It has the same signature as useEffect but fires earlier in the lifecycle."
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Key Use Cases:</Title>
        <ul>
          <li>CSS-in-JS libraries for style injection</li>
          <li>Critical CSS insertion before paint</li>
          <li>DOM measurements that affect styling</li>
          <li>Third-party library integration requiring early DOM access</li>
          <li>Performance-critical style operations</li>
        </ul>
      </Card>

      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Hook Execution Order</Title>
        <Paragraph>
          In React, hooks execute in this order during component lifecycle:
        </Paragraph>
        <div style={{ 
          background: '#f8f8f8', 
          padding: '16px', 
          borderRadius: '6px',
          fontFamily: 'monospace'
        }}>
          <div>1. 🟦 useInsertionEffect - Before DOM mutations</div>
          <div>2. 🟨 useLayoutEffect - After DOM mutations, before paint</div>
          <div>3. 🟩 useEffect - After paint</div>
        </div>
      </Card>

      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>When to Use useInsertionEffect</Title>
        <Paragraph>
          <strong>Use useInsertionEffect when:</strong>
        </Paragraph>
        <ul>
          <li>Building CSS-in-JS libraries that need to inject styles before paint</li>
          <li>You need to insert DOM nodes before useLayoutEffect runs</li>
          <li>Critical styles must be applied before any layout calculations</li>
        </ul>
        <Paragraph>
          <strong>Don't use useInsertionEffect for:</strong>
        </Paragraph>
        <ul>
          <li>Regular side effects (use useEffect instead)</li>
          <li>DOM measurements (use useLayoutEffect instead)</li>
          <li>Data fetching or event listeners</li>
        </ul>
      </Card>

      {/* Code Example */}
      <Card style={{ background: '#f5f5f5' }}>
        <Title level={4}>Code Example</Title>
        <pre style={{ background: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
          {`// CSS-in-JS library using useInsertionEffect
import { useInsertionEffect, useState } from 'react';

const useStyles = (styles) => {
  const [classNames, setClassNames] = useState({});

  useInsertionEffect(() => {
    // Create stylesheet if it doesn't exist
    let styleSheet = document.getElementById('css-in-js-styles');
    if (!styleSheet) {
      styleSheet = document.createElement('style');
      styleSheet.id = 'css-in-js-styles';
      document.head.appendChild(styleSheet);
    }

    const newClassNames = {};
    
    // Generate and inject CSS rules
    Object.keys(styles).forEach(key => {
      const className = \`generated-\${Date.now()}-\${key}\`;
      const cssRule = \`.\${className} { 
        \${Object.entries(styles[key])
          .map(([prop, value]) => \`\${prop}: \${value}\`)
          .join('; ')} 
      }\`;
      
      // Insert rule immediately before DOM mutations
      styleSheet.sheet.insertRule(cssRule);
      newClassNames[key] = className;
    });

    setClassNames(newClassNames);
  }, [JSON.stringify(styles)]);

  return classNames;
};

// Usage in component
const MyComponent = () => {
  const styles = useStyles({
    container: {
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333'
    }
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Styled with useInsertionEffect!
      </h1>
    </div>
  );
};

// Comparison with useEffect
const WithUseEffect = () => {
  const [styles, setStyles] = useState({});
  
  // ❌ This causes FOUC (Flash of Unstyled Content)
  useEffect(() => {
    // Styles applied AFTER paint - user sees unstyled content first
    setStyles({ color: 'red', fontSize: '20px' });
  }, []);
  
  return <div style={styles}>This might flash unstyled</div>;
};

const WithUseInsertionEffect = () => {
  const [className, setClassName] = useState('');
  
  // ✅ This prevents FOUC
  useInsertionEffect(() => {
    // Styles injected BEFORE paint - no flash
    const style = document.createElement('style');
    style.textContent = '.smooth { color: red; font-size: 20px; }';
    document.head.appendChild(style);
    setClassName('smooth');
  }, []);
  
  return <div className={className}>This renders smoothly</div>;
};`}
        </pre>
      </Card>

      <Card style={{ marginBottom: '24px', background: '#fff7e6', border: '1px solid #ffd591' }}>
        <Title level={4}>Performance Benefits</Title>
        <Paragraph>
          <strong>Without useInsertionEffect (using useEffect):</strong>
        </Paragraph>
        <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', marginBottom: '12px' }}>
          1. Component renders → 2. Browser paints → 3. useEffect runs → 4. Styles applied → 5. Re-paint (FOUC)
        </div>
        
        <Paragraph>
          <strong>With useInsertionEffect:</strong>
        </Paragraph>
        <div style={{ background: '#f0f9ff', padding: '12px', borderRadius: '4px' }}>
          1. useInsertionEffect runs → 2. Styles injected → 3. Component renders → 4. Browser paints once
        </div>
      </Card>
    </div>
  );
};

export default UseInsertionEffectDemo;