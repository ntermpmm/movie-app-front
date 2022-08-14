import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { deleteMovie } from "../../api/movie";
import File from "../../assets/image/File.png";
import { useMovie } from "../../contexts/MovieContext";
import { checkRating } from "../../services/checkRating";
import Modal from "../modal/Modal";
// import defaultPic from "../../assets/Image/profileImg.png";

function CardContent(content) {
    const { id, title, year, rating, moviePhoto, width, height, idx } = content;

    // console.log(w);
    const ctx = useMovie();
    const inputEl = useRef(null);
    const onButtonClick = () => {
        inputEl.current.click();
    };

    const handelDeleteContent = async () => {
        ctx.movies.splice(idx, 1);
        ctx.setMovies([...ctx.movies]);
        await deleteMovie(id);
    };
    return (
        <>
            {!ctx.manage ? (
                <>
                    <img
                        data-aos="fade-up"
                        onClick={onButtonClick}
                        alt=""
                        src={moviePhoto || File}
                        style={{ width: width, height: height }}
                        className={`object-cover  bg-white rounded-xl`}
                    ></img>

                    <Link
                        ref={inputEl}
                        className="text-center w-0 h-0  hover:-translate-y-1 hover:scale-110 duration-300 group "
                        to={"/Content/" + id}
                    ></Link>
                </>
            ) : (
                <div
                    data-aos="fade-up"
                    className="flex justify-between w-full px-4 py-4 bg-[#2C2C4E] items-center font-bold rounded-xl "
                >
                    <div className="flex items-center gap-4   ">
                        {" "}
                        <Link
                            className="    text-center w-16 h-20   hover:-translate-y-1 hover:scale-110 duration-300 group "
                            to={"/Content/" + id}
                            onClick={ctx.handelManageContent}
                        >
                            <img
                                alt=""
                                src={moviePhoto || File}
                                className={` w-full h-full object-cover  bg-white rounded-xl`}
                            ></img>
                        </Link>
                        <div>
                            <div>
                                {title}, {year}{" "}
                            </div>
                            <div className=" text-[#FF5CA4]">
                                {checkRating(rating)}
                            </div>
                        </div>
                    </div>
                    <Modal buttonName={"Delete"} handle={handelDeleteContent} />
                    {/* <button onClick={handelDeleteContent} className="">
                        Delete
                    </button> */}
                </div>
            )}
        </>
    );
}

export default CardContent;
