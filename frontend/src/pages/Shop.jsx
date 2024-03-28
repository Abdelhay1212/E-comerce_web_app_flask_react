import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

const Shop = () => {
  const { category } = useParams();
  return (
    <>
      <NavBar />
      <h1>Shop {category}</h1>
    </>
  )
}

export default Shop
