import Collection from "../components/Collection"
import Comfort from "../components/Comfort"
import NavBar from "../components/NavBar"
import Guarantees from "../components/Guarantees"
import LatestProducts from "../components/LatestProducts"
import Footer from "../components/Footer"
import Testimonials from "../components/Testimonials"

const Home = () => {
  return (
    <>
      <NavBar />
      <Comfort />
      <Collection />
      <Guarantees />
      <LatestProducts />
      <Testimonials />
      <Footer />
    </>
  )
}

export default Home
