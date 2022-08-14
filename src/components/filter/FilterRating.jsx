import React from "react";
import { useLocation } from "react-router-dom";
import { useMovie } from "../../contexts/MovieContext";

function FilterRating() {
    const ctx = useMovie();
    const ratingArr = ["All", "G", "PG", "M", "MA", "R"];

    const handleSelectRating = (el) => {
        ctx.setRating(el);
        ctx.setSearchParams((prev) => ({ ...prev, rating: ctx.rating }));
    };

    return (
        <div data-aos="flip-left">
            {" "}
            <div className="flex justify-between px-8 ">
                {ratingArr.map((el, idx) => {
                    return (
                        <button
                            key={idx}
                            onClick={() => {
                                handleSelectRating(el);
                            }}
                            className={`font-bold ${
                                ctx.rating === el
                                    ? "bg-[#FF2786] px-2 rounded-2xl"
                                    : ""
                            }`}
                        >
                            {el}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default FilterRating;
