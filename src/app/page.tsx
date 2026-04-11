import MainSlider from "./_components/MainSlider/MainSlider";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
import { GetProducts } from "@/Api/product.api";
import { ProductTypes } from "@/Types/Product.types";
import SingleProduct from "./_components/singleProduct/SingleProduct";
import SearchBar from "./_components/Search/Search";

export default async function Home() {
  let data=await GetProducts()
  
  return (
    <>
        <MainSlider />
    
      <CategorySlider />

         <div className="flex flex-wrap  w-[80%] mx-auto  my-7">
              {data.map((currentProduct: ProductTypes) => (
                <SingleProduct key={currentProduct.id} product={currentProduct} />
              ))}
            </div>
    </>
  );
}
