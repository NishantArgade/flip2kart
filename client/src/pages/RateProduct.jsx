import { Accordion, Checkbox, Input, Rating, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";

const RateProduct = () => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [rateValue, setRateValue] = useState(0);
  const [rateTitle, setRateTitle] = useState("");
  const [filterPriceRange, setFilterPriceRange] = useState([0, 500]);
  const groceries = [
    {
      value: "BRAND",
      description:
        "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
    },
    {
      value: "CUSTOMER RATINGS",
      description:
        "Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.",
    },
    {
      value: "DISCOUNT",
      description:
        "Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.",
    },
    {
      value: "AVAILABILITY",
      description:
        "Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.",
    },
  ];

  function getFilterPriceRange() {
    let options = [];
    for (let i = 0; i <= priceRange[1]; i += 100) {
      options.push(<option value={i}>{i}</option>);
    }
    return options;
  }

  console.log(rateValue);

  const rateValueOptimize = useMemo(() => {
    if (rateValue === 1) {
      return "Very Bad";
    } else if (rateValue === 2) {
      return "Bad";
    } else if (rateValue === 3) {
      return "Good";
    } else if (rateValue === 4) {
      return "Very  Good";
    } else if (rateValue === 5) {
      return "Excellent";
    }
  }, [rateValue]);

  const form = useForm({
    initialValues: { description: "", rateTitle: "" },

    validate: {
      description: (value) => {
        if (!value.trim()) return "field should not be empty";
      },
    },
  });

  return (
    <div>
      <div className="p-2 w-full container mx-auto bg-white shadow-md ">
        <div className="flex justify-between items-center px-2 gap-x-2">
          <p className="font-semibold text-gray-800">Ratings & Reviews</p>

          <Link
            to="/product-detail/2"
            className="flex items-center gap-x-3  text-xs"
          >
            <div className="flex flex-col items-end  gap-y-1">
              <p className="truncate w-44 text-gray-800">
                Iphone Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto, esse!
              </p>
              <div className="text-xs text-gray-700">
                <span className="bg-green-600 px-1 py-[2px] rounded-sm mr-2 text-white">
                  4.5★
                </span>
                <span className="font-medium text-gray-500">(460)</span>
              </div>
            </div>
            <div className="border-[1.5px] w-10 h-12 flex flex-col justify-center items-center rounded-sm p-1">
              <img src="/camera.png" alt="" />
            </div>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-12 min-h-[30rem] gap-x-2 gap-y-2 py-2 container mx-auto">
        {/* Left sidebar Section */}
        <div className="col-span-3  h-fit bg-white  shadow-md">
          <div>
            <p className="border-b-2 p-4 text-sm ">What makes a good review</p>
            <div className="flex flex-col gap-y-1 px-4">
              <div className="border-b-2 py-4">
                <p className="text-sm">Have you used this product?</p>
                <p className="text-xs mt-2">
                  Your review should be about your experience with the product.
                </p>
              </div>

              <div className="border-b-2 py-4">
                <p className="text-sm">Have you used this product?</p>
                <p className="text-xs mt-2">
                  Your review should be about your experience with the product.
                </p>
              </div>

              <div className="border-b-2 py-4">
                <p className="text-sm">How to review a product?</p>
                <p className="text-xs mt-2">
                  Your review should include facts. An honest opinion is always
                  appreciated. If you have an issue with the product or service
                  please contact us from the help centre.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-9  bg-white  shadow-md">
          <div className="flex flex-col gap-y-1">
            <div className="p-4 border-b-2">
              <p className="text-sm font-semibold">Rate this product</p>
              <div className="mt-2 flex items-center gap-x-4">
                <Rating
                  value={rateValue}
                  className="gap-x-2"
                  onChange={setRateValue}
                  color="#FFE11B"
                />
                <span
                  className={
                    rateValueOptimize === "Very Bad"
                      ? "text-red-500 text-xs font-semibold"
                      : rateValueOptimize === "Bad"
                      ? "text-orange-500 text-xs font-semibold"
                      : "text-green-500 text-xs font-semibold"
                  }
                >
                  {rateValueOptimize}
                </span>
              </div>
            </div>
            <form onSubmit={form.onSubmit(console.log)}>
              <div className="px-4 pt-3">
                <p className="text-sm font-semibold pb-3">
                  Review this product
                </p>
                <div className="flex flex-col gap-y-4">
                  <Textarea
                    radius="xs"
                    description="Description"
                    placeholder="Write description here..."
                    {...form.getInputProps("description")}
                    rows={8}
                  />
                  <Input.Wrapper description="Title (optional)">
                    <Input
                      radius="xs"
                      maxLength={80}
                      placeholder="Review title..."
                      {...form.getInputProps("rateTitle")}
                    />
                  </Input.Wrapper>
                </div>
              </div>

              <div className="px-4 pt-5">
                <div className="w-12 h-12 flex justify-center items-center p-2 cursor-pointer bg-gray-200">
                  <img src="/addImgCamara.svg" color="red" alt="" />
                </div>
              </div>

              <button type="submit" className="p-4 float-end ">
                <p className="bg-[#FB641B] py-3  px-10  text-white text-xs font-semibold uppercase cursor-pointer shadow-md">
                  SUBMIT
                </p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateProduct;
