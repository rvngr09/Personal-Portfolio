import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import FacebookCircularProgress from "../components/LoadingSpinner.jsx";
import { Password } from "@mui/icons-material";
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
const Home = React.lazy(() => import("../pages/Home.jsx"));

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

export const router = createBrowserRouter([
   {
        path: "/about-me",
        element: (
            <Suspense fallback={<PageLoader />}>
                <Home />
            </Suspense>
        ),
        errorElement: <ErrorPage />,
    },
]);