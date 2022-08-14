import { Controller, useFormContext } from "react-hook-form";

function InputForm({ name, ...props }) {
    const {
        control,
        formState: { errors },
    } = useFormContext();
    return (
        <div>
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => {
                    return (
                        <input
                            value={value}
                            onChange={onChange}
                            {...props}
                        ></input>
                    );
                }}
                name={name}
            />

            {errors[name] && (
                <div className=" text-[#C20055] text-sm">
                    {errors[name].message}
                </div>
            )}
        </div>
    );
}

export default InputForm;
