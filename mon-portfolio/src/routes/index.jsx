import React, { Suspense, useEffect } from "react";
import { createHashRouter, Navigate, useLocation, Outlet } from "react-router-dom";
import FacebookCircularProgress from "../components/LoadingSpinner.jsx";

const Home = React.lazy(() => import("../pages/Home.jsx"));
const Contacts = React.lazy(() => import("../pages/Contact.jsx"));
const Experience = React.lazy(() => import("../pages/Experiences.jsx"));
const Projects = React.lazy(() => import("../pages/Projects.jsx"));
const Resume = React.lazy(() => import("../pages/Resume.jsx"));
const CommingSoon = React.lazy(() => import ("../pages/CommingSoon.jsx"));

const PageLoader = () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <FacebookCircularProgress />
    </div>
);

const ErrorPage = () => (
    <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>404 - Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <button
            onClick={() => window.history.back()}
            style={{
                background: "#4106e3",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "10px",
            }}
        >
            Go Back
        </button>
    </div>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return <Outlet />;
}

export const router = createHashRouter([
  {
    element: <ScrollToTop />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/resume",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Resume />
          </Suspense>
        ),
      },
      {
        path: "/contacts",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Contacts />
          </Suspense>
        ),
      },
      {
        path: "/projects",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Projects />
          </Suspense>
        ),
      },
      {
        path: "/experiences",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Experience />
          </Suspense>
        ),
      },
      {
        path: "/comming-soon",
        element: (
          <Suspense fallback={<PageLoader />}>
            <CommingSoon />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);