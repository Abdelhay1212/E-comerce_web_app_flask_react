import ProductInfo from "../components/ProductInfo"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { Helmet } from 'react-helmet'

const Product = () => {

  return (
    <div className="bg-gray-200">
      <Helmet>
        <title>Product - Furniture Store</title>
      </Helmet>
      <NavBar />
      <ProductInfo />
      <Footer />
    </div>
  )
}

export default Product
