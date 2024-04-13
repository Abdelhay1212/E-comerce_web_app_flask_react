import closeIcon from '../assets/images/xmark-solid.svg'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const SidebarCart = ({ isOpen, onClose }) => {
  const { cartItems, deleteCartItem } = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])


  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      <div className={`fixed inset-y-0 right-0 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out bg-white z-50 shadow-xl w-1/3`}>
        <div
          className="flex flex-col h-screen bg-white overflow-y-auto"
          aria-modal="true"
          role="dialog"
          tabIndex="-1"
        >

          <div className='flex flex-row justify-between items-center border-b-2 border-gray-400 pb-5 px-4 py-8 sm:px-6 lg:px-8'>
            <h2 className='text-[#607d8b]'>Shopping Cart</h2>
            <img src={closeIcon} onClick={onClose} className='w-4 cursor-pointer transition hover:scale-110' alt="" />
          </div>

          {/* Container for cart items, allowed to grow and fill space, scrolling if necessary */}
          <div className='flex-grow overflow-y-auto px-4 sm:px-6 lg:px-8 pt-5'>
            {cartItems.length > 0 ? (
              <ul className="space-y-4">
                {cartItems.map(item => (
                  <li key={item.id} className='flex justify-between items-center'>
                    <Link to={`/product/${item.product.id}`}>
                      <div className="flex items-center gap-4">
                        <img
                          src={`http://localhost:5000/images/${item.product.image}`}
                          alt=""
                          className="size-16 rounded object-cover"
                        />
                        <div>
                          <h3 className="text-sm text-gray-900 hover:text-[#607d8b]">{item.product.title}</h3>
                          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div>
                              <dt className="inline pr-2">subtotal:</dt>
                              <dd className="inline">${item.subtotal}</dd>
                            </div>
                            <div>
                              <dt className="inline pr-2">quantity:</dt>
                              <dd className="inline">{item.quantity}</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </Link>

                    <div>
                      <span
                        onClick={() => deleteCartItem(item.id)}
                        className="text-sm text-center font-small text-gray-400 hover:text-gray-600 mr-4 px-1 cursor-pointer border rounded-full"
                      >
                        &#10005;
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (<div className='text-center'>No Items Yet</div>)}
          </div>

          <div className='px-4 py-4 sm:px-6 lg:px-8 flex flex-col gap-2'>
            {cartItems.length > 0 && (
              <>
                <Link
                  to='/cart'
                  className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 hover:text-gray-600 text-center transition hover:ring-1 hover:ring-gray-400"
                >
                  View my cart
                </Link>

                <a
                  href="#"
                  className="block rounded bg-gray-700 px-5 py-3 text-sm text-center text-gray-100 transition hover:text-white hover:bg-gray-600"
                >
                  Checkout
                </a>
              </>
            )}

            <Link
              to='/shop/all'
              className="inline-block text-sm text-gray-500 text-center underline underline-offset-4 transition hover:text-gray-600"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

SidebarCart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default SidebarCart
