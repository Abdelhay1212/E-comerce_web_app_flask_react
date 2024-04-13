import Home from './pages/Home'
import About from './pages/About'
import Shop from './pages/Shop'
import Account from './pages/Account'
import Product from './pages/Product'
import Cart from './pages/Cart'
import CartContextProvider from './context/CartContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <CartContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<Account />} />
            <Route path="/shop/:category" element={<Shop />} />
            <Route path="/product/:productId" element={<Product />}
            />
          </Routes>
        </CartContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
