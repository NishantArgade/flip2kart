import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboardLayout from "./pages/AdminDashboard/AdminDashboardLayout";
import AdminDashboardRoot from "./pages/AdminDashboard/AdminDashboardRoot";
import ManageProduct from "./pages/AdminDashboard/ManageProduct";
import Products from "./pages/AdminDashboard/Products";
import Reviews from "./pages/AdminDashboard/Reviews";
import Transactions from "./pages/AdminDashboard/Transactions";
import Users from "./pages/AdminDashboard/Users";
import AllProducts from "./pages/AllProducts";
import ChatSupport from "./pages/ChatSupport";
import Checkout from "./pages/Checkout";
import ContactUs from "./pages/ContactUs";
import RateProduct from "./pages/GiveRatingProduct";
import Home from "./pages/Home";
import MyCart from "./pages/MyCart";
import MyOrders from "./pages/MyOrders";
import PageNotFound from "./pages/PageNotFound";
import ProductDetail from "./pages/ProductDetail";
import Root from "./pages/Root";
import Sell from "./pages/SellPage";
import TrendingProducts from "./pages/TrendingProductsPage";
import ManagesAddress from "./pages/UserDashboard/ManagesAddress";
import ProfileInfo from "./pages/UserDashboard/ProfileInfo";
import ReviewAndRatings from "./pages/UserDashboard/ReviewAndRatings";
import UserDashboardLayout from "./pages/UserDashboard/UserDashboardLayout";
import Wishlist from "./pages/UserDashboard/Wishlist";
import OrderDetail from "./pages/UserOrderDetail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      {/*User PROTECTED ROUTES */}
      <Route path="dashboard" element={<UserDashboardLayout />}>
        <Route index element={<ProfileInfo />} />
        <Route path="manage-address" element={<ManagesAddress />} />
        <Route path="reviews-and-ratings" element={<ReviewAndRatings />} />
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
      <Route path="order-detail/:orderId" element={<OrderDetail />} />
      <Route path="chatboat-support" element={<ChatSupport />} />
      <Route path="rate-product" element={<RateProduct />} />

      {/* PUBLIC ROUTES */}
      <Route index element={<Home />} />
      <Route path="all-products" element={<AllProducts />} />
      <Route path="product-detail/:productId" element={<ProductDetail />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="trending-products" element={<TrendingProducts />} />
      <Route path="sell" element={<Sell />} />

      {/* NOT FOUND  ROUTES */}
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
