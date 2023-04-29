import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './input.css';
import App from './App.jsx';
import Test from './pages/Test.jsx';

import ReactDOM from "react-dom/client";
import { AudioRecorder } from 'react-audio-voice-recorder';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/test',
    element: <Test />,
  },

]);

root.render(
  <RouterProvider router={router} />

  );
