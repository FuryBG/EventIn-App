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
import ViewPoll from './features/ViewPoll/ViewPoll';
import ProtectedRoute from './guards/ProtectedRoute.jsx';

const Login = React.lazy(() => import('./pages/Login/Login'))
const Register = React.lazy(() => import('./pages/Register/Register'))
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
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
            element: <ProtectedRoute authAccess={false}></ProtectedRoute>,
            children: [
              {
                path: "login",
                element: <Suspense fallback={<GlobalLoader></GlobalLoader>}><Login /></Suspense>
              }
            ]
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
