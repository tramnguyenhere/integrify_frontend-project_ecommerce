import React, {useEffect} from 'react'

import Layout from './components/Layout'
import useAppDispatch from './hooks/useAppDispatch'
import { fetchAllProducts } from './redux/reducers/productsReducer'
import './assets/styles/styles.scss'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])
  
  return (
    <>
      <Layout />
    </>
  )
}

export default App