import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './input.css';
import App from './App.jsx';
import ChatDash from './pages/ChatDash.jsx';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/chat',
    element: <ChatDash />,
  },

]);

root.render(<RouterProvider router={router} />);
