import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import "./App.css"
import AffiliatePerformance from "./modules/admin-dashboard/AffiliatePerformance"
import ManageProduct from "./modules/admin-dashboard/components/ManageProduct"
import DailySales from "./modules/admin-dashboard/DailySales"
import Geography from "./modules/admin-dashboard/Geography"
import AdminDashboardLayout from "./modules/admin-dashboard/Layout"
import ManageAdmin from "./modules/admin-dashboard/ManageAdmin"
import MonthlySales from "./modules/admin-dashboard/MonthlySales"
import Products from "./modules/admin-dashboard/Products"
import Reviews from "./modules/admin-dashboard/Reviews"
import AdminDashboardRoot from "./modules/admin-dashboard/Root"
import SalesBreakdown from "./modules/admin-dashboard/SalesBreakdown"
import SalesOverview from "./modules/admin-dashboard/SalesOverview"
import Transactions from "./modules/admin-dashboard/Transactions"
import Users from "./modules/admin-dashboard/Users"
import AllProducts from "./modules/AllProducts"
import ChatSupport from "./modules/ChatSupport"
import Checkout from "./modules/Checkout"
import ContactUs from "./modules/ContactUs"
import Home from "./modules/Home"
import Login from "./modules/Login"
import MyCart from "./modules/MyCart"
import MyOrders from "./modules/MyOrders"
import { default as OfferZone } from "./modules/OfferZone"
import OrderedProductDetail from "./modules/OrderedProductDetail"
import PageNotFound from "./modules/PageNotFound"
import ProductDetail from "./modules/ProductDetail"
import RateProduct from "./modules/RateProduct"
import Register from "./modules/Register"
import Root from "./modules/Root"
import UserDashboardLayout from "./modules/user-dashboard/Layout"
import ManagesAddress from "./modules/user-dashboard/ManagesAddress"
import MyReviewAndRatings from "./modules/user-dashboard/MyReviewAndRatings"
import ProfileInfo from "./modules/user-dashboard/ProfileInfo"
import Wishlist from "./modules/user-dashboard/Wishlist"
import Offices from "./modules/admin-dashboard/Offices"
import Offers from "./modules/admin-dashboard/Offers"
import Categories from "./modules/admin-dashboard/Categories"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      {/*User PROTECTED ROUTES */}
      <Route path="dashboard" element={<UserDashboardLayout />}>
        <Route index element={<ProfileInfo />} />
        <Route path="manage-address" element={<ManagesAddress />} />
        <Route path="reviews-and-ratings" element={<MyReviewAndRatings />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Route>

      {/*Admin PROTECTED ROUTES */}
      <Route path="admin-dashboard" element={<AdminDashboardLayout />}>
        <Route index element={<AdminDashboardRoot />} />
        <Route path="profile" element={<ProfileInfo />} />
        <Route path="products" element={<Products />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="users" element={<Users />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="geography" element={<Geography />} />

        <Route path="sales-overview" element={<SalesOverview />} />
        <Route path="daily-sales" element={<DailySales />} />
        <Route path="monthly-sales" element={<MonthlySales />} />
        <Route path="sales-breakdown" element={<SalesBreakdown />} />

        <Route
          path="affiliate-performance"
          element={<AffiliatePerformance />}
        />
        <Route path="admins" element={<ManageAdmin />} />
        <Route path="offices" element={<Offices />} />
        <Route path="categories" element={<Categories />} />
        <Route path="offers" element={<Offers />} />
      </Route>

      <Route path="add-product" element={<ManageProduct />} />
      <Route
        path="edit-product"
        element={<ManageProduct isEditProduct={true} />}
      />

      {/** Common */}
      <Route path="my-orders" element={<MyOrders isAdmin={false} />} />
      <Route path="contact" element={<ContactUs />} />
      <Route path="cart" element={<MyCart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="order-detail/:orderId" element={<OrderedProductDetail />} />
      <Route path="chatboat-support" element={<ChatSupport />} />
      <Route path="rate-product" element={<RateProduct />} />

      {/* PUBLIC ROUTES */}
      <Route index element={<Home />} />
      <Route path="all-products" element={<AllProducts />} />
      <Route path="product-detail/:productId" element={<ProductDetail />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="offerzone" element={<OfferZone />} />

      {/* NOT FOUND  ROUTES */}
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
