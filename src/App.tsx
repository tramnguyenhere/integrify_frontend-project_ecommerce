import React, {useEffect} from 'react'

import Layout from './components/Layout/Layout'
import useAppDispatch from './hooks/useAppDispatch'
import { fetchAllProducts } from './redux/reducers/productsReducer'

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