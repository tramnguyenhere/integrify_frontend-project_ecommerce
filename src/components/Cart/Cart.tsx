import React from 'react';
import { Link } from 'react-router-dom';
import useAppSelector from '../../hooks/useAppSelector';

const Cart = () => {
    const isSideCartVisible = useAppSelector(state => state.cart.isSideCartVisible)
  
    
  return (
    <div className={`side-cart ${isSideCartVisible ? '' : 'hidden'}`}>
      <div className='side-cart__overlay'></div>
      <div className='side-cart__wrapper'>
        <button className='side-cart__button--close'>x</button>
        <p>No item added to the cart</p>
        <div className='side-cart__summary'>
          <p>Subtotal: $0</p>
          <Link to='/checkout'>Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
