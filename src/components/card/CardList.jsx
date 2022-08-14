import { Link } from "react-router-dom";
import { useMovie } from "../../contexts/MovieContext";
import CardContent from "./CardContent";
// import defaultPic from "../../assets/Image/profileImg.png";

function CardList(content) {
    const { filteredYear, order } = content;

    const ctx = useMovie();

    let sortedTitle;

    if (!order) {
        sortedTitle = [...ctx.movies].filter((el) => {
            return el.title;
        });
    } else {
        sortedTitle = [...ctx.movies].reverse().filter((el) => {
            return el.title;
        });
    }

    let filteredYears = filteredYear;

    return (
        <>
            <div
                className={`${
                    ctx.manage ? "flex-col mx-8" : "flex-row ml-8 "
                } flex items-start  flex-wrap gap-2`}
            >
                {filteredYears
                    ? filteredYears?.map((el, idx) => {
                          return (
                              <CardContent
                                  key={idx}
                                  idx={idx}
                                  id={el.id}
                                  year={el.year}
                                  rating={el.rating}
                                  moviePhoto={el.moviePhoto}
                                  title={el.title}
                                  width={"98px"}
                                  height={"124px"}
                              />
                          );
                      })
                    : sortedTitle?.map((el, idx) => {
                          return (
                              <CardContent
                                  key={idx}
                                  idx={idx}
                                  id={el.id}
                                  year={el.year}
                                  rating={el.rating}
                                  moviePhoto={el.moviePhoto}
                                  title={el.title}
                                  width={"98px"}
                                  height={"124px"}
                              />
                          );
                      })}
            </div>
            {/* <Link
                className="    text-center    hover:-translate-y-1 hover:scale-110 duration-300 group "
                to={"/Content/" + id}
            >
                <img
                    alt=""
                    src={moviePhoto || Cards}
                    className={`w-[${width}] h-[${height}]  bg-white rounded-xl`}
                ></img>
            </Link> */}
            {/* <div>
                {" "}
                <Link
                    className="    text-center    hover:-translate-y-1 hover:scale-110 duration-300 group "
                    to={"/Content/" + id}
                >
                    <img
                        alt=""
                        src={moviePhoto || Cards}
                        className={`w-[${width}] h-[${height}]  bg-white rounded-xl`}
                    ></img>
                </Link>
            </div> */}
        </>
    );
}

export default CardList;
