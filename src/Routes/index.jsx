import React from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import PageTitle from "../components/common/PageTitle";

import SignUp from "../Pages/Authentication/Signup";
import SignIn from "../Pages/Authentication/Signin";

import Dashboard from "../Pages/Dashboard/Dashboard";
import StoreOnboarding from "../Pages/StoreOnboarding/StoreOnboard";
import ProductOnBoarding from "../Pages/ProductOnboarding/ProductOnboard";
import ProductPage from "../Pages/ProductOnboarding/ProductPage";
import Voice from "../Pages/Voice/Voice";
import MyStore from "../Pages/MyStore/MyStore";
import Inventory from "../Pages/Inventory/Inventory";
import LivePage from "../Pages/LivePage/LivePage";
import Firestore from "../firestore";
import ProductUpload from "../productUpload";

import Abhipray from "../abhipray/index";
import Dictaphone from "../abhipray/testing";

const Pages = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <>
            <PageTitle title="Vyapar Launchpad" />
            <SignUp />
          </>
        }
      />

      <Route
        path="/signin"
        element={
          <>
            <PageTitle title="Vyapar Launchpad" />
            <SignIn />
          </>
        }
      />

      <Route
        path="/signup"
        element={
          <>
            <PageTitle title="Vyapar Launchpad" />
            <SignUp />
          </>
        }
      />

      <Route
        path="/dashboard"
        element={
          <>
            <PageTitle title="Vyapar Launchpad" />
            <Dashboard />
          </>
        }
      />

      <Route
        path="/mystore"
        element={
          <>
            <PageTitle title="Vyapar Launchpad" />
            <MyStore />
          </>
        }
      />

      <Route
        path="/inventory"
        element={
          <>
            <PageTitle title="Vyapar Launchpad" />
            <Inventory />
          </>
        }
      />

      <Route
        path="/product-onboarding"
        element={
          <>
            <PageTitle title="Vyapar Launchpad" />
            <ProductOnBoarding />
          </>
        }
      />

      <Route
        path="/product-page"
        element={
          <>
            <PageTitle title="Vyapar Launchpad" />
            <ProductPage />
          </>
        }
      />

      <Route
        path="/voice"
        element={
          <>
            <PageTitle title="Vyapar Launchpad" />
            <Voice />
          </>
        }
      />
      <Route
        path="/store-onboarding"
        element={
          <>
            <PageTitle title="Vyapar Launchpad" />
            <StoreOnboarding />
          </>
        }
      />
      <Route
        path="/live/:shareable_id"
        element={
          <>
            <PageTitle title="Vyapar Launchpad" />
            <LivePage />
          </>
        }
      />
      <Route
        path="/firestore"
        element={
          <>
            <PageTitle title="Vyapar Launchpad" />
            <Firestore />
          </>
        }
      />
      <Route
        path="/abhipray"
        element={
          <>
            <PageTitle title="Vyapar Launchpad" />
            <Abhipray />
          </>
        }
      />
      <Route
        path="/product-upload"
        element={
          <>
            <PageTitle title="Vyapar Launchpad" />
            <ProductUpload />
          </>
        }
      />
      <Route
        path="/testing"
        element={
          <>
            <PageTitle title="Vyapar Launchpad" />
            <Dictaphone />
          </>
        }
      />
    </Routes>
  );
};

export default Pages;
