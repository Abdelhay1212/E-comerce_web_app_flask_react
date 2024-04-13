import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import cart_icon from '../assets/images/cart-shopping-solid.svg'

ProductsSection.propTypes = {
  category: PropTypes.string.isRequired
}

const ProductsSection = ({ category }) => {

  const { addToCart } = useCart()
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/views/shop/${category}`)
        const data = await response.json()
        if (data.error) {
          console.error(data.error)
          return
        }
        setProducts(data)
      } catch (error) {
        console.error(error)
      }
    }
    getProducts()
  }, [category])

  return (
    <section className="max-w-6xl mx-auto bg-white pt-8">
      <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <nav id="store" className="w-full z-30 top-0 px-6 py-1">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">

            <a className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="#">
              Store
            </a>

            <div className="flex items-center" id="store-nav-content">

              <a className="pl-3 inline-block no-underline text-[#607d8b] hover:text-black" href="#">
                <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                </svg>
              </a>

              <a className="pl-3 inline-block no-underline text-[#607d8b] hover:text-black" href="#">
                <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                </svg>
              </a>

            </div>
          </div>
        </nav>

        {products.length > 0 ? products.map((product) => (
          <div key={product.id} className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
            <div className="cursor-pointer font-semibold">
              <Link to={`/product/${product.id}`}>
                <img className="hover:grow hover:shadow-lg" src={`http://localhost:5000/images/${product.image}`} />
              </Link>
              <div className="pt-2 flex items-center justify-between">
                <Link to={`/product/${product.id}`}>
                  <p className="text-[#607d8b] text-sm hover:text-gray-600">{product.title}</p>
                </Link>
                <img onClick={() => addToCart(product.id)} className="h-5 w-5 fill-current text-gray-500 hover:scale-110" src={cart_icon} alt="" />
              </div>
              <div className="flex justify-start items-center">
                <p className="pt-1 mr-2 text-gray-500 text-sm line-through">${product.old_price}</p>
                <p className="pt-1 text-gray-900">${product.new_price}</p>
              </div>
            </div>
          </div>
        )) : (<p className="mx-auto text-center text-gray-500">No products found.</p>)}

      </div>
    </section>
  )
}

export default ProductsSection
