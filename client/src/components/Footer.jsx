import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  console.log(location.pathname);

  const shortFooterPage = [
    "/cart",
    "/checkout",
    "/add-product",
    "/edit-product",
  ];

  /** Hide footer */
  if (location.pathname.includes("/admin-dashboard")) return null;

  /** Small Footer */
  if (shortFooterPage.includes(location.pathname))
    return (
      <div className="text-gray-600 border-t-2 mt-4">
        <div className="container mx-auto flex md:flex-row gap-2 flex-col justify-between py-6 text-xs px-2 ">
          <div className="flex flex-col md:flex-row  gap-2 gap-x-4">
            <div className="flex items-center gap-x-1 flex-wrap gap-1">
              <p>Policies: </p>
              <Link to="/" className="border-gray-400 border-r-[1px] pr-1">
                Returns Policy
              </Link>
              <Link to="/" className="border-gray-400 border-r-[1px] pr-1">
                Terms of use
              </Link>
              <Link to="/" className="border-gray-400 border-r-[1px] pr-1">
                Security
              </Link>
              <Link to="/" className="border-gray-400 border-r-[1px] pr-1">
                Privacy
              </Link>
              <Link to="/">Infringement</Link>
            </div>
            <p>© 2007-2024 Flipkart.com</p>
          </div>
          <p>
            Need help? Visit the{" "}
            <Link to="/chatboat-support" className="text-blue-600">
              Help Center{" "}
            </Link>
            or
            <Link to="/" className="text-blue-600">
              {" "}
              Contact Us
            </Link>
          </p>
        </div>
      </div>
    );

  /** Big Footer */
  return (
    <div className="md:h-auto w-full bg-[#212121] overflow-hidden p-3 ">
      <div className="flex flex-col gap-4 py-4">
        {/** Left Section */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4  md:container md:mx-auto">
          <div>
            <p className="text-xs text-gray-400 mb-2">ABOUT</p>
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
            <p className="text-xs text-gray-400 mb-2">HELP</p>
            <div className="flex flex-col items-start justify-start">
              <p className="text-[0.68rem] font-bold text-gray-300">Payment</p>
              <p className="text-[0.68rem] font-bold text-gray-300">Shipping</p>
              <p className="text-[0.68rem] font-bold text-gray-300">
                Cancellation & Returns
              </p>
              <p className="text-[0.68rem] font-bold text-gray-300">FAQ</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2">CONSUMER POLICY</p>
            <div className="flex flex-col items-start justify-start">
              <p className="text-[0.68rem] font-bold text-gray-300">
                {" "}
                Cancellation & Returns
              </p>
              <p className="text-[0.68rem] font-bold text-gray-300">
                Terms of Use
              </p>
              <p className="text-[0.68rem] font-bold text-gray-300">Security</p>
              <p className="text-[0.68rem] font-bold text-gray-300">Privacy</p>
              <p className="text-[0.68rem] font-bold text-gray-300">Sitemap</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2">SOCIAL</p>
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
        <div className="grid col-span-1 md:grid-cols-2 gap-4  md:container md:mx-auto">
          <div>
            <p className="text-xs text-gray-400 mb-2 ">Mail Us:</p>
            <div className="flex flex-col items-start justify-start">
              <div className="text-[0.68rem] text-gray-50 ">
                Flipkart Internet Private Limited, Buildings Alyssa, Begonia &
                Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahali
                Village, Bangaluru, 560103, Karnataka, India.
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2">
              Registered Office Address:
            </p>
            <div className="flex flex-col items-start justify-start flex-wrap">
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
      <div className="border-t-2 md:px-12 px-4 border-gray-700 flex py-2 items-center justify-between gap-x-4">
        <span className="text-gray-400 text-xs">2007-2024 Flip2kart.com</span>
        <div className="flex justify-start items-center gap-x-2">
          <img src="paymentGateway/visa.png" className="w-9" alt="" />
          <img src="paymentGateway/mastercard.png" className="w-9" alt="" />
          <span className="bg-white h-5 flex justify-center items-center">
            <img src="paymentGateway/rupay.png" className="w-9" alt="" />
          </span>
          <span className="bg-white h-5 flex justify-center items-center">
            <img src="paymentGateway/paypal.png" className="w-9 " alt="" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
