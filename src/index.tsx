import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import ErrorPage from './Pages/Error';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { 
        path: "/", 
        element: <Home /> 
      },
      { 
        path: "/cart", 
        element: <Cart />,
      },
      { 
        path: "/product/:id", 
        element: <Product />,
      },
    ],
  },
]);
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}