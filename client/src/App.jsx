import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import AllProducts from "./pages/AllProducts";
import ChatSupport from "./pages/ChatSupport";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import ManagesAddress from "./pages/ManagesAddress";
import MyCart from "./pages/MyCart";
import MyOrders from "./pages/MyOrders";
import OrderDetail from "./pages/OrderDetail";
import PageNotFound from "./pages/PageNotFound";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import ProfileInfo from "./pages/ProfileInfo";
import RateProduct from "./pages/RateProduct";
import ReviewAndRatings from "./pages/ReviewAndRatings";
import Root from "./pages/Root";
import Sell from "./pages/Sell";
import TrendingProducts from "./pages/TrendingProducts";
import Wishlist from "./pages/Wishlist";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      {/* PROTECTED ROUTES */}
      <Route path="profile" element={<Profile />}>
        <Route index element={<ProfileInfo />} />
        <Route path="manage-address" element={<ManagesAddress />} />
        <Route path="reviews-and-ratings" element={<ReviewAndRatings />} />
        <Route path="wishlist" element={<Wishlist />} />
      </Route>

      <Route path="profile/orders" element={<MyOrders />} />
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
