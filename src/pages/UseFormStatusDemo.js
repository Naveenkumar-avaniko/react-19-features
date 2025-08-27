import React from 'react';
import { useFormStatus } from 'react-dom';
import { Card, Button, Input, Typography, Alert, Space, Form, Progress, Tag, Divider } from 'antd';
import { FiLoader, FiSend, FiCheck, FiUpload, FiUser, FiMail, FiPhone } from 'react-icons/fi';

const { Title, Paragraph, Text } = Typography;

// Submit button component that uses useFormStatus
const SubmitButton = ({ children, icon }) => {
  const { pending } = useFormStatus();
  
  return (
    <Button
      type="primary"
      htmlType="submit"
      loading={pending}
      icon={!pending ? icon : null}
      disabled={pending}
      size="large"
      style={{ width: '100%' }}
    >
      {pending ? 'Processing...' : children}
    </Button>
  );
};

// Form field component that uses useFormStatus
const FormField = ({ name, placeholder, icon, type = 'text' }) => {
  const { pending, data } = useFormStatus();
  
  return (
    <Input
      name={name}
      placeholder={placeholder}
      prefix={icon}
      disabled={pending}
      type={type}
      size="large"
    />
  );
};

// Status indicator component
const FormStatusIndicator = () => {
  const { pending, data, method, action } = useFormStatus();
  
  if (!pending) return null;
  
  return (
    <Alert
      message="Form is being submitted"
      description={
        <Space direction="vertical">
          <Text>Method: {method}</Text>
          <Text>Action: {action || 'Current page'}</Text>
          <Progress percent={60} status="active" />
        </Space>
      }
      type="info"
      showIcon
      icon={<FiLoader className="spinning-icon" />}
    />
  );
};

// Progress bar component
const ProgressIndicator = () => {
  const { pending } = useFormStatus();
  
  if (!pending) return null;
  
  return (
    <div style={{ marginTop: '16px' }}>
      <Progress 
        percent={75} 
        status="active" 
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
      />
      <Text type="secondary">Uploading your data...</Text>
    </div>
  );
};

// Field error display
const FieldStatus = ({ fieldName }) => {
  const { pending, data } = useFormStatus();
  
  return (
    <div style={{ marginTop: '4px', minHeight: '20px' }}>
      {pending && (
        <Text type="secondary" style={{ fontSize: '12px' }}>
          <FiLoader className="spinning-icon" style={{ marginRight: '4px' }} />
          Validating {fieldName}...
        </Text>
      )}
    </div>
  );
};

const UseFormStatusDemo = () => {
  // Simulated form actions
  async function handleContactForm(formData) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('Contact form submitted:', Object.fromEntries(formData));
  }
  
  async function handleUploadForm(formData) {
    await new Promise(resolve => setTimeout(resolve, 4000));
    console.log('Upload form submitted:', Object.fromEntries(formData));
  }
  
  async function handleRegistrationForm(formData) {
    await new Promise(resolve => setTimeout(resolve, 2500));
    console.log('Registration form submitted:', Object.fromEntries(formData));
  }

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
        <FiLoader style={{ marginRight: '8px' }} />
        useFormStatus Hook Demo
      </Title>
      
      <Alert
        message="About useFormStatus"
        description="The useFormStatus hook provides information about the last form submission. It must be called from a component that's rendered inside a form. It returns pending state, form data, method, and action."
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Key Features:</Title>
        <ul>
          <li>Access form submission state from any child component</li>
          <li>No prop drilling required</li>
          <li>Get pending state, data, method, and action</li>
          <li>Perfect for building reusable form components</li>
          <li>Works seamlessly with form actions</li>
        </ul>
      </Card>

      {/* Contact Form */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>
          <FiMail style={{ marginRight: '8px' }} />
          Contact Form with Status Components
        </Title>
        <Paragraph>
          This form uses multiple components that independently access form status.
          Notice how the button, fields, and status indicator all react to the submission state.
        </Paragraph>
        
        <form action={handleContactForm}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <FormField
              name="name"
              placeholder="Your Name"
              icon={<FiUser />}
            />
            <FieldStatus fieldName="name" />
            
            <FormField
              name="email"
              placeholder="Your Email"
              icon={<FiMail />}
              type="email"
            />
            <FieldStatus fieldName="email" />
            
            <FormField
              name="phone"
              placeholder="Your Phone"
              icon={<FiPhone />}
              type="tel"
            />
            <FieldStatus fieldName="phone" />
            
            <FormStatusIndicator />
            <SubmitButton icon={<FiSend />}>
              Send Message
            </SubmitButton>
          </Space>
        </form>
      </Card>

      {/* Upload Form */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>
          <FiUpload style={{ marginRight: '8px' }} />
          File Upload with Progress
        </Title>
        <Paragraph>
          This form shows a progress bar during submission using useFormStatus.
        </Paragraph>
        
        <form action={handleUploadForm}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              name="file"
              type="file"
              size="large"
            />
            <Input
              name="description"
              placeholder="File description"
              size="large"
            />
            <SubmitButton icon={<FiUpload />}>
              Upload File
            </SubmitButton>
            <ProgressIndicator />
          </Space>
        </form>
      </Card>

      {/* Registration Form */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Multi-Step Registration</Title>
        <Paragraph>
          Complex form with multiple fields showing different status indicators.
        </Paragraph>
        
        <form action={handleRegistrationForm}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>Personal Information</Text>
              <Divider style={{ margin: '8px 0' }} />
              <Space direction="vertical" style={{ width: '100%' }}>
                <FormField name="firstName" placeholder="First Name" icon={<FiUser />} />
                <FormField name="lastName" placeholder="Last Name" icon={<FiUser />} />
              </Space>
            </div>
            
            <div>
              <Text strong>Contact Details</Text>
              <Divider style={{ margin: '8px 0' }} />
              <Space direction="vertical" style={{ width: '100%' }}>
                <FormField name="email" placeholder="Email Address" icon={<FiMail />} type="email" />
                <FormField name="phone" placeholder="Phone Number" icon={<FiPhone />} type="tel" />
              </Space>
            </div>
            
            <div>
              <Text strong>Security</Text>
              <Divider style={{ margin: '8px 0' }} />
              <Space direction="vertical" style={{ width: '100%' }}>
                <FormField name="password" placeholder="Password" type="password" icon={<FiUser />} />
                <FormField name="confirmPassword" placeholder="Confirm Password" type="password" icon={<FiUser />} />
              </Space>
            </div>
            
            <FormStatusIndicator />
            <SubmitButton icon={<FiCheck />}>
              Complete Registration
            </SubmitButton>
          </Space>
        </form>
      </Card>

      {/* Code Example */}
      <Card style={{ background: '#f5f5f5' }}>
        <Title level={4}>Code Example</Title>
        <pre style={{ background: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
          {`// Submit button that uses useFormStatus
function SubmitButton({ children }) {
  const { pending } = useFormStatus();
  
  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : children}
    </button>
  );
}

// Form field with status
function FormField({ name, placeholder }) {
  const { pending, data } = useFormStatus();
  
  return (
    <input
      name={name}
      placeholder={placeholder}
      disabled={pending}
    />
  );
}

// Parent form component
function ContactForm() {
  async function handleSubmit(formData) {
    // Process form data
    await submitToAPI(formData);
  }
  
  return (
    <form action={handleSubmit}>
      <FormField name="email" placeholder="Email" />
      <FormField name="message" placeholder="Message" />
      <SubmitButton>Send</SubmitButton>
    </form>
  );
}

// Note: useFormStatus must be called from
// components inside the form, not the form itself`}
        </pre>
      </Card>
    </div>
  );
};

export default UseFormStatusDemo;