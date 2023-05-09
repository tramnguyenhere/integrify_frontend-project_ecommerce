import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './views/Home/Home'
import Products from './views/Products/Products'
import ProductDetail from './views/ProductDetail/ProductDetail'
import Cart from './views/Cart/Cart'
import Registration from './views/Registration/Registration'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "product",
      element: <Products />,
    },
    {
      path: "product/:id",
      element: <ProductDetail />
    },
    {
      path: "cart",
      element: <Cart />
    },
    {
      path: 'register',
      element: <Registration />
    }
  ])
  return (
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  )
}

export default App