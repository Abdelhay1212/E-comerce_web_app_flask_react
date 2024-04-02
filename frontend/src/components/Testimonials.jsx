import per_img1 from "../assets/images/per-img1.png"
import per_img2 from "../assets/images/per-img2.png"
import per_img3 from "../assets/images/per-img3.png"


const Testimonials = () => {
  return (
    <div className="px-4">
      <div className="max-w-6xl bg-gray-200 py-10 mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-16 flex flex-col items-center justify-center">
            <p className="text-3xl text-[#607d8b] mb-4">Testimonials</p>
            <span className="bg-[#607d8b] w-20 h-1 block rounded"></span>
          </div>

          <div className="flex flex-row flex-wrap items-center justify-around">
            <div className="flex flex-col items-center justify-center pb-10">
              <p className="text-md text-center text-gray-800 font-medium max-w-sm pb-4">
                &rdquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo&rdquo;
              </p>
              <div className="flex flex-row items-center justify-start">
                <img src={per_img1} className="pr-4 w-20" />
                <p className="text-sm text-gray-700">Patricia Warren</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center pb-10">
              <p className="text-md text-center text-gray-800 font-medium max-w-sm pb-4">
                &rdquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo&rdquo;
              </p>
              <div className="flex flex-row items-center justify-start">
                <img src={per_img2} className="pr-4 w-20" />
                <p className="text-sm text-gray-700">Patricia Warren</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center pb-10">
              <p className="text-md text-center text-gray-800 font-medium max-w-sm pb-4">
                &rdquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo&rdquo;
              </p>
              <div className="flex flex-row items-center justify-start">
                <img src={per_img3} className="pr-4 w-20" />
                <p className="text-sm text-gray-700">Patricia Warren</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
