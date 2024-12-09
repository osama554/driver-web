"use client";

import React, { createContext, PropsWithChildren, useCallback, useState } from "react";

import IFormContextValue from "@/app/registration/formContextProvider/interfaces/IRegistrationFormContextValue";
import IRegistrationFormData from "@/app/registration/formContextProvider/interfaces/IRegistrationFormData";

const initailValue: IRegistrationFormData = {
    licensePlate: "",
    name: "",
    keysLeftAt: "",
    comments: "",
    photo: null,
    pickUpLocation: "",
    dropOffLocation: ""
};

export const RegistrationFormContext = createContext<IFormContextValue>({
    formData: initailValue,
    updateFormValue() { }
});

export const RegistrationFormProvider = (props: PropsWithChildren) => {
    const [formData, setFormData] = useState(initailValue);

    const updateFormValue = useCallback((name: keyof IRegistrationFormData, value: string | File | null) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    return (
        <RegistrationFormContext.Provider value={{ formData, updateFormValue }}>
            {props.children}
        </RegistrationFormContext.Provider>
    );
};