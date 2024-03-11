import moment from "moment"

const Highlight = ({ spotlight, product }) => {
  function getDiliveryStatusText(day) {
    if (day >= 2) return moment().add(day, "days").format("DD MMM, dddd")

    let date = moment().add(day, "days") // tomorrow's date

    let formattedDate = date.calendar(null, {
      sameDay: "[Today]",
      nextDay: "[Tomorrow], dddd",
    })

    return formattedDate
  }
  return (
    <div className="flex flex-col items-start justify-start gap-y-4 text-xs">
      {product?.stock !== 0 && (
        <div className="flex items-start gap-x-2 ">
          <p className="w-32 text-gray-500">Delivery</p>
          <p className="font-medium">
            Delivery by {getDiliveryStatusText(product?.delivery_estimate_days)}
            {product?.price >= 200 && (
              <>
                <span> | </span>
                <span className="mx-1 font-medium text-green-600">Free</span>
                <span className="text-gray-500 line-through">
                  ₹{product?.price <= 2000 ? "40" : "70"}
                </span>
              </>
            )}
          </p>
        </div>
      )}
      {spotlight?.map((item, index) => (
        <div key={index} className="flex items-start gap-x-2 ">
          <p className="w-32 text-gray-500">{item?.title}</p>
          <div>
            {item?.description.map((desc, i) => (
              <div key={i} className="flex items-center gap-x-2">
                {item?.description.length > 1 && (
                  <span className="h-1 w-1 rounded-full bg-gray-400"></span>
                )}
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Highlight
