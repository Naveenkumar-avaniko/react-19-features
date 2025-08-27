import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { Card, Button, Form, Input, Typography, Alert, Space, Tag, List, Spin, message } from 'antd';
import { FiSend, FiCheck, FiX, FiClock } from 'react-icons/fi';

const { Title, Paragraph, Text } = Typography;

// Simulated server action
async function submitFormAction(previousState, formData) {
  // Simulate server processing
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Simulate validation
  if (!name || name.length < 2) {
    return {
      status: 'error',
      message: 'Name must be at least 2 characters',
      timestamp: new Date().toISOString()
    };
  }
  
  if (!email || !email.includes('@')) {
    return {
      status: 'error',
      message: 'Please enter a valid email',
      timestamp: new Date().toISOString()
    };
  }
  
  // Success case
  return {
    status: 'success',
    message: `Form submitted successfully for ${name}!`,
    data: { name, email, message },
    timestamp: new Date().toISOString()
  };
}

// Todo list action
async function addTodoAction(previousState, formData) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const todoText = formData.get('todo');
  
  if (!todoText || todoText.trim() === '') {
    return {
      ...previousState,
      error: 'Please enter a todo item'
    };
  }
  
  const newTodo = {
    id: Date.now(),
    text: todoText,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  return {
    todos: [...(previousState.todos || []), newTodo],
    error: null
  };
}

const ActionsDemo = () => {
  // Form action state
  const [formState, formAction, isFormPending] = useFormState(
    submitFormAction,
    { status: null, message: null }
  );
  
  // Todo action state  
  const [todoState, todoAction, isTodoPending] = useFormState(
    addTodoAction,
    { todos: [], error: null }
  );
  
  const [showCode, setShowCode] = useState(false);

  const toggleTodo = (id) => {
    // This would typically be another action
    // For demo purposes, we'll keep it simple
  };

  return (
    <div>
      <Title level={2}>
        <FiSend style={{ marginRight: '8px' }} />
        Actions Demo
      </Title>
      
      <Alert
        message="About React 19 Actions"
        description="Actions are async functions that handle form submissions and data mutations. They integrate with transitions, provide pending states, and enable optimistic updates."
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Key Features:</Title>
        <ul>
          <li>Async form handling with automatic pending states</li>
          <li>Server and client actions support</li>
          <li>Built-in error handling and state management</li>
          <li>Integration with useFormState hook</li>
          <li>Automatic form reset on success</li>
        </ul>
      </Card>

      {/* Form with Actions */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Contact Form with Actions</Title>
        <Paragraph>
          Submit the form below to see how Actions handle async operations, 
          validation, and state management automatically.
        </Paragraph>
        
        <form action={formAction}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              name="name"
              placeholder="Your Name"
              size="large"
              disabled={isFormPending}
            />
            <Input
              name="email"
              placeholder="Your Email"
              size="large"
              disabled={isFormPending}
            />
            <Input.TextArea
              name="message"
              placeholder="Your Message"
              rows={4}
              disabled={isFormPending}
            />
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isFormPending}
              icon={<FiSend />}
            >
              {isFormPending ? 'Submitting...' : 'Submit Form'}
            </Button>
          </Space>
        </form>
        
        {formState.status && (
          <Alert
            message={formState.message}
            type={formState.status}
            showIcon
            style={{ marginTop: '16px' }}
            icon={formState.status === 'success' ? <FiCheck /> : <FiX />}
          />
        )}
        
        {formState.data && (
          <Card style={{ marginTop: '16px', background: '#f0f9ff' }}>
            <Text strong>Submitted Data:</Text>
            <pre>{JSON.stringify(formState.data, null, 2)}</pre>
            <Text type="secondary">
              <FiClock /> {new Date(formState.timestamp).toLocaleTimeString()}
            </Text>
          </Card>
        )}
      </Card>

      {/* Todo List with Actions */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Todo List with Actions</Title>
        <Paragraph>
          Add todos using Actions to handle async state updates.
        </Paragraph>
        
        <form action={todoAction} style={{ marginBottom: '16px' }}>
          <Space.Compact style={{ width: '100%' }}>
            <Input
              name="todo"
              placeholder="Enter a new todo..."
              size="large"
              disabled={isTodoPending}
            />
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isTodoPending}
            >
              Add Todo
            </Button>
          </Space.Compact>
        </form>
        
        {todoState.error && (
          <Alert
            message={todoState.error}
            type="error"
            showIcon
            style={{ marginBottom: '16px' }}
          />
        )}
        
        {todoState.todos && todoState.todos.length > 0 ? (
          <List
            dataSource={todoState.todos}
            renderItem={item => (
              <List.Item>
                <Space>
                  <Tag color={item.completed ? 'green' : 'blue'}>
                    {item.completed ? <FiCheck /> : <FiClock />}
                  </Tag>
                  <Text delete={item.completed}>{item.text}</Text>
                </Space>
              </List.Item>
            )}
          />
        ) : (
          <Text type="secondary">No todos yet. Add one above!</Text>
        )}
      </Card>

      {/* Code Example */}
      <Card style={{ background: '#f5f5f5' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Title level={4}>Code Example</Title>
          <Button onClick={() => setShowCode(!showCode)}>
            {showCode ? 'Hide' : 'Show'} Code
          </Button>
        </Space>
        
        {showCode && (
          <pre style={{ background: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto', marginTop: '16px' }}>
            {`// Define an action
async function submitForm(previousState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  // Perform async operations
  const result = await saveToDatabase({ name, email });
  
  return {
    status: 'success',
    message: 'Form submitted!',
    data: result
  };
}

// Use with useFormState
function ContactForm() {
  const [state, action, isPending] = useFormState(
    submitForm,
    { status: null }
  );
  
  return (
    <form action={action}>
      <input name="name" />
      <input name="email" />
      <button disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`}
          </pre>
        )}
      </Card>
    </div>
  );
};

export default ActionsDemo;