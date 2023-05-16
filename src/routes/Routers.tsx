import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../pages/Home'
import Products from '../pages/Products'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import Registration from '../pages/Registration'
import Checkout from '../pages/Checkout'
import Contact from '../pages/Contact'

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