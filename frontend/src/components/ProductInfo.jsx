import { useCart } from "../context/CartContext"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const ProductInfo = () => {

  const { productId } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState({})
  const { addToCart } = useCart()

  async function getProduct(productId) {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }

      const response = await fetch(`http://localhost:5000/api/v1/views/product/${productId}`, options)
      const data = await response.json()
      if (response.ok) {
        setProduct(data)
        return
      }
      if (data.error) {
        alert(data.error)
        return
      }
      alert("An error occurred")
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProduct(productId)
  }, [productId])

  return (
    <div className="bg-gray-200">
      <div className="max-w-6xl bg-white pb-8 pt-20 mx-auto sm:px-6 lg:px-8">
        {product &&
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg mb-4">
                <img className="w-full h-full object-cover" src={`http://localhost:5000/images/${product.image}`} alt="Product Image" />
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{`Home / ${product.categories} / ${product.title}`}</span>
                <div className="flex justify-start items-center gap-2">
                  <span className="w-6 h-6 border border-[#607d8b] block text-[#607d8b] hover:bg-[#607d8b] text-xl cursor-pointer hover:text-white flex justify-center items-center">&#60;</span>
                  <span className="w-6 h-6 border border-[#607d8b] block text-[#607d8b] hover:bg-[#607d8b] text-xl cursor-pointer hover:text-white flex justify-center items-center">&#62;</span>
                </div>
              </div>
              <div className="mt-4">
                <a href="" className="text-sm text-[#607d8b] hover:text-gray-500">{product.categories}</a>
              </div>
              <h2 className="capitalize text-[#607d8b] text-xl mt-3">{product.title}</h2>
              <p className="font-bold text-gray-700 mt-2">${product.new_price}</p>
              <p className="text-md text-gray-600 leading-loose mt-2">{product.description}</p>
              <div className="flex flex-row justify-start items-center gap-5 mt-4">
                <div className="flex flex-row justify-start items-center">
                  <button onClick={() => setQuantity(prevValue => Math.max(prevValue - 1, 1))} className="bg-white border border-gray-200 rounded-none text-gray-500 font-semibold px-4 py-2 hover:bg-white hover:border-gray-200 focus:outline-none">-</button>
                  <input type="text" className="font-semibold text-gray-700 px-0 w-10 py-2 border-t border-b text-center" min={1} max={product.stock} value={quantity} readOnly />
                  <button onClick={() => setQuantity(prevValue => Math.max(prevValue + 1, 1))} className="bg-white border border-gray-200 rounded-none text-gray-500 font-semibold px-4 py-2 hover:bg-white hover:border-gray-200 focus:outline-none">+</button>
                </div>
                <button onClick={() => addToCart(productId, quantity)} className="bg-white text-[#607d8b] border border-[#607d8b] hover:border-[#607d8b] hover:bg-[#607d8b] hover:text-white rounded-none px-20 py-2 focus:outline-none">Add to Cart</button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default ProductInfo
