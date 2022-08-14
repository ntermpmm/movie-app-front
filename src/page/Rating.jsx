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
function Rating() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                v
            >
                {" "}
                <div
                    data-aos="fade-up"
                    className="  max-w-[390px] mx-auto text-white overflow-scroll flex flex-col py-8 mt-2 pb-24 gap-12 "
                >
                    <NavContent />
                    <div className="flex flex-col gap-16">
                        <div className=" flex flex-col gap-8">
                            <div className="text-center text-[20px] font-bold">
                                {" "}
                                RATING
                            </div>
                            <FilterRating />
                            <CardList />
                        </div>
                    </div>
                </div>
                <FooterFilter />
            </motion.div>
        </>
    );
}

export default Rating;
