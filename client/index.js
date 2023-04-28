import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);

root.render(<RouterProvider router={router} />);
