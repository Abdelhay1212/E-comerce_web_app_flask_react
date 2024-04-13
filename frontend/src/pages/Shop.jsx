import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import ProductsSection from "../components/ProductsSection"

const Shop = () => {
  const { category } = useParams()

  return (
    <>
      <Helmet>
        <title>{category}</title>
      </Helmet>
      <NavBar />
      <ProductsSection category={category} />
      <Footer />
    </>
  )
}

export default Shop
