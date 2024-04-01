import Collection from "../components/Collection"
import Comfort from "../components/Comfort"
import NavBar from "../components/NavBar"
import Guarantees from "../components/Guarantees"
import LatestProducts from "../components/LatestProducts"

const Home = () => {
  return (
    <>
      <NavBar />
      <Comfort />
      <Collection />
      <Guarantees />
      <LatestProducts />
    </>
  )
}

export default Home
