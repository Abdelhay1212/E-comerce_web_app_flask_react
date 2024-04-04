import '../assets/styles/NavBar.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/images/logo-img.png'
import menu_icon from '../assets/images/bars-solid.svg'
import close_icon from '../assets/images/xmark-solid.svg'
import s_logo from '../assets/images/favicon-img.png'
import cart_icon from '../assets/images/cart-shopping-solid.svg'
import PropTypes from 'prop-types'
import SidebarCart from './SidebarCart'

function NavBar({ itemsInfo, getCartItems, cartItems, deleteCartItem }) {

  NavBar.propTypes = {
    itemsInfo: PropTypes.object.isRequired,
    getCartItems: PropTypes.func.isRequired,
    cartItems: PropTypes.array.isRequired,
    deleteCartItem: PropTypes.func.isRequired
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Sidebar Cart
  const [isCartOpen, setIsCartOpen] = useState(false)
  const toggleCart = () => setIsCartOpen(!isCartOpen)

  return (
    <div>
      <header className="bg-white max-w-6xl mx-auto">
        <nav className="mx-auto flex max-w-6xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          {/* Logo on the left */}
          <div className="flex items-center">
            <NavLink to='/' className="text-xl font-bold">
              <img src={logo} alt="Logo" />
            </NavLink>
            {/* Links aligned to the start */}
            <div className="hidden lg:flex lg:gap-x-5 items-center ml-10">
              <NavLink to='/shop/all' className="nav-link text-sm font-semibold leading-6 text-gray-900 hover:text-[#607d8b]" activeClassName="active">All Products</NavLink>
              <NavLink to='/shop/sofa' className="nav-link text-sm font-semibold leading-6 text-gray-900 hover:text-[#607d8b]" activeClassName="active">Sofa</NavLink>
              <NavLink to='/shop/chair' className="nav-link text-sm font-semibold leading-6 text-gray-900 hover:text-[#607d8b]" activeClassName="active">Chair</NavLink>
              <NavLink to='/shop/table' className="nav-link text-sm font-semibold leading-6 text-gray-900 hover:text-[#607d8b]" activeClassName="active">Table</NavLink>
            </div>
          </div>
          {/* Links aligned to the end */}
          <div className="hidden lg:flex lg:gap-x-5 items-center">
            <NavLink to='/about' className="nav-link text-sm font-semibold leading-6 text-gray-900 hover:text-[#607d8b]" activeClassName="active">About Us</NavLink>
            <NavLink to='/account' className="nav-link text-sm font-semibold leading-6 text-gray-900 hover:text-[#607d8b]" activeClassName="active">My Account</NavLink>
            <a href="#" onClick={() => { toggleCart(); getCartItems() }} className="icon-link flex items-center text-sm font-semibold leading-6 text-gray-900">
              <span className="cart-price">${itemsInfo.amount !== 0 ? itemsInfo.amount : '0.00'}</span>
              <img src={cart_icon} alt="Cart" className="ml-2 w-6" />
              <span className="item-count">{itemsInfo.count}</span>
            </a>
          </div>
          <div className="lg:hidden">
            <img src={menu_icon} alt="menu icon" className="w-5" id="menu-button" onClick={toggleMenu} />
          </div>
        </nav>
        {/* Conditionally render this part of the menu based on isMenuOpen */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-10 lg:hidden z-50" role="dialog" aria-labelledby="menu-button" aria-modal="true">
            <div className="fixed inset-0 bg-opacity-75"></div>
            <div className="fixed inset-y-0 right-0 z-20 w-full max-w-sm bg-gray-100 overflow-y-auto px-6 py-6 sm:max-w-md">
              <div className="flex items-center justify-between">
                <NavLink to='/' className="-m-1.5 p-1.5">
                  <img src={s_logo} className="w-10" alt="" />
                </NavLink>
                <img src={close_icon} alt="close icon" className="w-5 cursor-pointer" aria-label="Close menu" onClick={toggleMenu} />
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-200">
                  <div className="space-y-2 py-6">
                    <NavLink to='/shop/all' className="nav-link -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:text-[#607d8b]" activeClassName="active" onClick={toggleMenu}>All Products</NavLink>
                    <NavLink to='/shop/sofa' className="nav-link -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:text-[#607d8b]" activeClassName="active" onClick={toggleMenu}>Sofa</NavLink>
                    <NavLink to='/shop/chair' className="nav-link -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:text-[#607d8b]" activeClassName="active" onClick={toggleMenu}>Chair</NavLink>
                    <NavLink to='/shop/table' className="nav-link -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:text-[#607d8b]" activeClassName="active" onClick={toggleMenu}>Table</NavLink>
                    <NavLink to='/about' className="nav-link -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:text-[#607d8b]" activeClassName="active" onClick={toggleMenu}>About Us</NavLink>
                    <NavLink to='/account' className="nav-link -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:text-[#607d8b]" activeClassName="active" onClick={toggleMenu}>My Account</NavLink>
                    <a href='#' onClick={() => { toggleCart(); getCartItems() }} className="icon-link flex items-center text-sm font-semibold leading-6 text-gray-900">
                      <span className="cart-price">${itemsInfo.amount !== 0 ? itemsInfo.amount : '0.00'}</span>
                      <img src={cart_icon} alt="Cart" className="ml-2 w-6" />
                      <span className="item-count-menu">{itemsInfo.count}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Sidebar Cart */}
      <SidebarCart
        isOpen={isCartOpen}
        onClose={toggleCart}
        cartItems={cartItems}
        deleteCartItem={deleteCartItem}
      />
    </div>
  )
}

export default NavBar
