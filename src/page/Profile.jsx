import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserIcon from "../components/common/UserIcon";
import { useAuth } from "../contexts/AuthContext";
import * as yup from "yup";
import { Form } from "../components/formYup/Form";
import InputForm from "../components/formYup/InputForm";
import SubmitButton from "../components/formYup/SubmitButton";
import { useRef } from "react";
import NavContent from "../components/header/NavContent";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

function Profile() {
    const [profilePic, setProfilePic] = useState("");
    const schema = yup.object().shape({
        name: yup.string().required("Your Name is required"),
    });
    const ctx = useAuth();
    const inputEl = useRef(null);
    const onButtonClick = () => {
        inputEl.current.click();
    };

    const navigate = useNavigate();

    const handleSubmitEdit = async (data, reset) => {
        try {
            await ctx.editProfile(data, profilePic);
            navigate("/");
            ctx.fetchMe();
        } catch (err) {
            console.log(err.response.data.message);
        }
    };
    return (
        <>
            {" "}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Form
                    onSubmit={handleSubmitEdit}
                    defaultValues={{
                        name: ctx.user?.name,
                    }}
                    schema={schema}
                    className="max-w-[390px] mx-auto py-12"
                >
                    <NavContent />
                    <div
                        data-aos="fade-up"
                        className="   text-white overflow-scroll flex flex-col py-4 pb-24 gap-8 items-center "
                    >
                        <div className="flex flex-col gap-12 mt-20 ">
                            <div className=" flex flex-col gap-4 items-center">
                                <UserIcon
                                    size="128px"
                                    src={
                                        profilePic
                                            ? URL.createObjectURL(profilePic)
                                            : ctx.user?.profilePic
                                    }
                                />

                                <div
                                    onClick={onButtonClick}
                                    className=" cursor-pointer font-semibold bg-[#3F3F6F] rounded-3xl p-4"
                                >
                                    Chang Profile Picture
                                </div>
                                <input
                                    type="file"
                                    className="w-0 h-0"
                                    ref={inputEl}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        if (e.target.files[0]) {
                                            setProfilePic(e.target.files[0]);
                                        }
                                    }}
                                />
                                <div>
                                    <div className="flex flex-col items-center">
                                        {/* <div>Name</div> */}
                                        <InputForm
                                            name={"name"}
                                            placeholder="Chang Your Name"
                                            className="bg-[#2C2C4E] rounded-3xl px-24 py-2 text-center text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="  flex flex-col items-center">
                        <footer className="fixed bottom-8 h-[45px] w-[324px] flex flex-col items-center justify-center   mx-auto bg-[#FF2786] rounded-3xl text-center">
                            <SubmitButton className="bg-[#FF2786] px-24 py-2 text-white font-bold rounded-3xl">
                                Save
                            </SubmitButton>
                        </footer>
                    </div>
                </Form>
            </motion.div>
        </>
    );
}

export default Profile;
