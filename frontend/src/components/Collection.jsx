import chair_img1 from "../assets/images/chair-1.jpg"
import chair_img2 from "../assets/images/chair-2.jpg"
import { NavLink } from "react-router-dom"
import "../assets/styles/Collection.css"

const Collection = () => {
  return (
    <>
      <div className="max-w-6xl px-4 py-2 mx-auto">
        <div className="bg-[#ededed]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="md:w-2/6 lg:w-2/6 pb-4 md:pb-0">
              <img src={chair_img2} alt="" className="w-full mx-auto" />
            </div>

            <div className="md:w-4/6 lg:w-4/6 lg:px-20 mb-6 md:mb-0">
              <p className="text-2xl md:text-4xl font-semibold text-[#607d8b] mb-4">Chair Collection!</p>
              <p className="text-[#607d8b] mb-8">Launch Offer 15% Off!</p>
              <NavLink to='/shop/chair' className="inline-block text-[#607d8b] border-2 border-[#607d8b] py-3 px-8 hover:bg-[#607d8b] hover:text-white transition-colors">View Collection &rarr;</NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl px-4 pb-8 mx-auto">
        <div className="bg-[#ededed]">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center">
            <div className="md:w-4/6 lg:w-4/6 lg:px-20 mb-6 md:mb-0">
              <p className="text-2xl md:text-4xl font-semibold text-[#607d8b] mb-4">Modern Collection!</p>
              <p className="text-[#607d8b] mb-8">New Season Stock</p>
              <NavLink to='/shop/chair' className="inline-block text-[#607d8b] border-2 border-[#607d8b] py-3 px-8 hover:bg-[#607d8b] hover:text-white transition-colors">View Collection &rarr;</NavLink>
            </div>

            <div className="md:w-2/6 lg:w-2/6 pb-4 md:pb-0">
              <img src={chair_img1} alt="" className="w-full mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Collection
