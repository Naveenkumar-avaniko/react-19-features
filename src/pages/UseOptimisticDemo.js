import React, { useState, useOptimistic, startTransition } from 'react';
import { Card, Button, Typography, Alert, Space, List, Avatar, Tag, Input, Progress, Badge } from 'antd';
import { FiHeart, FiMessageCircle, FiSend, FiThumbsUp, FiStar } from 'react-icons/fi';

const { Title, Paragraph, Text } = Typography;

// Simulated API calls
const likePost = async (postId) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  // Randomly fail sometimes for demo
  if (Math.random() > 0.8) {
    throw new Error('Failed to like post');
  }
  return true;
};

const sendMessage = async (message) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  if (Math.random() > 0.9) {
    throw new Error('Failed to send message');
  }
  return { id: Date.now(), text: message, timestamp: new Date().toISOString() };
};

const addToCart = async (item) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

const UseOptimisticDemo = () => {
  // Posts with likes
  const [posts, setPosts] = useState([
    { id: 1, title: 'React 19 is Amazing!', likes: 42, liked: false, author: 'John Doe' },
    { id: 2, title: 'Building with useOptimistic', likes: 28, liked: false, author: 'Jane Smith' },
    { id: 3, title: 'Performance Optimization Tips', likes: 35, liked: false, author: 'Bob Wilson' },
  ]);
  
  const [optimisticPosts, setOptimisticPost] = useOptimistic(
    posts,
    (currentPosts, { postId, action }) => {
      return currentPosts.map(post => {
        if (post.id === postId) {
          if (action === 'like') {
            return { ...post, likes: post.likes + 1, liked: true };
          } else if (action === 'unlike') {
            return { ...post, likes: post.likes - 1, liked: false };
          }
        }
        return post;
      });
    }
  );

  // Messages
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to the chat!', timestamp: new Date(Date.now() - 60000).toISOString() },
  ]);
  
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (currentMessages, newMessage) => [...currentMessages, newMessage]
  );
  
  const [messageInput, setMessageInput] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  // Shopping cart
  const [cart, setCart] = useState([]);
  const [optimisticCart, addOptimisticItem] = useOptimistic(
    cart,
    (currentCart, newItem) => [...currentCart, newItem]
  );

  const handleLike = async (postId) => {
    const post = posts.find(p => p.id === postId);
    const action = post.liked ? 'unlike' : 'like';
    
    startTransition(() => {
      setOptimisticPost({ postId, action });
    });
    
    try {
      await likePost(postId);
      setPosts(current => 
        current.map(p => {
          if (p.id === postId) {
            if (action === 'like') {
              return { ...p, likes: p.likes + 1, liked: true };
            } else {
              return { ...p, likes: p.likes - 1, liked: false };
            }
          }
          return p;
        })
      );
    } catch (error) {
      // Revert on error - the optimistic update will be automatically reverted
      console.error('Failed to update like:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    const optimisticMessage = {
      id: `optimistic-${Date.now()}`,
      text: messageInput,
      timestamp: new Date().toISOString(),
      pending: true
    };
    
    setSendingMessage(true);
    startTransition(() => {
      addOptimisticMessage(optimisticMessage);
    });
    setMessageInput('');
    
    try {
      const result = await sendMessage(messageInput);
      setMessages(current => [...current, result]);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Message will disappear from optimistic view automatically
    } finally {
      setSendingMessage(false);
    }
  };

  const handleAddToCart = async (item) => {
    const optimisticItem = { ...item, id: `optimistic-${Date.now()}`, pending: true };
    startTransition(() => {
      addOptimisticItem(optimisticItem);
    });
    
    try {
      await addToCart(item);
      setCart(current => [...current, { ...item, id: Date.now() }]);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const products = [
    { name: 'React 19 Course', price: '$49', icon: <FiStar /> },
    { name: 'TypeScript Guide', price: '$39', icon: <FiThumbsUp /> },
    { name: 'Performance Workshop', price: '$99', icon: <FiMessageCircle /> },
  ];

  return (
    <div>
      <Title level={2}>
        <FiThumbsUp style={{ marginRight: '8px' }} />
        useOptimistic Hook Demo
      </Title>
      
      <Alert
        message="About useOptimistic"
        description="The useOptimistic hook allows you to optimistically update the UI while an async request is in progress. If the request fails, the UI automatically reverts to the previous state."
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Key Benefits:</Title>
        <ul>
          <li>Instant UI feedback for better user experience</li>
          <li>Automatic rollback on error</li>
          <li>Reduces perceived latency</li>
          <li>Works seamlessly with async operations</li>
        </ul>
      </Card>

      {/* Social Media Posts */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Social Media Feed - Like Posts</Title>
        <Paragraph>
          Click the heart icon to like posts. The UI updates immediately while the request processes.
          Sometimes the request will fail (20% chance) to demonstrate automatic rollback.
        </Paragraph>
        
        <List
          itemLayout="horizontal"
          dataSource={optimisticPosts}
          renderItem={post => (
            <List.Item
              actions={[
                <Button
                  type="text"
                  icon={<FiHeart fill={post.liked ? '#ff4d4f' : 'none'} />}
                  onClick={() => handleLike(post.id)}
                  style={{ color: post.liked ? '#ff4d4f' : undefined }}
                >
                  {post.likes}
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar>{post.author[0]}</Avatar>}
                title={post.title}
                description={`by ${post.author}`}
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Chat Messages */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Live Chat - Send Messages</Title>
        <Paragraph>
          Send messages with instant optimistic updates. Messages appear immediately while sending.
        </Paragraph>
        
        <div style={{ 
          height: '200px', 
          overflowY: 'auto', 
          border: '1px solid #f0f0f0', 
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          {optimisticMessages.map(msg => (
            <div key={msg.id} style={{ marginBottom: '12px' }}>
              <Space>
                {msg.pending && <Badge status="processing" />}
                <Text strong={!msg.pending} type={msg.pending ? 'secondary' : undefined}>
                  {msg.text}
                </Text>
              </Space>
              <br />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {new Date(msg.timestamp).toLocaleTimeString()}
                {msg.pending && ' • Sending...'}
              </Text>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSendMessage}>
          <Space.Compact style={{ width: '100%' }}>
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message..."
              disabled={sendingMessage}
            />
            <Button
              type="primary"
              htmlType="submit"
              icon={<FiSend />}
              loading={sendingMessage}
            >
              Send
            </Button>
          </Space.Compact>
        </form>
      </Card>

      {/* Shopping Cart */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4}>Shopping Cart - Add Items</Title>
        <Paragraph>
          Add items to cart with optimistic updates. Items appear instantly in the cart.
        </Paragraph>
        
        <Space wrap style={{ marginBottom: '16px' }}>
          {products.map((product, index) => (
            <Card key={index} size="small">
              <Space direction="vertical" align="center">
                <div style={{ fontSize: '32px', color: '#1890ff' }}>
                  {product.icon}
                </div>
                <Text strong>{product.name}</Text>
                <Tag color="green">{product.price}</Tag>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </Space>
            </Card>
          ))}
        </Space>
        
        <div>
          <Text strong>Cart Items ({optimisticCart.length})</Text>
          {optimisticCart.length > 0 && (
            <List
              size="small"
              dataSource={optimisticCart}
              renderItem={item => (
                <List.Item>
                  <Space>
                    {item.pending && <Badge status="processing" />}
                    <Text type={item.pending ? 'secondary' : undefined}>
                      {item.name} - {item.price}
                    </Text>
                    {item.pending && <Tag color="blue">Adding...</Tag>}
                  </Space>
                </List.Item>
              )}
            />
          )}
        </div>
      </Card>

      {/* Code Example */}
      <Card style={{ background: '#f5f5f5' }}>
        <Title level={4}>Code Example</Title>
        <pre style={{ background: '#fff', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
          {`// Using useOptimistic for likes
function PostList() {
  const [posts, setPosts] = useState(initialPosts);
  
  const [optimisticPosts, setOptimisticPost] = useOptimistic(
    posts,
    (currentPosts, { postId, action }) => {
      return currentPosts.map(post => {
        if (post.id === postId && action === 'like') {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      });
    }
  );

  const handleLike = async (postId) => {
    // Optimistically update UI
    setOptimisticPost({ postId, action: 'like' });
    
    try {
      // Make API call
      await likePost(postId);
      // Update actual state on success
      setPosts(/* updated posts */);
    } catch (error) {
      // UI automatically reverts on error
    }
  };
}`}
        </pre>
      </Card>
    </div>
  );
};

export default UseOptimisticDemo;