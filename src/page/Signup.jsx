import React, { useContext, useState } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ErrorContext, useError } from "../contexts/ErrorContext";
import { Form } from "../components/formYup/Form";
import InputForm from "../components/formYup/InputForm";
import { Controller, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import ErrorModal from "../components/modal/ErrorModal";
AOS.init();

function SignUp() {
    const [role, setRole] = useState(null);
    const roleArr = ["MANAGER", "TEAMLEADER", "FLOORSTAFF"];
    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        username: yup
            .string()
            .required("Username is required")
            .test(
                "len",
                "Username must be more than 5 characters",
                (val) => val.length >= 5
            ),
        password: yup
            .string()
            .required("Password is required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        confirmPassword: yup
            .string()
            .required("Confirm Password is required")
            .oneOf([yup.ref("password")], "Password not match"),
    });

    const ctxAuth = useAuth();
    const ctxError = useError();
    const navigate = useNavigate();

    const handleSubmitSignup = async (data, reset) => {
        try {
            await ctxAuth.signUp(
                data.name,
                data.username,
                data.password,
                data.confirmPassword,
                role
            );

            navigate("/");
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
                    onSubmit={handleSubmitSignup}
                    defaultValues={{
                        name: "",
                        username: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    schema={schema}
                    className="max-w-[390px] mx-auto"
                >
                    <div className="flex flex-col items-center text-center h-screen justify-center gap-8">
                        <div className=" space-y-4">
                            <div className=" text-4xl font-semibold text-white">
                                Sign Up
                            </div>
                            <div className="text-[#FF5CA4] text-lg font-semibold">
                                Sitron Movie
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <InputForm
                                name={"name"}
                                placeholder="Your Name"
                                className="bg-[#2C2C4E] rounded-3xl px-24 py-2 text-center text-white"
                            />
                            <InputForm
                                name={"username"}
                                placeholder="Username"
                                className="bg-[#2C2C4E] rounded-3xl px-24 py-2 text-center text-white"
                            />
                            {ctxError.error ? <ErrorModal /> : null}
                            <InputForm
                                type="password"
                                name={"password"}
                                placeholder="Password"
                                className="bg-[#2C2C4E] rounded-3xl px-24 py-2 text-center text-white"
                            />
                            <InputForm
                                type="password"
                                name={"confirmPassword"}
                                placeholder="Confirm Password"
                                className="bg-[#2C2C4E] rounded-3xl px-24 py-2 text-center text-white"
                            />
                            <div className="flex flex-col">
                                <div></div>
                                <select
                                    required
                                    placeholder="select"
                                    name="room"
                                    className="bg-[#2C2C4E] rounded-3xl px-24 py-2 text-center text-white "
                                    id="room-select"
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    {role ? null : (
                                        <option value="">Select</option>
                                    )}
                                    {roleArr.map((el, idx) => {
                                        return (
                                            <option key={idx} value={el}>
                                                {el}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <button className=" bg-[#FF2786] px-24 py-2 text-white font-bold rounded-3xl">
                                Sign Up
                            </button>
                            <Link to="/login" className=" text-white text-sm">
                                Log In
                            </Link>
                        </div>
                    </div>
                </Form>
            </motion.div>
        </>
    );
}

export default SignUp;
