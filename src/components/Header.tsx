import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/images/logo.png'
import { CartType } from '../types/Cart'
import useAppSelector from '../hooks/useAppSelector'

const navigation_link = [
  {
    display: 'Home',
    path: '/'
  },
  {
    display: 'Products',
    path: '/products'
  },
  {
    display: 'Cart',
    path: '/cart'
  },
  {
    display: 'Checkout',
    path: '/checkout'
  },
]

const Header = () => {
  const { totalQuantity }: CartType = useAppSelector(
    (state) => state.cart
    );
    const [totalQuantityUI, setTotalQuantityUI] = useState(totalQuantity)

  useEffect(() => {
      setTotalQuantityUI(totalQuantity)
    },[totalQuantity])

  return (
    <header className='header'>
      <Link to='/home'>
        <div className='header__brand'>
          <img className='header__brand__logo' src={logo} alt='logo' />
          <h5 className='header__brand__name'>Shop Hive</h5>
        </div>
      </Link>
      <div className='navigation'>
        {navigation_link.map(item => (
          <Link className='navigation__item' key={item.path} to={item.path}>{item.display}</Link>
        ))}
      </div>
      <div className='navigation--right'>
        <span className='navigation__item' id='cart__icon'>
          <i className="fa-solid fa-cart-shopping"></i>
          <span className='cart__badge'>{totalQuantityUI}</span>
        </span>
        <span id='user'>
          <Link to='/login'>
            <i className="fa-solid fa-user navigation__item"></i>
          </Link>
        </span>
      </div>
    </header>
  )
}

export default Header