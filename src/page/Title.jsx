import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardContent from "../components/card/CardContent";
import CardList from "../components/card/CardList";
import FooterFilter from "../components/footer/FooterFilter";
import FilterRating from "../components/filter/FilterRating";
import { useMovie } from "../contexts/MovieContext";
import { getAllMovies } from "../api/movie";
import NavContent from "../components/header/NavContent";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

function Title() {
    const ctx = useMovie();
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState(false);
    // useEffect(() => {
    //     setLoading(true);

    //     ctx.fetchMovie();
    // }, []);

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {" "}
                <div
                    data-aos="fade-up"
                    className="  max-w-[390px] mx-auto  mt-2 text-white overflow-scroll flex flex-col py-8 pb-24 gap-12 "
                >
                    <NavContent />

                    <div className="flex flex-col gap-16">
                        <div className=" flex flex-col gap-8">
                            <div className="text-center text-[20px] font-bold">
                                {" "}
                                TITLE
                            </div>
                            <FilterRating />

                            <div className="mx-8 gap-4 flex">
                                <button
                                    className="bg-[#2C2C4E] rounded-3xl py-2 w-full text-center text-white"
                                    onClick={() => setOrder(false)}
                                >
                                    A - Z
                                </button>
                                <button
                                    className=" bg-[#2C2C4E] rounded-3xl py-2 w-full text-center text-white"
                                    onClick={() => setOrder(true)}
                                >
                                    Z - A
                                </button>
                            </div>
                            <CardList order={order} />
                        </div>
                    </div>
                </div>
                <FooterFilter />
            </motion.div>
        </>
    );
}

export default Title;
