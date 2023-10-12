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
import GlobalLoader from './shared-components/GlobalLoader/GlobalLoader';
import NotFound from './shared-components/NotFound/NotFound';

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
            element: <Suspense fallback={<GlobalLoader></GlobalLoader>}><Login /></Suspense>
          },
          {
            path: "register",
            element: <Suspense fallback={<GlobalLoader></GlobalLoader>}><Register /></Suspense>
          }
        ]
      },
      {
        path: "/event",
        children: [
          {
            path: ":id",
            element: <h1>T</h1>
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
        <RouterProvider router={router}></RouterProvider>
      </ToastContextProvider>
    </AuthContextProvider>
    </PrimeReactProvider>
  </QueryClientProvider>

)
