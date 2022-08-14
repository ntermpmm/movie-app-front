import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const Form = ({
    onSubmit,
    defaultValues = {},
    children,
    schema,
    className,
}) => {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit((data) => {
                    onSubmit(data);
                })}
                className={className}
            >
                {children}
            </form>
        </FormProvider>
    );
};
