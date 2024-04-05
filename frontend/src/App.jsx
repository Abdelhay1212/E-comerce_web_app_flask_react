import Home from './pages/Home'
import About from './pages/About'
import Shop from './pages/Shop'
import Account from './pages/Account'
import Product from './pages/Product'
import Cart from './pages/Cart'
import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  const [itemsInfo, setItemsInfo] = useState({ count: 0, amount: 0 })
  const [cartItems, setCartItems] = useState([])

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
        countCartItems(accessToken)
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

  async function countCartItems(accessToken) {
    if (!accessToken) {
      setItemsInfo({ count: 0, amount: 0 })
      return
    }

    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
        }
      }
      const response = await fetch('http://localhost:5000/api/v1/views/cart/count', options)
      const data = await response.json()
      if (!response.ok) {
        setItemsInfo({ count: 0, amount: 0 })
        return
      }
      setItemsInfo({ count: data.count, amount: data.amount })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function getCartItems() {
    const accessToken = sessionStorage.getItem('access_token')
    if (!accessToken) {
      return
    }

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    }

    const response = await fetch("http://localhost:5000/api/v1/views/cart/get", options)
    const data = await response.json()
    if (response.ok) {
      setCartItems(data)
    } else {
      if (data.error) {
        alert(data.error)
        return
      }
      alert("You need to login first.")
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
        getCartItems()
        alert(data.message)
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
    const accessToken = sessionStorage.getItem('access_token')
    countCartItems(accessToken)
  }, [cartItems])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartItems={cartItems}
                addToCart={addToCart}
                itemsInfo={itemsInfo}
                getCartItems={getCartItems}
                deleteCartItem={deleteCartItem}
              />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                itemsInfo={itemsInfo}
                getCartItems={getCartItems}
                deleteCartItem={deleteCartItem}
              />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route
            path="/shop/:category"
            element={
              <Shop
                cartItems={cartItems}
                addToCart={addToCart}
                itemsInfo={itemsInfo}
                getCartItems={getCartItems}
                deleteCartItem={deleteCartItem}
              />}
          />
          <Route
            path="/product/:productId"
            element={
              <Product
                cartItems={cartItems}
                addToCart={addToCart}
                itemsInfo={itemsInfo}
                getCartItems={getCartItems}
                deleteCartItem={deleteCartItem}
              />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
