import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteMovie, getMovieById, updateMovie } from "../api/movie";
import { useAuth } from "../contexts/AuthContext";
import { checkRating } from "../services/checkRating";
import File from "../assets/image/File.png";
import NavContent from "../components/header/NavContent";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Modal from "../components/modal/Modal";
AOS.init();
function Content() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const ratingArr = ["G", "PG", "M", "MA", "R"];

    const [edit, setEdit] = useState(false);
    const [save, setSave] = useState(false);
    const [contentPic, setContentPic] = useState("");

    const [rating, setRating] = useState("");
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const ctx = useAuth();
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

    const handelEditContent = async () => {
        if (!edit) {
            setEdit(true);
        }
        if (edit) {
            if (!save) {
                setSave(true);
            }
            await updateMovie(id, title, rating, year, contentPic);

            navigate("/");
        }
    };
    const handelCloseEditContent = async () => {
        if (!edit) {
            setEdit(true);
        }
        if (edit) {
            setEdit(false);
        }
    };

    const handelDeleteContent = async () => {
        await deleteMovie(id);
        navigate("/");
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {" "}
                <div className=" mt-8 max-w-[390px] mx-auto  text-white overflow-scroll flex flex-col py-4 pb-32 gap-4 ">
                    <NavContent />
                    <div
                        data-aos="fade-up"
                        className=" max-w-[390px] mx-auto flex flex-col gap-4 items-center"
                    >
                        <img
                            src={
                                contentPic
                                    ? URL.createObjectURL(contentPic)
                                    : movie?.moviePhoto || File
                            }
                            alt=""
                            className="w-[348px] h-[464px] bg-[#2C2C4E] rounded-xl"
                        />
                    </div>

                    <div data-aos="fade-up" className="flex flex-col gap-16 ">
                        <div className=" flex flex-col gap-4 items-center  max-w-[360px] mx-auto overflow-hidden">
                            {edit ? (
                                <div
                                    data-aos="fade-up"
                                    onClick={onButtonClick}
                                    className=" cursor-pointer font-semibold bg-[#3F3F6F] rounded-3xl p-4"
                                >
                                    Change Movie Picture
                                </div>
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
                            {!edit ? (
                                <div
                                    data-aos="fade-up"
                                    className="text-center text-[20px] font-bold"
                                >
                                    {" "}
                                    {movie?.title || "Titles"},{" "}
                                    {movie?.year || "Year"}
                                </div>
                            ) : (
                                <div
                                    data-aos="fade-up"
                                    className="text-center space-y-4 text-[16px] font-bold"
                                >
                                    <input
                                        data-aos="fade-up"
                                        required
                                        type="text"
                                        className="bg-[#2C2C4E] rounded-3xl px-12 py-2 text-center text-white"
                                        placeholder={movie?.title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                    {save ? (
                                        !title ? (
                                            <div className=" text-[#C20055] text-sm">
                                                Title is Require
                                            </div>
                                        ) : null
                                    ) : null}

                                    <input
                                        data-aos="fade-up"
                                        type="number"
                                        className="bg-[#2C2C4E] rounded-3xl py-2 px-12 text-center text-white"
                                        placeholder={movie?.year}
                                        onChange={(e) =>
                                            setYear(e.target.value)
                                        }
                                    />
                                    {save ? (
                                        !year ? (
                                            <div className=" text-[#C20055] text-sm">
                                                Year is Require
                                            </div>
                                        ) : null
                                    ) : null}
                                </div>
                            )}

                            <div className=" text-center text-[12px] mb-20 text-[#FF5CA4] font-bold">
                                {!edit ? (
                                    movie?.rating ? (
                                        checkRating(movie?.rating)
                                    ) : (
                                        "RATING"
                                    )
                                ) : (
                                    <select
                                        data-aos="fade-up"
                                        required
                                        placeholder="select"
                                        name="room"
                                        className="bg-[#2C2C4E] rounded-3xl py-2 px-12 mb-4  text-center text-white "
                                        id="room-select"
                                        onChange={(e) =>
                                            setRating(e.target.value)
                                        }
                                    >
                                        {rating ? (
                                            movie?.rating
                                        ) : (
                                            <option value="">Select</option>
                                        )}
                                        {ratingArr.map((el, idx) => {
                                            return (
                                                <option key={idx} value={el}>
                                                    {checkRating(el)}
                                                </option>
                                            );
                                        })}
                                    </select>
                                )}
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
                    <footer className="max-w-[360px] mx-auto overflow-hidden fixed bottom-8 ">
                        {ctx.user?.role === "MANAGER" ? (
                            edit ? (
                                <div className=" space-y-4">
                                    <div className="flex gap-4">
                                        <button
                                            className=" justify-center mx-auto text-center bg-[#FFC2DD] w-[324px]  py-4 text-[#FF2786] font-bold rounded-3xl"
                                            onClick={handelCloseEditContent}
                                        >
                                            Close Edit
                                        </button>
                                        <Modal
                                            className={
                                                "justify-center mx-auto text-center border-[#2C2C4E] border-2 bg-[#3F3F6F] w-[324px]  py-4 text-white font-bold rounded-3xl"
                                            }
                                            buttonName={"Delete"}
                                            handle={handelDeleteContent}
                                        />
                                    </div>

                                    <Modal
                                        className={
                                            "justify-center mx-auto text-center border-[#2C2C4E] border-2 bg-[#FF2786] w-full  py-4 text-white font-bold rounded-3xl"
                                        }
                                        buttonName={"Save"}
                                        handle={handelEditContent}
                                    />
                                </div>
                            ) : (
                                <button
                                    className="flex gap-4 justify-center mx-auto text-center bg-[#FF2786] w-[324px]  py-4 text-white font-bold rounded-3xl"
                                    onClick={handelEditContent}
                                >
                                    Edit
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
            </motion.div>
        </>
    );
}

export default Content;
