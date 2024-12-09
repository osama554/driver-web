import { FormEvent, memo, PropsWithChildren, useCallback, useRef, useState } from "react";

import FieldTypes from "@/components/form/enums/fieldTypes";
import FileField from "@/components/fileField/fileField";
import IFormProps from "@/components/form/interfaces/IFormProps";
import ITextFieldProps from "@/components/textField/interfaces/ITextFieldProps";
import TextField from "@/components/textField/textField";
import useRegistrationFormContext from "@/app/registration/formContextProvider/useRegistrationFormContext";

const Form = memo(({ onSubmit, ...props }: PropsWithChildren<IFormProps>) => {
    const [errors, setErrors] = useState({} as Record<string, string>);
    const btnDisabledRef = useRef<boolean>(false);
    const { formData: globalFormData } = useRegistrationFormContext();

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (btnDisabledRef.current) {
            return;
        }

        const btn = (e.nativeEvent as unknown as Record<string, unknown>).submitter as HTMLButtonElement;
        btn?.blur();
        btnDisabledRef.current = true;

        const formData = new FormData(e.target as HTMLFormElement);
        const fieldValues = {} as Record<string, string>;

        let isValidated = true;
        const newErrors: Record<string, string> = {};

        props.fields.forEach((field) => {
            if (field.name) {
                const value = formData.get(field.name);
                const regxField = field as ITextFieldProps;
                let err = "";

                if (value instanceof File) {
                    if (field.required && (!globalFormData.photo || globalFormData.photo?.size === 0)) {
                        err = field.requiredErrorMsg || `Please upload ${field.name?.toLowerCase()}.`;
                    }
                } else {
                    const stringValue = value?.toString().trim() || "";
                    fieldValues[field.name] = stringValue;

                    if (
                        field.required &&
                        (!stringValue || typeof stringValue === "string" && !stringValue.trim())
                    ) {
                        err = field.requiredErrorMsg || `Please enter ${field.name?.toLowerCase()}.`;
                    } else if (regxField.regx) {
                        if (
                            regxField.regx &&
                            typeof stringValue === "string" &&
                            !regxField.regx.test(stringValue)
                        ) {
                            err = regxField.validationMsg
                                ? regxField.validationMsg
                                : "The entered value does not match the pattern.";
                        }
                    }
                }

                isValidated = err ? false : isValidated;
                newErrors[field.name] = err;
            }
        });

        setErrors(() => newErrors);

        if (isValidated) {
            onSubmit(fieldValues);
        }

        btnDisabledRef.current = false;
    }, [globalFormData.photo, onSubmit, props.fields]);

    return (
        <form
            className={props.className}
            onSubmit={handleSubmit}
            id={props.id}
        >
            {props.fields.map((field) => {
                const textField = field as ITextFieldProps;

                switch (field.type) {
                    case FieldTypes.TextField:
                        return (
                            <TextField
                                {...field}
                                key={field.name}
                                error={errors[field.name]}
                                setErrors={setErrors}
                                ref={textField.ref}
                            />
                        );
                    case FieldTypes.FileField:
                        return (
                            <FileField
                                {...field}
                                key={field.name}
                                error={errors[field.name]}
                                setErrors={setErrors}
                            />
                        );
                }
            })}
            {props.children}
        </form>
    );
});

export default Form;