import ProductCategoryCard from "./ProductCategoryCard";

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
];

const ProductCategoryCards = () => {
  return (
    <div className="bg-white  shadow-md">
      <div className="md:px-8 lg:px-28 px-2">
        <div className="flex justify-between items-center py-2 cursor-pointer overflow-x-auto thin-scrollbar">
          {categoryData.map((category, index) => (
            <ProductCategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryCards;
