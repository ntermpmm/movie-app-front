import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import {
    getAccessToken,
    removeAccessToken,
    setAccessToken,
} from "../services/localStorage";
import { useMovie } from "./MovieContext";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [minimumYear, setMinimumYear] = useState(1);
    const [maximumYear, setMaximumYear] = useState(2022);
    // console.log(user);
    const ctx = useMovie();
    const filteredYear = ctx.movies.filter(
        (el) => el.year > minimumYear && el.year < maximumYear
    );

    // if (!filteredYear) {
    //     return (filteredYear = ctx.movies);
    // }

    return (
        <AuthContext.Provider
            value={{
                filteredYear,
                maximumYear,
                setMaximumYear,
                minimumYear,
                setMinimumYear,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

const useFilter = () => {
    const ctx = useContext(AuthContext);
    return ctx;
};

export default AuthContextProvider;

export { AuthContext, useFilter };
