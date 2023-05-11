import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../views/Home/Home'
import Products from '../views/Products/Products'
import ProductDetail from '../views/ProductDetail/ProductDetail'
import Cart from '../views/Cart/Cart'
import Registration from '../views/Registration/Registration'
import Checkout from '../views/Checkout/Checkout'
import Contact from '../views/Contact/Contact'

const Routers = () => {
  return (
      <Routes>
        <Route path= '/' element = {<Navigate to='/home' />} />
        <Route path= '/home' element = {<Home />} />
        <Route path= '/products' element = {<Products />} />
        <Route path= '/products/:id' element = {<ProductDetail />} />
        <Route path= '/cart' element = {<Cart />} />
        <Route path= '/register' element = {<Registration />} />
        <Route path= '/checkout' element = {<Checkout />} />
        <Route path= '/contact' element = {<Contact />} />
      </Routes>
  )
}

export default Routers