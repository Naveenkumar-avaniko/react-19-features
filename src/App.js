import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Layout from './components/Layout';
import Home from './pages/Home';
import TransitionsDemo from './pages/TransitionsDemo';
import UseSyncExternalStoreDemo from './pages/UseSyncExternalStoreDemo';
import UseInsertionEffectDemo from './pages/UseInsertionEffectDemo';
import UseIdDemo from './pages/UseIdDemo';
import AutomaticBatchingDemo from './pages/AutomaticBatchingDemo';
import ConcurrentFeaturesDemo from './pages/ConcurrentFeaturesDemo';
import SSRAdvancementsDemo from './pages/SSRAdvancementsDemo';
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
            <Route path="transitions" element={<TransitionsDemo />} />
            <Route path="use-sync-external-store" element={<UseSyncExternalStoreDemo />} />
            <Route path="use-insertion-effect" element={<UseInsertionEffectDemo />} />
            <Route path="use-id" element={<UseIdDemo />} />
            <Route path="automatic-batching" element={<AutomaticBatchingDemo />} />
            <Route path="concurrent-features" element={<ConcurrentFeaturesDemo />} />
            <Route path="ssr-advancements" element={<SSRAdvancementsDemo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;