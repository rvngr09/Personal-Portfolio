import React, { Suspense } from "react";
import { createHashRouter } from "react-router-dom"; // ← Changé : createHashRouter au lieu de createBrowserRouter
import FacebookCircularProgress from "../components/LoadingSpinner.jsx";
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

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

export const router = createHashRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Home />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  
  {
    path: "/resume",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Resume />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/contacts",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Contacts />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/projects",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Projects />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/experiences",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Experience />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/comming-soon",
    element: (
      <Suspense fallback={<PageLoader />}>
        <CommingSoon />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);