import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Layout from './components/Layout';
import Home from './pages/Home';
import AutomaticBatchingDemo from './pages/AutomaticBatchingDemo';
import SSRAdvancementsDemo from './pages/SSRAdvancementsDemo';
import UseOptimisticDemo from './pages/UseOptimisticDemo';
import UseFormStatusDemo from './pages/UseFormStatusDemo';
import UseActionStateDemo from './pages/UseActionStateDemo';
import UseHookDemo from './pages/UseHookDemo';
import TransitionsDemo from './pages/TransitionsDemo';
import React19EnhancementsDemo from './pages/React19EnhancementsDemo';
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="automatic-batching" element={<AutomaticBatchingDemo />} />
            <Route path="ssr-advancements" element={<SSRAdvancementsDemo />} />
            <Route path="use-optimistic" element={<UseOptimisticDemo />} />
            <Route path="use-form-status" element={<UseFormStatusDemo />} />
            <Route path="use-action-state" element={<UseActionStateDemo />} />
            <Route path="use-hook" element={<UseHookDemo />} />
            <Route path="use-deferred-value" element={<TransitionsDemo />} />
            <Route path="react-19-enhancements" element={<React19EnhancementsDemo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;