import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import Auth from './utils/auth'; 

// Protected Route Wrapper
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  return Auth.loggedIn() ? element : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ProtectedRoute element={<Dashboard />}/>
      }, 
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
