import React, { Suspense } from 'react'
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

const Login = React.lazy(() => import('./pages/Login/Login'))
const Register = React.lazy(() => import('./pages/Register/Register'))
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <NavBarLayout />,
        children: [
          {
            path: "/",
            element: <Home />
          }
        ]
      },
      {
        path: "/auth",
        children: [
          {
            path: "login",
            element: <Suspense fallback={<h1>test</h1>}><Login /></Suspense>
          },
          {
            path: "register",
            element: <Suspense fallback={<h1>test</h1>}><Register /></Suspense>
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <PrimeReactProvider>
    <AuthContextProvider>
      <ToastContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </ToastContextProvider>
    </AuthContextProvider>
    </PrimeReactProvider>
  </QueryClientProvider>

)
