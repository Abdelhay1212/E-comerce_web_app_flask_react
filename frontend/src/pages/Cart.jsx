import { Helmet } from 'react-helmet'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import CartInfo from '../components/CartInfo'

const Cart = () => {
  return (
    <div className='w-full h-full bg-gray-200'>
      <Helmet>
        <title>My Cart - Furniture Store</title>
      </Helmet>
      <NavBar />
      <CartInfo />
      <Footer />
    </div>
  )
}

export default Cart
