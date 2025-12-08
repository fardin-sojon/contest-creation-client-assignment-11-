import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ErrorPage from "../pages/ErrorPage";
import AllContests from "../pages/Contests/AllContests";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import CreatorRoute from "./CreatorRoute";
import ContestDetails from "../pages/Contests/ContestDetails";
import Payment from "../pages/Payment/Payment";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentFail from "../pages/Payment/PaymentFail";
import DashboardLayout from "../layouts/DashboardLayout";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import About from "../pages/Home/About";


import MyParticipated from "../pages/Dashboard/User/MyParticipated";
import MyWinning from "../pages/Dashboard/User/MyWinning";
import UserProfile from "../pages/Dashboard/User/UserProfile";
import AddContest from "../pages/Dashboard/Creator/AddContest";
import UpdateContest from "../pages/Dashboard/Creator/UpdateContest";
import MyCreatedContests from "../pages/Dashboard/Creator/MyCreatedContests";
import ContestSubmissions from "../pages/Dashboard/Creator/ContestSubmissions";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageContests from "../pages/Dashboard/Admin/ManageContests";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "all-contests",
        element: <AllContests />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "contest/:id",
        element: <PrivateRoute><ContestDetails /></PrivateRoute>,
      },
      {
        path: "payment/:id",
        element: <PrivateRoute><Payment /></PrivateRoute>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "payment-success",
        element: <PrivateRoute><PaymentSuccess /></PrivateRoute>,
      },
      {
        path: "payment-fail",
        element: <PaymentFail />,
      }
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [

        {
            path: "myParticipated",
            element: <MyParticipated />
        },
        {
            path: "myWinning",
            element: <MyWinning />
        },
        {
            path: "profile",
            element: <UserProfile />
        },

        {
            path: "addContest",
            element: <CreatorRoute><AddContest /></CreatorRoute>
        },
        {
            path: "updateContest/:id",
            element: <CreatorRoute><UpdateContest /></CreatorRoute>
        },
        {
            path: "myCreatedContests",
            element: <CreatorRoute><MyCreatedContests /></CreatorRoute>
        },
        {
            path: "contestSubmissions/:id",
            element: <CreatorRoute><ContestSubmissions /></CreatorRoute>
        },

        {
            path: "manageUsers",
            element: <AdminRoute><ManageUsers /></AdminRoute>
        },
        {
            path: "manageContests",
            element: <AdminRoute><ManageContests /></AdminRoute>
        }
    ]
  }
]);
