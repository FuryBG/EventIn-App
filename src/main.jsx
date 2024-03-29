import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import NavBarLayout from './layouts/NavBarLayout/NavBarLayout';
import AuthContextProvider from './context/AuthContext.jsx';
import ToastContextProvider from './context/ToastContext';
import { PrimeReactProvider } from 'primereact/api';
import { QueryClient, QueryClientProvider } from 'react-query';
import NotFound from './shared-components/NotFound/NotFound';
import ViewPoll from './features/ViewPoll/ViewPoll';
import ProtectedRoute from './guards/ProtectedRoute.jsx';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <ProtectedRoute authAccess={true}><NavBarLayout><Home /></NavBarLayout></ProtectedRoute>
      },
      {
        path: "/event",
        children: [
          {
            path: ":eguid",
            element: <ViewPoll></ViewPoll>
          }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <NotFound></NotFound>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <PrimeReactProvider>
    <AuthContextProvider>
      <ToastContextProvider>
        <img src='/src/assets/beta.png' style={{ position: "fixed", right: 0, height: "4rem", zIndex: 2 }}></img>
        <RouterProvider router={router}></RouterProvider>
      </ToastContextProvider>
    </AuthContextProvider>
    </PrimeReactProvider>
  </QueryClientProvider>

)
