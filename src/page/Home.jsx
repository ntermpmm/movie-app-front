import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CardContent from "../components/card/CardContent";
import FilterRating from "../components/filter/FilterRating";
import { useAuth } from "../contexts/AuthContext";
import { useMovie } from "../contexts/MovieContext";
import NavHome from "../components/header/NavHome";

import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import Carousel from "../components/carousel/Carousel";

// ..
AOS.init();

function Home() {
    const [edit, setEdit] = useState(false);
    const ctx = useMovie();
    const inputEl = useRef(null);
    const onButtonClick = () => {
        inputEl.current.click();
    };
    const ctxAuth = useAuth();

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-[390px] mx-auto flex flex-col  overflow-x-hidden   py-12 pb-28 gap-8"
            >
                <NavHome />
                <FilterRating />

                {/* ==================================  Carousel  ======================================== */}
                <div className="flex  max-w-[390px]  overflow-x-scroll  px-4 gap-[20px]">
                    <Carousel content={ctx.movies} />
                </div>

                <div
                    data-aos="fade-up"
                    className=" flex flex-col gap-4   items-center"
                >
                    <div className=" text-[12px] font-bold"> Let's Enjoy</div>
                    <div className=" text-[20px] font-bold text-[#FF2786]">
                        Welcome
                    </div>
                </div>
                <div className=" flex flex-col gap-4 font-semibold">
                    {/* ==================================  Rating  ======================================== */}
                    <div
                        data-aos="fade-up"
                        className="text-white max-w-[390px] mx-auto w-full px-8 flex flex-col gap-2 "
                    >
                        <nav
                            className="flex justify-between"
                            data-aos="fade-up"
                        >
                            <div className="">Rating</div>
                            <Link to="/Rating">
                                <div>All</div>
                            </Link>
                        </nav>
                        <div className="  flex  gap-4 overflow-x-scroll  ">
                            {ctx?.movies?.map((el, idx) => {
                                return (
                                    <CardContent
                                        key={idx}
                                        id={el.id}
                                        moviePhoto={el.moviePhoto}
                                        title={el.title}
                                        width={"98px"}
                                        height={"124px"}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    {/* ==================================  Year  ======================================== */}
                    <div
                        data-aos="fade-up"
                        className="flex flex-col px-8 gap-2 w-full max-w-[390px] mx-auto"
                    >
                        <nav className="flex justify-between">
                            <div>Year</div>
                            <Link to="/Years">
                                <div>All</div>
                            </Link>
                        </nav>
                        <div className=" flex  gap-4  overflow-x-scroll  ">
                            {ctx?.movies?.map((el, idx) => {
                                return (
                                    <CardContent
                                        key={idx}
                                        id={el.id}
                                        moviePhoto={el.moviePhoto}
                                        title={el.title}
                                        width={"98px"}
                                        height={"124px"}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    {/* ==================================  Title  ======================================== */}
                    <div
                        data-aos="fade-up"
                        className="flex flex-col gap-2 w-full px-8 max-w-[390px] mx-auto"
                    >
                        <nav className="flex justify-between">
                            <div>Title</div>
                            <Link to="/Title">
                                <div>All</div>
                            </Link>
                        </nav>
                        <div className=" flex gap-4  overflow-x-scroll  ">
                            {ctx?.movies?.map((el, idx) => {
                                return (
                                    <CardContent
                                        key={idx}
                                        id={el.id}
                                        moviePhoto={el.moviePhoto}
                                        title={el.title}
                                        width={"98px"}
                                        height={"124px"}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/* ==================================  Footer  ======================================== */}
                <footer className=" left-0 right-0 fixed  bottom-8">
                    {ctxAuth.user?.role === "MANAGER" ? (
                        edit ? (
                            <div className="flex gap-4">
                                <button
                                    className=" justify-center mx-auto text-center bg-[#FF2786] w-[324px]  py-4 text-white font-bold rounded-3xl"
                                    // onClick={handelEditContent}
                                >
                                    Save
                                </button>
                                <button
                                    className=" justify-center mx-auto text-center border-[#2C2C4E] border-2 bg-[#3F3F6F] w-[324px]  py-4 text-white font-bold rounded-3xl"
                                    // onClick={handelDeleteContent}
                                >
                                    Delete
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/CreateContent"
                                className="flex gap-4 justify-center mx-auto text-center bg-[#FF2786] w-[324px]  py-4 text-white font-bold rounded-3xl"
                                // onClick={handelEditContent}
                            >
                                Create Movie
                            </Link>
                        )
                    ) : (
                        <Link
                            to="/"
                            className="flex gap-4 justify-center mx-auto text-center bg-[#FF2786] w-[324px]  py-4 text-white font-bold rounded-3xl"
                            // onClick={handelEditContent}
                        >
                            Home
                        </Link>
                    )}
                </footer>
            </motion.div>
        </>
    );
}

export default Home;
