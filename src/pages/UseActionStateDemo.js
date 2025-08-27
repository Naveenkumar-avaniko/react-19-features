import React, { useState } from 'react';
import { useActionState } from 'react';
import { Card, Button, Input, Typography, Alert, Space, Form, Tag, Divider, Progress, Badge, Row, Col, Select, Switch } from 'antd';
import { FiActivity, FiSend, FiCheck, FiX, FiLoader, FiUser, FiMail, FiShoppingCart, FiCreditCard, FiPackage } from 'react-icons/fi';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

// Simulated async actions
async function submitContactForm(previousState, formData) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const email = formData.get('email');
  const message = formData.get('message');
  
  if (!email || !email.includes('@')) {
    return { 
      error: 'Please enter a valid email address', 
      success: false,
      timestamp: Date.now()
    };
  }
  
  if (!message || message.length < 10) {
    return { 
      error: 'Message must be at least 10 characters long', 
      success: false,
      timestamp: Date.now()
    };
  }
  
  return { 
    success: true, 
    message: `Message sent successfully to ${email}`,
    timestamp: Date.now(),
    data: { email, message }
  };
}

async function updateUserProfile(previousState, formData) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const username = formData.get('username');
  const bio = formData.get('bio');
  
  if (!username || username.length < 3) {
    return {
      error: 'Username must be at least 3 characters',
      field: 'username'
    };
  }
  
  return {
    success: true,
    updatedFields: { username, bio },
    message: 'Profile updated successfully'
  };
}

async function processPayment(previousState, formData) {
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const amount = formData.get('amount');
  const cardNumber = formData.get('cardNumber');
  
  // Simulate random payment processing
  const isSuccess = Math.random() > 0.3;
  
  if (!isSuccess) {
    return {
      error: 'Payment failed. Please try again.',
      attemptCount: (previousState?.attemptCount || 0) + 1
    };
  }
  
  return {
    success: true,
    transactionId: `TXN${Date.now()}`,
    amount: amount,
    message: 'Payment processed successfully'
  };
}

async function addToCart(previousState, formData) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const productId = formData.get('productId');
  const quantity = formData.get('quantity');
  
  const newItem = {
    id: Date.now(),
    productId,
    quantity: parseInt(quantity),
    addedAt: new Date().toISOString()
  };
  
  return {
    items: [...(previousState?.items || []), newItem],
    totalItems: (previousState?.totalItems || 0) + parseInt(quantity),
    lastAdded: newItem
  };
}

const UseActionStateDemo = () => {
  // Contact form with useActionState
  const [contactState, contactAction, contactPending] = useActionState(
    submitContactForm,
    { success: false }
  );
  
  // Profile update with useActionState
  const [profileState, profileAction, profilePending] = useActionState(
    updateUserProfile,
    { success: false }
  );
  
  // Payment processing with useActionState
  const [paymentState, paymentAction, paymentPending] = useActionState(
    processPayment,
    { attemptCount: 0 }
  );
  
  // Shopping cart with useActionState
  const [cartState, cartAction, cartPending] = useActionState(
    addToCart,
    { items: [], totalItems: 0 }
  );
  
  const products = [
    { id: '1', name: 'React 19 Course', price: 49 },
    { id: '2', name: 'TypeScript Guide', price: 39 },
    { id: '3', name: 'Performance Workshop', price: 99 }
  ];

  return (
    <div>
      <style>{`
        .spinning-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      <Title level={2}>
        <FiActivity style={{ marginRight: '8px' }} />
        useActionState Hook Demo
      </Title>
      
      <Alert
        message="About useActionState"
        description="The useActionState hook manages state for async actions. It returns the current state, an action function to trigger updates, and a pending status. Perfect for forms and async operations that need state management."
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Key Features:</Title>
        <ul>
          <li>Integrates state management with async actions</li>
          <li>Automatic pending state handling</li>
          <li>Previous state access in action functions</li>
          <li>Perfect for form submissions and data mutations</li>
          <li>Built-in error and success state management</li>
        </ul>
      </Card>

      {/* Contact Form Example */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>
          <FiMail style={{ marginRight: '8px' }} />
          Contact Form with Validation
        </Title>
        <Paragraph>
          This form uses useActionState to handle submission state and validation errors.
        </Paragraph>
        
        <form action={contactAction}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              name="email"
              placeholder="Your email address"
              prefix={<FiMail />}
              size="large"
              disabled={contactPending}
              status={contactState.error && !contactState.success ? 'error' : ''}
            />
            
            <Input.TextArea
              name="message"
              placeholder="Your message (min 10 characters)"
              rows={4}
              disabled={contactPending}
              status={contactState.error && !contactState.success ? 'error' : ''}
            />
            
            {contactState.error && (
              <Alert
                message="Validation Error"
                description={contactState.error}
                type="error"
                showIcon
                icon={<FiX />}
              />
            )}
            
            {contactState.success && (
              <Alert
                message="Success!"
                description={contactState.message}
                type="success"
                showIcon
                icon={<FiCheck />}
              />
            )}
            
            <Button
              type="primary"
              htmlType="submit"
              loading={contactPending}
              icon={!contactPending && <FiSend />}
              size="large"
              style={{ width: '100%' }}
            >
              {contactPending ? 'Sending...' : 'Send Message'}
            </Button>
          </Space>
        </form>
      </Card>

      {/* Profile Update Example */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>
          <FiUser style={{ marginRight: '8px' }} />
          Profile Update Form
        </Title>
        <Paragraph>
          Update profile information with field-specific error handling.
        </Paragraph>
        
        <form action={profileAction}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              name="username"
              placeholder="Username (min 3 characters)"
              prefix={<FiUser />}
              size="large"
              disabled={profilePending}
              status={profileState.field === 'username' ? 'error' : ''}
            />
            {profileState.field === 'username' && (
              <Text type="danger" style={{ fontSize: '12px' }}>
                {profileState.error}
              </Text>
            )}
            
            <Input.TextArea
              name="bio"
              placeholder="Bio (optional)"
              rows={3}
              disabled={profilePending}
            />
            
            {profileState.success && (
              <Alert
                message="Profile Updated"
                description={profileState.message}
                type="success"
                showIcon
              />
            )}
            
            <Button
              type="primary"
              htmlType="submit"
              loading={profilePending}
              size="large"
            >
              {profilePending ? 'Updating...' : 'Update Profile'}
            </Button>
          </Space>
        </form>
      </Card>

      {/* Payment Processing Example */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>
          <FiCreditCard style={{ marginRight: '8px' }} />
          Payment Processing with Retry
        </Title>
        <Paragraph>
          Simulated payment processing with retry counter (70% success rate).
        </Paragraph>
        
        <form action={paymentAction}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              name="cardNumber"
              placeholder="Card Number"
              prefix={<FiCreditCard />}
              size="large"
              disabled={paymentPending}
            />
            
            <Input
              name="amount"
              placeholder="Amount"
              prefix="$"
              type="number"
              size="large"
              disabled={paymentPending}
            />
            
            {paymentState.attemptCount > 0 && !paymentState.success && (
              <Badge count={`Attempt ${paymentState.attemptCount}`} style={{ backgroundColor: '#ff4d4f' }}>
                <Alert
                  message="Payment Failed"
                  description={paymentState.error}
                  type="error"
                  showIcon
                  style={{ width: '100%' }}
                />
              </Badge>
            )}
            
            {paymentState.success && (
              <Alert
                message="Payment Successful!"
                description={`Transaction ID: ${paymentState.transactionId}`}
                type="success"
                showIcon
              />
            )}
            
            <Button
              type="primary"
              htmlType="submit"
              loading={paymentPending}
              icon={!paymentPending && <FiCreditCard />}
              size="large"
              danger={paymentState.attemptCount > 2}
            >
              {paymentPending ? 'Processing Payment...' : 
               paymentState.attemptCount > 0 ? `Retry Payment (Attempt ${paymentState.attemptCount + 1})` : 
               'Process Payment'}
            </Button>
          </Space>
        </form>
      </Card>

      {/* Shopping Cart Example */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>
          <FiShoppingCart style={{ marginRight: '8px' }} />
          Shopping Cart with State Accumulation
        </Title>
        <Paragraph>
          Add items to cart with accumulated state management.
        </Paragraph>
        
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card size="small" title="Add Product">
              <form action={cartAction}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Select
                    name="productId"
                    placeholder="Select product"
                    style={{ width: '100%' }}
                    size="large"
                    disabled={cartPending}
                  >
                    {products.map(product => (
                      <Option key={product.id} value={product.id}>
                        {product.name} - ${product.price}
                      </Option>
                    ))}
                  </Select>
                  
                  <Input
                    name="quantity"
                    type="number"
                    placeholder="Quantity"
                    defaultValue="1"
                    min="1"
                    size="large"
                    disabled={cartPending}
                  />
                  
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={cartPending}
                    icon={!cartPending && <FiPackage />}
                    block
                  >
                    {cartPending ? 'Adding to Cart...' : 'Add to Cart'}
                  </Button>
                </Space>
              </form>
            </Card>
          </Col>
          
          <Col span={12}>
            <Card size="small" title={`Cart (${cartState.totalItems} items)`}>
              {cartState.items.length === 0 ? (
                <Text type="secondary">Cart is empty</Text>
              ) : (
                <Space direction="vertical" style={{ width: '100%' }}>
                  {cartState.items.map((item, index) => {
                    const product = products.find(p => p.id === item.productId);
                    return (
                      <div key={item.id}>
                        <Badge count={item.quantity}>
                          <Tag color="blue">
                            {product?.name || `Product ${item.productId}`}
                          </Tag>
                        </Badge>
                      </div>
                    );
                  })}
                  {cartState.lastAdded && (
                    <Alert
                      message="Just added"
                      description={`Added ${cartState.lastAdded.quantity} item(s)`}
                      type="success"
                      showIcon
                      closable
                    />
                  )}
                </Space>
              )}
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Code Example */}
      <Card style={{ background: '#f5f5f5' }}>
        <Title level={4}>Code Example</Title>
        <pre style={{ background: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
          {`// Using useActionState for form handling
import { useActionState } from 'react';

// Define async action
async function submitForm(previousState, formData) {
  const email = formData.get('email');
  
  // Validation
  if (!email.includes('@')) {
    return { 
      error: 'Invalid email', 
      success: false 
    };
  }
  
  // Process form
  await api.submitForm({ email });
  
  return { 
    success: true, 
    message: 'Form submitted!' 
  };
}

// Component using useActionState
function ContactForm() {
  const [state, action, pending] = useActionState(
    submitForm,
    { success: false } // Initial state
  );
  
  return (
    <form action={action}>
      <input 
        name="email" 
        disabled={pending}
      />
      
      {state.error && (
        <div className="error">{state.error}</div>
      )}
      
      {state.success && (
        <div className="success">{state.message}</div>
      )}
      
      <button type="submit" disabled={pending}>
        {pending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

// With state accumulation
const [cartState, addToCart] = useActionState(
  async (prevState, formData) => {
    const item = formData.get('item');
    return {
      items: [...prevState.items, item],
      total: prevState.total + 1
    };
  },
  { items: [], total: 0 }
);`}
        </pre>
      </Card>
    </div>
  );
};

export default UseActionStateDemo;