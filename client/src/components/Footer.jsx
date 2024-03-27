import { Link, useLocation } from "react-router-dom"

const Footer = () => {
  const location = useLocation()

  const shortFooterPage = [
    "/cart",
    "/checkout",
    "/add-product",
    "/edit-product",
  ]

  /** Hide footer */
  if (location.pathname.includes("/admin-dashboard")) return null

  /** Small Footer */
  if (shortFooterPage.includes(location.pathname))
    return (
      <div className="mt-4 border-t-2 text-gray-600">
        <div className="container mx-auto flex flex-col justify-between gap-2 px-2 py-6 text-xs md:flex-row ">
          <div className="flex flex-col gap-2  gap-x-4 md:flex-row">
            <div className="flex flex-wrap items-center gap-1 gap-x-1">
              <p>Policies: </p>
              <Link to="/" className="border-r-[1px] border-gray-400 pr-1">
                Returns Policy
              </Link>
              <Link to="/" className="border-r-[1px] border-gray-400 pr-1">
                Terms of use
              </Link>
              <Link to="/" className="border-r-[1px] border-gray-400 pr-1">
                Security
              </Link>
              <Link to="/" className="border-r-[1px] border-gray-400 pr-1">
                Privacy
              </Link>
              <Link to="/">Infringement</Link>
            </div>
            <p>© 2007-2024 Flipkart.com</p>
          </div>
          <div>
            Need help? Visit the{" "}
            <Link
              to="https://mediafiles.botpress.cloud/6700e9bb-e1ed-41b3-a6ce-38e6bbaedc8d/webchat/bot.html"
              target="_blank"
              className="text-blue-600"
            >
              Help Center{" "}
            </Link>
            or
            <Link to="/contact" className="text-blue-600">
              {" "}
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    )
  /** Large Footer */
  return (
    <div className="w-full overflow-hidden bg-[#172337] p-3 md:h-auto ">
      <div className="flex flex-col gap-4 py-4">
        {/** Left Section */}
        <div className="grid grid-cols-2 gap-4 md:container  md:mx-auto md:grid-cols-4">
          <div>
            <p className="mb-2 text-xs text-gray-400">ABOUT</p>
            <div className="flex flex-col items-start justify-start">
              <Link
                to="/contact"
                className="text-[0.68rem] font-bold text-gray-300"
              >
                Cotact Us
              </Link>
              <p className="text-[0.68rem] font-bold text-gray-300">About Us</p>
              <p className="text-[0.68rem] font-bold text-gray-300">Careers</p>
              <p className="text-[0.68rem] font-bold text-gray-300">
                Flipkart Stories
              </p>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs text-gray-400">HELP</p>
            <div className="flex flex-col items-start justify-start">
              <p className="text-[0.68rem] font-bold text-gray-300">Payment</p>
              <p className="text-[0.68rem] font-bold text-gray-300">Shipping</p>
              <Link
                to="/my-orders"
                className="text-[0.68rem] font-bold text-gray-300"
              >
                Cancellation & Returns
              </Link>
              <p className="text-[0.68rem] font-bold text-gray-300">FAQ</p>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs text-gray-400">CONSUMER POLICY</p>
            <div className="flex flex-col items-start justify-start">
              <Link
                to="/my-orders"
                className="text-[0.68rem] font-bold text-gray-300"
              >
                {" "}
                Cancellation & Returns
              </Link>
              <p className="text-[0.68rem] font-bold text-gray-300">
                Terms of Use
              </p>
              <p className="text-[0.68rem] font-bold text-gray-300">Security</p>
              <p className="text-[0.68rem] font-bold text-gray-300">Privacy</p>
              <p className="text-[0.68rem] font-bold text-gray-300">Sitemap</p>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs text-gray-400">SOCIAL</p>
            <div className="flex flex-col items-start justify-start">
              <p className="text-[0.68rem] font-bold text-gray-300">Facebook</p>
              <p className="text-[0.68rem] font-bold text-gray-300">Twitter</p>
              <p className="text-[0.68rem] font-bold text-gray-300">You Tube</p>
              <p className="text-[0.68rem] font-bold text-gray-300">
                Instagram
              </p>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="col-span-1 grid gap-4 md:container  md:mx-auto md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs text-gray-400 ">Mail Us:</p>
            <div className="flex flex-col items-start justify-start">
              <div className="text-[0.68rem] text-gray-50 ">
                Flipkart Internet Private Limited, Buildings Alyssa, Begonia &
                Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahali
                Village, Bangaluru, 560103, Karnataka, India.
              </div>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs text-gray-400">
              Registered Office Address:
            </p>
            <div className="flex flex-col flex-wrap items-start justify-start">
              <div className="text-[0.68rem]  text-gray-50">
                Flipkart Internet Private Limited, Buildings Alyssa, Begonia &
                Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahali
                Village, Bengaluru, 560103, Karnataka, India CIN:
                U51109KA2012PTC066107 Telephone: 044-45614700.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/** Sub Foogter */}
      <div className="flex items-center justify-between gap-x-4 border-t-2 border-gray-700 px-4 py-2 md:px-12">
        <span className="text-xs text-gray-400">2007-2024 Flip2kart.com</span>
        <div className="flex items-center justify-start gap-x-2">
          <img src="paymentGateway/visa.png" className="w-9" alt="" />
          <img src="paymentGateway/mastercard.png" className="w-9" alt="" />
          <span className="flex h-5 items-center justify-center bg-white">
            <img src="paymentGateway/rupay.png" className="w-9" alt="" />
          </span>
          <span className="flex h-5 items-center justify-center bg-white">
            <img src="paymentGateway/paypal.png" className="w-9 " alt="" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer
