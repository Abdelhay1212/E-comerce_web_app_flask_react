import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Shop from './pages/Shop'
import Account from './pages/Account'
import Product from './pages/Product'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/product/:productId">
            <Product />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
