import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import "./App.css"
import AdminDashboardLayout from "./pages/AdminDashboard/AdminDashboardLayout"
import AdminDashboardRoot from "./pages/AdminDashboard/AdminDashboardRoot"
import AffiliatePerformance from "./pages/AdminDashboard/AffiliatePerformance"
import DailySales from "./pages/AdminDashboard/DailySales"
import Geography from "./pages/AdminDashboard/Geography"
import ManageProduct from "./pages/AdminDashboard/ManageProduct"
import ManagingAdmin from "./pages/AdminDashboard/ManagingAdmin"
import MonthlySales from "./pages/AdminDashboard/MonthlySales"
import Products from "./pages/AdminDashboard/Products"
import Reviews from "./pages/AdminDashboard/Reviews"
import SalesBreakdown from "./pages/AdminDashboard/SalesBreakdown"
import SalesOverview from "./pages/AdminDashboard/SalesOverview"
import Transactions from "./pages/AdminDashboard/Transactions"
import Users from "./pages/AdminDashboard/Users"
import AllProducts from "./pages/AllProducts"
import ChatSupport from "./pages/ChatSupport"
import Checkout from "./pages/Checkout"
import ContactUs from "./pages/ContactUs"
import Home from "./pages/Home"
import Login from "./pages/Login"
import MyCart from "./pages/MyCart"
import MyOrders from "./pages/MyOrders"
import { default as OfferZone } from "./pages/OfferZone"
import OrderedProductDetail from "./pages/OrderedProductDetail"
import PageNotFound from "./pages/PageNotFound"
import ProductDetail from "./pages/ProductDetail"
import RateProduct from "./pages/RateProduct"
import Register from "./pages/Register"
import Root from "./pages/Root"
import ManagesAddress from "./pages/UserDashboard/ManagesAddress"
import MyReviewAndRatings from "./pages/UserDashboard/MyReviewAndRatings"
import ProfileInfo from "./pages/UserDashboard/ProfileInfo"
import UserDashboardLayout from "./pages/UserDashboard/UserDashboardLayout"
import Wishlist from "./pages/UserDashboard/Wishlist"

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
        <Route path="admins" element={<ManagingAdmin />} />
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
