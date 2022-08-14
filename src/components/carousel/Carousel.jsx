import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "../../../src/index.css";

export default function Carousel({ content }) {
    return (
        <>
            <Swiper className="mySwiper relative max-w-[390px] mx-auto ">
                {content.map((el, idx) => {
                    return (
                        <SwiperSlide key={idx}>
                            <img
                                src={el.moviePhoto}
                                className=" object-cover w-full h-full"
                                alt=""
                            />
                            <div className="absolute bottom-4">
                                <p className=" bg-[#2c2c4e94] px-12 font-semibold rounded-3xl bottom-4 text-[12px]  text-white z-10">
                                    {el.title}, {el.year}
                                </p>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}
