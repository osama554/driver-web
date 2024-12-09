"use client";

import React, { createContext, memo, PropsWithChildren, useCallback, useState } from "react";

import IWizardContextProps from "@/components/wizard/wizardContextProvider/interfaces/IWizardContextProps";

export const WizardContext = createContext<IWizardContextProps>({
    step: 1,
    moveTo: () => { },
    next: () => { },
    prev: () => { },
});

const eight = 8;

const WizardContextProvider = memo((props: PropsWithChildren) => {
    const [step, setStep] = useState(1);

    const next = useCallback(() => {
        step <= eight && setStep((prevStep) => prevStep + 1);
    }, [step]);

    const prev = useCallback(() => {
        setStep((prevStep) => prevStep > 1 ? prevStep - 1 : 1);
    }, []);

    return (
        <WizardContext.Provider value={{ step, moveTo: setStep, next, prev }}>
            {props.children}
        </WizardContext.Provider>
    );
});

export default WizardContextProvider;