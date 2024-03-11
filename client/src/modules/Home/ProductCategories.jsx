import { useQuery } from "@tanstack/react-query"
import ProductCategoryCard from "./components/ProductCategoryCard"
import { getAllCategoriesAndBrands } from "../../api/categoryApi"

const categoryData = [
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/productsIMG/Phones/2.png",
    name: "Mobile",
    categoryOptions: ["Samsung", "Readmi", "Apple", "Vivo", "Oppo"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/productsIMG/Shirt/1.jpg",
    name: "Clothes",
    categoryOptions: ["shirt", "T-shirt", "Jeans", "Pants", "Trousers"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/productsIMG/Laptops/1.jpg",
    name: "Laptop",
    categoryOptions: ["Dell", "HP", "Lenovo", "Asus", "Acer"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/productsIMG/Shoes/1.jpg",
    name: "Shoes",
    categoryOptions: ["Nike", "Puma", "Adidas", "Reebok", "Sparx"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/productsIMG/Clocks/1.jpg",
    name: "Watches",
    categoryOptions: ["Fastrack", "Titan", "Casio", "Sonata", "Timex"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/productsIMG/TV/1.jpg",
    name: "TV",
    categoryOptions: ["Samsung", "LG", "Sony", "Panasonic", "MI"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/productsIMG/Camera/1.jpg",
    name: "Camera",
    categoryOptions: ["Canon", "Nikon", "Sony", "Panasonic", "Fujifilm"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/productsIMG/Headphone/1.jpg",
    name: "Headphones",
    categoryOptions: ["JBL", "Sony", "Boat", "Skullcandy", "Sennheiser"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/productsIMG/fan.png",
    name: "Fans",
    categoryOptions: ["Crompton", "Orient", "Bajaj", "Havells", "Usha"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/productsIMG/Phones/2.png",
    name: "Smart Phone",
    categoryOptions: ["Samsung", "Readmi", "Apple", "Vivo", "Oppo"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/productsIMG/Saree/2.jpg",
    name: "Clothes",
    categoryOptions: ["shirt", "T-shirt", "Jeans", "Pants", "Trousers"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/productsIMG/Laptops/2.jpg",
    name: "Laptop",
    categoryOptions: ["Dell", "HP", "Lenovo", "Asus", "Acer"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/shirt.png",
    name: "Shoes",
    categoryOptions: ["Nike", "Puma", "Adidas", "Reebok", "Sparx"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/shirt.png",
    name: "Watches",
    categoryOptions: ["Fastrack", "Titan", "Casio", "Sonata", "Timex"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/shirt.png",
    name: "TV",
    categoryOptions: ["Samsung", "LG", "Sony", "Panasonic", "MI"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/shirt.png",
    name: "Camera",
    categoryOptions: ["Canon", "Nikon", "Sony", "Panasonic", "Fujifilm"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/shirt.png",
    name: "Headphones",
    categoryOptions: ["JBL", "Sony", "Boat", "Skullcandy", "Sennheiser"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/shirt.png",
    name: "Fans",
    categoryOptions: ["Crompton", "Orient", "Bajaj", "Havells", "Usha"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/mobiles.png",
    name: "Smart Phone",
    categoryOptions: ["Samsung", "Readmi", "Apple", "Vivo", "Oppo"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/shirt.png",
    name: "Clothes",
    categoryOptions: ["shirt", "T-shirt", "Jeans", "Pants", "Trousers"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/shirt.png",
    name: "Laptop",
    categoryOptions: ["Dell", "HP", "Lenovo", "Asus", "Acer"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/shirt.png",
    name: "Shoes",
    categoryOptions: ["Nike", "Puma", "Adidas", "Reebok", "Sparx"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/shirt.png",
    name: "Watches",
    categoryOptions: ["Fastrack", "Titan", "Casio", "Sonata", "Timex"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/shirt.png",
    name: "TV",
    categoryOptions: ["Samsung", "LG", "Sony", "Panasonic", "MI"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/shirt.png",
    name: "Camera",
    categoryOptions: ["Canon", "Nikon", "Sony", "Panasonic", "Fujifilm"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/shirt.png",
    name: "Headphones",
    categoryOptions: ["JBL", "Sony", "Boat", "Skullcandy", "Sennheiser"],
  },
  {
    id: "121lsfsd13lksfjdsffgdfgdfg",
    image: "/shirt.png",
    name: "Fans",
    categoryOptions: ["Crompton", "Orient", "Bajaj", "Havells", "Usha"],
  },
]

const ProductCategories = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategoriesAndBrands,
  })

  console.log(data)

  return (
    <div className="bg-white  shadow-md">
      <div className="px-2 md:px-8 lg:px-28">
        <div className="thin-scrollbar flex cursor-pointer items-center justify-around overflow-x-auto py-2">
          {data?.categories?.map((category, index) => (
            <ProductCategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCategories
