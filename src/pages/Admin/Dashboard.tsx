import React from 'react'
import Helmet from '../../components/Helmet'
import useAppSelector from '../../hooks/useAppSelector'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { products, loading, error } = useAppSelector(state => state.products)
  const {categories} = useAppSelector(state=>state.categories)
  
  return (
    <Helmet title='Dashboard'>
      <div>
        <nav>
          <button>User management</button>
          <Link to='/dashboard/product-management'>Product management</Link>
          <button>Category management</button>
        </nav>
        <section>
          
        </section>
      </div>
    </Helmet>
  )
}

export default Dashboard