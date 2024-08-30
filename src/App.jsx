import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthContextProvider from "./context/AuthContext";
import Layout from "./components/Layout/Layout";
import Home from "./components/pages/Home/Home";
import Products from "./components/pages/Products/Products";
import Brands from "./components/pages/Brands/Brands";
import Cart from "./components/pages/Cart/Cart";
import Categories from "./components/pages/Categories/Categories";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import NotFound from "./components/pages/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./components/pages/ProductDetails/ProductDetails";
import CartContextProvider from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import Payment from "./components/pages/Payment/Payment";
import Orders from "./components/pages/Orders/Orders";
import Wishlist from "./components/pages/Wishlist/Wishlist";
import WishContextProvider from "./context/WishContext";
import ForgetPassword from "./components/pages/ForgetPassword/ForgetPassword";
import ForgetPassCode from "./components/pages/ForgetPassCode/ForgetPassCode";
import ResetPassword from "./components/pages/ResetPassword/ResetPassword";

const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "cashPayment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forgetPassword", element: <ForgetPassword /> },
      { path: "vertificationCode", element: <ForgetPassCode /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
const reactQueryConfig = new QueryClient();
export default function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={reactQueryConfig}>
        <CartContextProvider>
          <WishContextProvider>
            <RouterProvider router={router} />
            <Toaster />
          </WishContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
