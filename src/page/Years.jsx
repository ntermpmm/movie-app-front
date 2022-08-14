import React, { useState } from "react";
import CardList from "../components/card/CardList";
import FilterRating from "../components/filter/FilterRating";
import FilterYear from "../components/filter/FilterYear";
import FooterFilter from "../components/footer/FooterFilter";
import NavContent from "../components/header/NavContent";
import { useMovie } from "../contexts/MovieContext";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

function Years() {
    const [minimumYear, setMinimumYear] = useState(1888);
    const [maximumYear, setMaximumYear] = useState(2022);

    const ctx = useMovie();

    const filteredYear = ctx.movies.filter(
        (el) => el.year > minimumYear && el.year < maximumYear
    );

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
                                YEARS
                            </div>
                            <FilterRating />
                            <div className=" px-8 ">
                                <div>Filter</div>
                                <FilterYear
                                    title="Price"
                                    minimumYear={minimumYear}
                                    maximumYear={maximumYear}
                                    setMinimumYear={setMinimumYear}
                                    setMaximumYear={setMaximumYear}
                                />
                            </div>
                            <CardList filteredYear={filteredYear} />
                        </div>
                    </div>
                </div>
                <FooterFilter />
            </motion.div>
        </>
    );
}

export default Years;
