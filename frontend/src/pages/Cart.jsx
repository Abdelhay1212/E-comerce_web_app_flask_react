import { NavLink } from 'react-router-dom'
import NavBar from '../components/NavBar'
import PropTypes from 'prop-types'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'

const Cart = ({ itemsInfo, getCartItems, cartItems, deleteCartItem }) => {

  Cart.propTypes = {
    itemsInfo: PropTypes.object.isRequired,
    getCartItems: PropTypes.func.isRequired,
    cartItems: PropTypes.array.isRequired,
    deleteCartItem: PropTypes.func.isRequired
  }

  async function updateCartItem(event, id) {
    const operation = event.target.innerText
    const quantity = operation === '+' ? 1 : -1

    const currentQuantity = cartItems.find(item => item.id === id).quantity
    const stock = cartItems.find(item => item.id === id).product.stock
    if (stock < (currentQuantity + quantity)) {
      alert("You can't add more than the available quantity.")
      return
    }

    const accessToken = sessionStorage.getItem('access_token')
    if (!accessToken) {
      alert("You need to login first.")
      return
    }

    try {
      const options = {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ cart_id: id, quantity })
      }

      const response = await fetch("http://localhost:5000/api/v1/views/cart/update", options)
      const data = await response.json()
      if (response.ok) {
        getCartItems()
        alert(data.message)
        return
      }
      alert(data.error)
    } catch (error) {
      console.error(error)
    }
  }

  const [total, setTotal] = useState(0)
  function calculateTotal() {
    return cartItems.reduce((total, item) => total + Number(item.subtotal), 0)
  }

  useEffect(() => {
    setTotal(calculateTotal())
  }, [cartItems])

  return (
    <div className='w-full h-full bg-gray-200'>

      <NavBar
        itemsInfo={itemsInfo}
        getCartItems={getCartItems}
        cartItems={cartItems}
        deleteCartItem={deleteCartItem}
      />

      <div className="max-w-6xl mx-auto pt-20 pb-20 px-5 bg-white">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Products List Section */}
          <div className="flex flex-col w-4/6">
            <div className="flex flex-row justify-around items-center text-lg font-semibold text-gray-700 bg-gray-100 border border-gray-200 p-4">
              <p className="w-3/6 text-center">Product</p>
              <p className="w-1/6 text-center">Price</p>
              <p className="w-1/6 text-center">Quantity</p>
              <p className="w-1/6 text-center">Subtotal</p>
            </div>

            {/* Example Product Entry */}
            {cartItems.length > 0 ? cartItems.map((item) => (
              <div key={item.id} className="flex flex-row justify-between items-center bg-white p-4 border-b border-l border-r">
                <div className="flex flex-row justify-center items-center w-3/6 text-center space-x-4">
                  <span onClick={() => deleteCartItem(item.id)} className="text-sm text-center font-small text-gray-400 hover:text-gray-600 mr-4 px-1 cursor-pointer border rounded-full">&#10005;</span>
                  <img src={`http://localhost:5000/images/${item.product.image}`} alt="" className="h-16 w-16 object-cover" />
                  <NavLink to='/product/id' className="font-small text-[#607d8b] hover:text-gray-700 cursor-pointer pl-4">{item.product.title}</NavLink>
                </div>

                <p className="font-medium text-gray-700 w-1/6 text-center">${item.product.new_price}</p>

                <div className="flex flex-row justify-center items-center w-1/6 text-center">
                  <button onClick={(event) => updateCartItem(event, item.id)} className="bg-white border border-gray-200 rounded-none text-gray-500 font-semibold px-3 py-1 hover:bg-white hover:border-gray-200 focus:outline-none">-</button>
                  <span className="font-semibold text-gray-700 px-4 py-1 border-t border-b">{item.quantity}</span>
                  <button onClick={(event) => updateCartItem(event, item.id)} className="bg-white border border-gray-200 rounded-none text-gray-500 font-semibold px-3 py-1 hover:bg-white hover:border-gray-200 focus:outline-none">+</button>
                </div>

                <p className="font-medium text-gray-700 w-1/6 text-center">${item.subtotal}</p>
              </div>
            )) : <p className="text-center text-lg text-gray-700 border border-gray-200 p-4">No items in the cart</p>}
          </div>

          {/* Cart Totals Section */}
          <div className="max-w-xl w-2/6">
            <div className="flex flex-row justify-between items-center text-lg font-semibold text-gray-700 bg-gray-100 border border-gray-200 p-4">
              <h2 className="w-full text-center">Cart totals</h2>
            </div>

            <div className="bg-white p-4 border-b border-l border-r">
              <div className="flex flex-row justify-between items-center border-b border-gray-200 py-4">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium text-gray-700">${total}</p>
              </div>

              <div className="flex flex-row justify-between items-center border-b border-gray-200 py-4">
                <p className="text-gray-600">Shipping</p>
                <p className="font-medium text-gray-700">$10</p>
              </div>

              <div className="flex flex-row justify-between items-center pt-4">
                <p className="text-gray-600">Total</p>
                <p className="font-bold text-lg text-gray-700">${total + 10}</p>
              </div>

              <div className="flex flex-col space-y-4 pt-4">
                <input type="text" name="coupon_code" placeholder="Coupon code" className="w-full p-2 border border-gray-200 outline-none rounded-none" />
                <button className="w-full bg-white text-[#607d8b] font-medium py-2 px-4 border border-[#607d8b] rounded-none hover:bg-[#607d8b] hover:border-[#607d8b] hover:text-white focus:outline-none">Apply</button>
              </div>

              <button className="w-full bg-white text-[#607d8b] font-medium mt-2 py-2 px-4 border border-[#607d8b] rounded-none hover:bg-[#607d8b] hover:border-[#607d8b] hover:text-white focus:outline-none">Proceed to checkout</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Cart
