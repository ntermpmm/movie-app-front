import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createMovie, getMovieById } from "../api/movie";
import { useAuth } from "../contexts/AuthContext";
import { useMovie } from "../contexts/MovieContext";
import { checkRating } from "../services/checkRating";
import File from "../assets/image/File.png";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Modal from "../components/modal/Modal";
AOS.init();

function CreateContent() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const ratingArr = ["G", "PG", "M", "MA", "R"];
    const [contentPic, setContentPic] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [save, setSave] = useState(false);
    const [rating, setRating] = useState("");
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const ctx = useMovie();
    const navigate = useNavigate();
    const inputEl = useRef(null);
    const onButtonClick = () => {
        inputEl.current.click();
    };

    useEffect(() => {
        const fetchMovie = async () => {
            const res = await getMovieById(id);
            setMovie(res.movie);
        };
        fetchMovie();
    }, [id]);

    const handelCreateContent = async () => {
        if (!save) {
            setSave(true);
        }
        try {
            if (!rating || !title || !year || !contentPic) {
                throw new Error("All fields are required");
            }
            const {
                data: { message },
            } = await createMovie(id, title, rating, year, contentPic);
            setResponseMessage(message);
            ctx.setReloadMovie({});
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <nav className="flex justify-between w-full mt-8 px-8 items-center">
                    <div className="flex items-center gap-4">
                        <Link to="/">
                            <div>Back</div>
                        </Link>
                    </div>
                </nav>{" "}
                <div className="  max-w-[390px] mx-auto  text-white overflow-scroll flex flex-col py-4 pb-32 gap-8 ">
                    <div className=" max-w-[390px] mx-auto flex flex-col gap-4 items-center">
                        <img
                            src={
                                contentPic
                                    ? URL.createObjectURL(contentPic)
                                    : File
                            }
                            alt=""
                            className="w-[348px] h-[464px] bg-[#2C2C4E] rounded-xl"
                        />
                    </div>

                    <div className="flex flex-col gap-16 ">
                        <div className=" flex flex-col gap-4 items-center  max-w-[360px] mx-auto overflow-hidden">
                            <div
                                onClick={onButtonClick}
                                className=" cursor-pointer font-semibold bg-[#3F3F6F] rounded-3xl p-4"
                            >
                                Select Movie Picture
                            </div>
                            {save ? (
                                !contentPic ? (
                                    <div className=" text-[#C20055] text-sm font-semibold">
                                        Please select Movie Picture
                                    </div>
                                ) : null
                            ) : null}
                            <input
                                type="file"
                                className="w-0 h-0"
                                ref={inputEl}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    if (e.target.files[0]) {
                                        setContentPic(e.target.files[0]);
                                    }
                                }}
                            />
                            {/* ==================================  Input  ======================================== */}
                            <div className="text-center space-y-4 text-[16px] font-bold">
                                <input
                                    type="text"
                                    className="bg-[#2C2C4E] rounded-3xl py-2  px-12 text-center text-white"
                                    placeholder="title"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                {save ? (
                                    !title ? (
                                        <div className=" text-[#C20055] text-sm">
                                            Title is Require
                                        </div>
                                    ) : null
                                ) : null}
                                <input
                                    type="number"
                                    className="bg-[#2C2C4E] rounded-3xl py-2 px-12  text-center text-white"
                                    placeholder="Year"
                                    onChange={(e) => setYear(e.target.value)}
                                />
                                {save ? (
                                    !year ? (
                                        <div className=" text-[#C20055] text-sm">
                                            Year is Require
                                        </div>
                                    ) : null
                                ) : null}
                            </div>
                            {/* ==================================  Select  ======================================== */}
                            <div className=" text-center text-[12px] text-[#FF5CA4] font-semibold">
                                <select
                                    required
                                    placeholder="select"
                                    name="room"
                                    className="bg-[#2C2C4E] relative rounded-3xl  py-2 px-12 mb-4 text-center text-white "
                                    id="room-select"
                                    onChange={(e) => setRating(e.target.value)}
                                >
                                    {rating ? (
                                        rating
                                    ) : (
                                        <option value="">Select</option>
                                    )}
                                    {ratingArr.map((el, idx) => {
                                        return (
                                            <option
                                                key={idx}
                                                className="absolute "
                                                value={el}
                                            >
                                                {checkRating(el)}
                                            </option>
                                        );
                                    })}
                                </select>
                                {save ? (
                                    !rating ? (
                                        <div className=" text-[#C20055] text-sm">
                                            Rating is Require
                                        </div>
                                    ) : null
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="  flex flex-col items-center ">
                    <Modal
                        disabled={
                            !save || !contentPic || !title || !year || !rating
                        }
                        className={
                            "fixed bottom-8  flex gap-4 justify-center mx-auto text-center bg-[#FF2786] w-[324px]  py-4 text-white font-bold rounded-3xl"
                        }
                        handle={handelCreateContent}
                        buttonName={"Create"}
                    />
                </div>
            </motion.div>
        </>
    );
}

export default CreateContent;
