import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../route/Login";
import Register from "../route/Register";
import Logout from "../route/Logout";
import ProductAddCart from "../route/ProductAddCart";
import Cart from "../route/Cart";
import Commande from "../route/Commande";
import Payment from "../route/Payment";


const router = createBrowserRouter([

  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/logout',
    element: < Logout />,
  },
  {
    path: `/scan/product/:id`,
    element: < ProductAddCart />,
  },
  {
    path: '/cart',
    element: < Cart />,
  },
  {
    path: '/',
    element: < Cart />,
  },
  {
    path: '/order',
    element: < Commande />,
  },
  {
    path: '/order',
    element: < Commande />,
  },
  {
    path: '/payment',
    element: < Payment />,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
