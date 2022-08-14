import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ProfilePic from "../../assets/image/ProfilePic.png";
import { useMovie } from "../../contexts/MovieContext";

function NavContent() {
    const ctxAuth = useAuth();
    const ctx = useMovie();

    const handleBack = async () => {
        try {
            await ctx.setManage(false);
            ctx.navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    const handleLogout = async () => {
        try {
            await ctx.setManage(false);
            ctxAuth.logout();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <nav className="flex justify-between px-8 items-center z-50">
                <div
                    onClick={handleBack}
                    className=" cursor-pointer flex items-center gap-4"
                >
                    Back
                </div>
                <button onClick={handleLogout} className="">
                    Sign out
                </button>
            </nav>
        </>
    );
}

export default NavContent;
