import Collection from "../components/Collection"
import Comfort from "../components/Comfort"
import NavBar from "../components/NavBar"
import Guarantees from "../components/Guarantees"
import LatestProducts from "../components/LatestProducts"
import Footer from "../components/Footer"
import Testimonials from "../components/Testimonials"
import PropTypes from "prop-types"

const Home = ({ addToCart, itemsInfo, getCartItems, cartItems, deleteCartItem }) => {

  Home.propTypes = {
    addToCart: PropTypes.func.isRequired,
    itemsInfo: PropTypes.object.isRequired,
    getCartItems: PropTypes.func.isRequired,
    cartItems: PropTypes.array.isRequired,
    deleteCartItem: PropTypes.func.isRequired
  }

  return (
    <>
      <NavBar
        itemsInfo={itemsInfo}
        getCartItems={getCartItems}
        cartItems={cartItems}
        deleteCartItem={deleteCartItem}
      />
      <Comfort />
      <Collection />
      <Guarantees />
      <LatestProducts addToCart={addToCart} />
      <Testimonials />
      <Footer />
    </>
  )
}

export default Home
