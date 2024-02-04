import Card from "./Card"

const categoryData = [
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

const ProductCategoryCardsSection = () => {
  return (
    <div className="bg-white  shadow-md">
      <div className="px-2 md:px-8 lg:px-28">
        <div className="thin-scrollbar flex cursor-pointer items-center justify-between overflow-x-auto py-2">
          {categoryData.map((category, index) => (
            <Card key={index} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCategoryCardsSection
