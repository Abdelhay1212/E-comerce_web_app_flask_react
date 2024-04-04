import cart_icon from "../assets/images/cart-shopping-solid.svg"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import PropTypes from "prop-types"

const LatestProducts = ({ addToCart }) => {

  LatestProducts.propTypes = {
    addToCart: PropTypes.func.isRequired,
  }

  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/views/latest-products")
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center mb-20">
      <div className="mb-16 flex flex-col items-center justify-center">
        <p className="text-3xl text-[#607d8b] mb-4">Our Latest Products</p>
        <span className="bg-[#607d8b] w-20 h-1 block rounded"></span>
      </div>
      <div className="max-w-6xl mx-auto px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) =>
          <div key={product.id} className="relative overflow-hidden">
            <div className="group relative">
              <NavLink to={`/product/${product.id}`}>
                <img className="w-full object-cover hover:cursor-pointer" src={`http://localhost:5000/images/${product.image}`} alt="" />
              </NavLink>
              <div className="absolute top-0 right-0 m-4 h-9 w-9 hover:cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-gray-200 hover:bg-white rounded-full">
                <img src={cart_icon} alt="" className="h-4 w-4 object-cover" onClick={() => addToCart(product.id)} />
              </div>
            </div>
            <div className="px-4 py-2">
              <span className="text-sm text-gray-400 mb-2 block">{product.categories[1]}</span>
              <NavLink to={`/product/${product.id}`} className="font-medium text-md text-[#607d8b] hover:text-[#607d8b] mb-2">{product.title}</NavLink>
              <div>
                <span className="line-through font-semibold text-sm text-gray-400">${product.old_price}</span>
                <span className="ml-2 font-semibold text-md text-gray-900">${product.new_price}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LatestProducts
