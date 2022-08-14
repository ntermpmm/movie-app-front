import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ProfilePic from "../../assets/image/ProfilePic.png";

function NavHome() {
    const ctx = useAuth();
    // console.log(ctx.user);
    return (
        <>
            <nav
                data-aos="fade-up"
                className="flex justify-between px-8 items-center  "
            >
                <div className="flex items-center gap-4">
                    <Link to="/Profile">
                        <img
                            src={
                                ctx?.user?.profilePic
                                    ? ctx?.user?.profilePic
                                    : ProfilePic
                            }
                            className="w-12 h-12 object-cover bg-slate-500 rounded-full"
                            alt=""
                        />
                    </Link>
                    <div>
                        <div className=" text-sm">
                            Hello, {ctx?.user?.name ? ctx?.user?.name : "Name"}
                        </div>
                        <div className=" font-bold">
                            {ctx?.user?.role ? ctx?.user?.role : "Role"}
                        </div>
                    </div>
                </div>
                <button onClick={ctx.logout}>Sign out</button>

                {/* <div className="flex items-center gap-4">
                <Link to="/Profile">
                    <div className=" w-12 h-12 bg-slate-500 rounded-full">
                        img
                    </div>
                </Link>
                <div>
                    <div>Hello, Term</div>
                    <div>Role</div>
                </div>
            </div> */}
            </nav>
            {/* <nav className="flex justify-start px-8 -mt-12 items-end">
                <div>Login</div>
            </nav> */}
        </>
    );
}

export default NavHome;
