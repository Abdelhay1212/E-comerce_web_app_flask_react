"use client"
import PropTypes from "prop-types"
import { createContext, useContext, useEffect, useState } from "react"

export const CartContext = createContext(null)

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function getCartItems() {
    const accessToken = sessionStorage.getItem('access_token')
    if (!accessToken) {
      setCartItems([])
      setError('Access token is missing.')
      return
    }

    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      }
      const response = await fetch("http://localhost:5000/api/v1/views/cart/get", options)
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setCartItems(data)
    } catch (err) {
      setError(err.message)
    }
  }

  async function addToCart(id, quantity = 1) {
    const accessToken = sessionStorage.getItem('access_token')
    if (!accessToken) {
      alert("You need to login first.")
      return
    }

    const product_data = {
      product_id: id,
      quantity: quantity
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(product_data)
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/views/cart/add", options)

      const data = await response.json()
      if (response.ok) {
        setLoading(!loading)
        alert(data.message)
        return
      } else {
        if (data.error) {
          alert(data.error)
          return
        }
        alert("You need to login first.")
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteCartItem(id) {
    const accessToken = sessionStorage.getItem('access_token')
    if (!accessToken) {
      alert("You need to login first.")
      return
    }

    const cart_data = {
      cart_id: id
    }

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(cart_data)
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/views/cart/delete", options)
      const data = await response.json()
      if (response.ok) {
        alert(data.message)
        setLoading(!loading)
      } else {
        if (data.error) {
          alert(data.error)
          return
        }
        alert("You need to login first.")
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getCartItems()
  }, [loading])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        error,
        loading,
        setLoading,
        addToCart,
        deleteCartItem
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider")
  }
  return context
}
