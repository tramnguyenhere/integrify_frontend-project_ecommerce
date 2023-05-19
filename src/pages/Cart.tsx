import React from 'react'
import { CartType } from '../types/Cart'
import useAppSelector from '../hooks/useAppSelector'
import Helmet from '../components/Helmet'
import { Link } from 'react-router-dom'
import useAppDispatch from '../hooks/useAppDispatch'
import { decreaseItemQuantity, increaseItemQuantity, removeItemFromCart } from '../redux/reducers/cartReducer'

const Cart = () => {
  const { items, totalAmount, totalQuantity }: CartType = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()

  return (
    <Helmet title='Cart'>
      {items.length > 0 ? (
        <div className='cart'>
        <h1 className='cart__header'>Shopping Cart</h1>
        <section className='cart__control-panel'>
          <table  className='cart__control-panel__items'>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>SubTotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.cartId}>
                  <td id='item__info'>
                    {item.title}
                  </td>
                  <td className='item__price'>${item.price}</td>
                  <td  id='item__quantity-control'>
                    <button onClick={()=>dispatch(decreaseItemQuantity(item.cartId))}>-</button>
                    <input value={item.quantity} />
                    <button onClick={() => dispatch(increaseItemQuantity(item.cartId))}>+</button>
                  </td>
                  <td className='item__price'>${item.amount}</td>
                  <td id='item__button--remove'>
                    <button onClick={() => dispatch(removeItemFromCart(item.cartId))}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
          <section className='cart__summary'>
            <div className='cart__summary__section'>
              <h4>Total Amount: </h4>
              <p>${totalAmount}</p>
            </div>
            <div className='cart__summary__section'>
              <h4>Total Quantity: </h4>
              <p>{totalQuantity} {totalQuantity===1 ? 'item' : 'items'}</p>
            </div>
        </section>
        <button className='cart__button--checkout'>Proceed to Checkout</button>
      </div>
      ) : (
          <div className='cart--empty'>
            The cart is empty.
            <Link to='/products' className='cart--empty__button'>Explore more products</Link>
          </div>
      )}
    </Helmet>
  )
}

export default Cart