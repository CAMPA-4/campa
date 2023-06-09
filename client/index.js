import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './input.css';

import App from './App.jsx';
import Test from './pages/Test.jsx';
import ChatDash from './pages/ChatDash.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/test',
    element: <Test />,
  },
  {
    path: '/chat',
    element: <ChatDash />,
  },
  { path: '/login', element: <Login /> },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

root.render(<RouterProvider router={router} />);
