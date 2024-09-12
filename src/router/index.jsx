import React from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignInPage from "../pages/SignInPage";
import BranchPage from "../pages/BranchPage";
import TopicPage from "../pages/TopicPage";
import CreateTopicPage from "../pages/CreateTopicPage";
import CreateCommentPage from "../pages/CreateCommentPage";
import EditCommentPage from "../pages/EditCommentPage";
import EditProfilePage from "../pages/EditProfilePage";

export const router = createBrowserRouter ([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "login",
        element: <LoginPage />
    },
    {
        path: "signin",
        element: <SignInPage />
    },
    {
        path: "branch/:id",
        element: <BranchPage />
    },
    {
        path: "topic/:id",
        element: <TopicPage />
    },
    {
        path: "create_topic",
        element: (
            <PrivateRoute>
                <CreateTopicPage />
            </PrivateRoute>)
    },
    {
        path: "create_comment",
        element: (
            <PrivateRoute>
                <CreateCommentPage />
            </PrivateRoute>)
    },
    {
        path: "edit_comment/:id",
        element: (
            <PrivateRoute>
                <EditCommentPage />
            </PrivateRoute>)
    },
    {
        path: "edit_profile/:id",
        element: (
            <PrivateRoute>
                <EditProfilePage />
            </PrivateRoute>
            )
    }
])