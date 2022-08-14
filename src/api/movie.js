import axios from "../config/axios";

export const getAllMovies = async (searchParams) =>
    await axios.get("/movie/allMovie", { params: searchParams });

export const getMovieById = async (movieId) => {
    const res = await axios.get(`/movie/${movieId}`);
    return res.data;
};

export const createMovie = async (id, title, rating, year, contentPic) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("rating", rating);
    formData.append("year", year);
    formData.append("moviePhoto", contentPic);

    const res = await axios.post("/movie", formData);
    return res;
};

export const updateMovie = async (id, title, rating, year, contentPic) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("rating", rating);
    formData.append("year", year);
    formData.append("moviePhoto", contentPic);
    await axios.put(`/movie/${id}`, formData);
};

export const deleteMovie = async (id) => {
    await axios.delete(`/movie/${id}`);
};
