import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Content from "../page/Content";
import CreateContent from "../page/CreateContent";
import Home from "../page/Home";
import Login from "../page/Login";
import Profile from "../page/Profile";
import Rating from "../page/Rating";
import SignUp from "../page/Signup";
import Title from "../page/Title";
import Years from "../page/Years";

function Router() {
    const ctxAuth = useAuth();
    return (
        <>
            <Routes>
                {!ctxAuth.user ? (
                    <>
                        {" "}
                        <Route path="/Login" element={<Login />} />
                        <Route path="/SignUp" element={<SignUp />} />
                        <Route path="/*" element={<Navigate to="/Login" />} />
                    </>
                ) : (
                    <>
                        {ctxAuth.user.role === "MANAGER" ? (
                            <>
                                <Route
                                    path="/CreateContent"
                                    element={<CreateContent />}
                                />
                            </>
                        ) : null}
                        <Route path="/" element={<Home />} />
                        <Route path="/Rating" element={<Rating />} />
                        <Route path="/Years" element={<Years />} />
                        <Route path="/Title" element={<Title />} />
                        <Route path="/Content/:id" element={<Content />} />

                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/*" element={<Navigate to="/" />} />
                    </>
                )}
            </Routes>
        </>
    );
}

export default Router;
