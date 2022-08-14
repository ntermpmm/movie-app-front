import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import {
    getAccessToken,
    removeAccessToken,
    setAccessToken,
} from "../services/localStorage";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    // console.log(user);
    const navigate = useNavigate();

    const fetchMe = async () => {
        try {
            const token = getAccessToken();
            if (token) {
                const resMe = await axios.get("/user/me");
                setUser(resMe.data.user);
            }
            setLoading(false);
        } catch (err) {
            removeAccessToken();
            navigate("/login");
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchMe();
    }, []);

    // =================================== login ==================================

    const login = async (Username, Password) => {
        const res = await axios.post("/auth/login", {
            username: Username,
            password: Password,
        });
        setAccessToken(res.data.token);
        const resMe = await axios.get("user/me");
        setUser(resMe.data.user);
        return res.data.token;
    };

    const signUp = async (name, username, password, confirmPassword, role) => {
        const res = await axios.post("/auth/signup", {
            name,
            username,
            password,
            confirmPassword,
            role,
        });
        setAccessToken(res.data.token);
        const resMe = await axios.get("user/me");
        setUser(resMe.data.user);
    };

    const editProfile = async ({ name }, profilePic) => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("profilePic", profilePic);

            const res = await axios.put(`/user/${user.id}`, formData);
            return res;
        } catch (err) {
            console.log(err);
        }
    };

    const logout = () => {
        removeAccessToken();
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                login,
                user,
                logout,
                signUp,
                fetchMe,
                editProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const ctx = useContext(AuthContext);
    return ctx;
};

export default AuthContextProvider;

export { AuthContext, useAuth };
