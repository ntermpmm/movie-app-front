import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useMovie } from "../../contexts/MovieContext";

function FooterFilter() {
    const ctxAuth = useAuth();
    const ctx = useMovie();
    const [edit, setEdit] = useState(false);
    return (
        <div className="  flex flex-col items-center ">
            <footer className="max-w-[360px] mx-auto overflow-hidden fixed bottom-8 ">
                {ctxAuth.user?.role === "MANAGER" ? (
                    ctx.manage ? (
                        <div className="flex gap-4">
                            <button
                                className=" justify-center mx-auto text-center bg-[#FF2786] w-[324px]  py-4 text-white font-bold rounded-3xl"
                                onClick={ctx.handelManageContent}
                            >
                                Done
                            </button>
                        </div>
                    ) : (
                        <button
                            className="flex gap-4 justify-center mx-auto text-center bg-[#FF2786] w-[324px]  py-4 text-white font-bold rounded-3xl"
                            onClick={ctx.handelManageContent}
                        >
                            Manage
                        </button>
                    )
                ) : (
                    <Link
                        to="/"
                        className="flex gap-4 justify-center mx-auto text-center bg-[#FF2786] w-[324px]  py-4 text-white font-bold rounded-3xl"
                    >
                        Home
                    </Link>
                )}
            </footer>
        </div>
    );
}

export default FooterFilter;
