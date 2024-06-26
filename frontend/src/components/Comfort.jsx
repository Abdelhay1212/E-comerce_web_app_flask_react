import { NavLink } from "react-router-dom"
import image from "../assets/images/chair-2-removebg.png"

const Comfort = () => {
  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <div className="bg-[#ededed] px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="lg:px-20 mb-6 md:mb-0 sm:w-6xl md:w-3/6">
            <p className="sm:text-6xl md:text-6xl font-bold text-[#607d8b] mb-4">STYLE, COMFORT & AFFORDABLE</p>
            <NavLink to='/shop/all' className="inline-block bg-[#ededed] text-[#607d8b] border-2 border-[#607d8b] py-3 px-4 hover:bg-[#607d8b] hover:text-white transition-colors">Explore Store</NavLink>
          </div>
          <div className="hidden md:block md:w-3/6">
            <img src={image} alt="" className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comfort
