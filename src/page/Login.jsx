import React from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../components/formYup/Form";
import InputForm from "../components/formYup/InputForm";
import SubmitButton from "../components/formYup/SubmitButton";
import { useAuth } from "../contexts/AuthContext";
import { useError } from "../contexts/ErrorContext";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import ErrorModal from "../components/modal/ErrorModal";

AOS.init();

function Login() {
    const schema = yup.object().shape({
        Username: yup.string().required("Username is required"),
        Password: yup.string().required("Password is required"),
    });
    const navigate = useNavigate();
    const ctxAuth = useAuth();
    const ctxError = useError();

    const handleSubmitLogin = async (data, reset) => {
        try {
            const loginAccess = await ctxAuth.login(
                data.Username,
                data.Password
            );
            if (loginAccess) {
                navigate("/");
            }
        } catch (err) {
            ctxError.setError(err.response.data.message);
            console.log(ctxError.error);
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Form
                    onSubmit={handleSubmitLogin}
                    defaultValues={{ Username: "", Password: "" }}
                    schema={schema}
                >
                    <div className="flex flex-col items-center text-center h-screen justify-center gap-8 max-w-[390px] mx-auto">
                        <div className=" space-y-4">
                            <div className=" text-4xl font-semibold text-white">
                                Log In
                            </div>
                            <div className="text-[#FF5CA4] text-lg font-semibold">
                                Sitron Movie
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <InputForm
                                name={"Username"}
                                placeholder="Username"
                                className="bg-[#2C2C4E] rounded-3xl px-24 py-2 text-center text-white"
                            />
                            {ctxError.error ? <ErrorModal /> : null}
                            <InputForm
                                type="password"
                                name={"Password"}
                                placeholder="Password"
                                className="bg-[#2C2C4E] rounded-3xl px-24 py-2 text-center text-white"
                            />
                        </div>
                        <div className="gap-4 flex flex-col">
                            <SubmitButton className="bg-[#FF2786] px-24 py-2 text-white font-bold rounded-3xl">
                                Login
                            </SubmitButton>

                            <Link to="/signup" className=" text-white text-sm">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </Form>
            </motion.div>
        </>
    );
}

export default Login;
