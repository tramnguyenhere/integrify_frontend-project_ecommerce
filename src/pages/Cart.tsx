import React from 'react'
import { CartType } from '../types/Cart'
import useAppSelector from '../hooks/useAppSelector'

const Cart = () => {
  const { items, totalAmount, totalQuantity }: CartType = useAppSelector(state => state.cart)
  
  return (
    <div>
      {items.map(item => (
        <p key={item.cartId}>
          {item.title}
        </p>
      ))}
      {totalAmount}
      <br/>
      {totalQuantity}
    </div>
  )
}

export default Cart