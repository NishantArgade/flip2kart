const BasicInfo = () => {
  return (
    <div className="flex flex-col justify-start items-start gap-y-2  pt-10 md:pt-0">
      <p className="text-md">
        Lorem ipsum dolor sit amet consectetur adipisicing.
      </p>
      <p className="text-xs text-gray-800">
        Description Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Debitis exercitationem iure excepturi sed. Obcaecati sit repellat magnam
        rem iure provident doloribus, aliquid iusto temporibus placeat nostrum
        adipisci. Totam, numquam fugit?
      </p>
      <p className="text-xs text-gray-700">
        <span className="bg-green-600 px-1 py-[2px] rounded-sm mr-2 text-white">
          4.5★
        </span>
        8 Ratings & 1 Reviews
      </p>
      <p className="text-xs mt-3">
        <span className="text-[1.30rem] mr-2 font-bold">₹1,500</span>
        <strike className="mr-2 text-gray-700">₹2300</strike>
        <span className="text-green-600 font-semibold">24% off</span>
      </p>
    </div>
  );
};

export default BasicInfo;
