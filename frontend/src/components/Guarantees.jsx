import cert_icon from '../assets/images/cert-icon.png'
import support_icon from '../assets/images/support-icon.png'
import setup_icon from '../assets/images/setup-icon.png'
import truck_icon from '../assets/images/truck-icon.png'
import warranty_icon from '../assets/images/warranty-icon.png'


const Guarantees = () => {
  return (
    <section className="max-w-6xl bg-white p-8 mx-auto">
      <div className="px-4 pb-8 mx-auto lg:pb-16">
        <div className="grid grid-cols-1 gap-8 text-gray-500 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center items-center dark:text-gray-400">
          <div className="flex flex-col items-center justify-center">
            <img src={cert_icon} alt="" />
            <p className="h-9 hover:text-gray-900 dark:hover:text-[#607d8b]">10 Years Experience</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <img src={truck_icon} alt="" />
            <p className="h-9 hover:text-gray-900 dark:hover:text-[#607d8b]">Flexible Delivery</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <img src={setup_icon} alt="" />
            <p className="h-9 hover:text-gray-900 dark:hover:text-[#607d8b]">Free Installation</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <img src={support_icon} alt="" />
            <p className="h-9 hover:text-gray-900 dark:hover:text-[#607d8b]">After Sales Support</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <img src={warranty_icon} alt="" />
            <p className="h-9 hover:text-gray-900 dark:hover:text-[#607d8b]">5 Years Warranty</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guarantees
