import { useState } from "react";
import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../api/movie";

const MovieContext = createContext();
function MovieContextProvider({ children }) {
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useState({ rating: "All" });
    const [rating, setRating] = useState("All");
    const [manage, setManage] = useState(false);
    const [reloadMovie, setReloadMovie] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setSearchParams((prev) => ({ ...prev, rating: rating }));
    }, [rating]);

    const fetchMovie = async () => {
        try {
            const res = await getAllMovies(searchParams);
            const fetchMovies = res.data.movies;
            setMovies(fetchMovies);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchMovie();
    }, [searchParams, reloadMovie]);

    const handelManageContent = () => {
        if (!manage) {
            setManage(true);
        }
        if (manage) {
            setManage(false);

            // navigate("/");
        }
    };

    return (
        <MovieContext.Provider
            value={{
                movies,
                searchParams,
                setSearchParams,
                setRating,
                rating,
                manage,
                setManage,
                handelManageContent,
                navigate,
                fetchMovie,
                setMovies,
                reloadMovie,
                setReloadMovie,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
}

const useMovie = () => {
    const ctx = useContext(MovieContext);
    return ctx;
};

export default MovieContextProvider;
export { useMovie };
