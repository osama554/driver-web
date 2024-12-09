"use client";

import { memo, useCallback, useMemo, useState } from "react";
import Image from "next/image";

import AdditionalDetails from "@/app/registration/additionalDetails/aditionalDetails";
import IWizardItem from "@/components/wizard/interfaces/IWizardItem";
import License from "@/app/registration/license/license";
import Location from "@/components/location/location";
import Modal from "@/components/modal/modal";
import Review from "@/app/registration/review/review";
import Success from "@/app/registration/success/success";
import Summary from "@/app/registration/summary/summary";
import useWizardContext from "@/components/wizard/wizardContextProvider/useWizardContext";
import Verification from "@/app/registration/verification/verification";
import Wizard from "@/components/wizard/wizard";

import styles from "@/app/registration/registration.styles";

const stepTwo = 2;
const stepFour = 4;
const stepFive = 5;
const stepEight = 8;
const timeout = 1000;

const Registration = memo(() => {
    const [isLoading, setIsLoading] = useState(false);
    const { step, moveTo } = useWizardContext();

    useMemo(() => {
        if (step === stepTwo) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, timeout);
        }
    }, [step]);

    const prevStep = useCallback(() => {
        moveTo((prevState) => prevState - 1);
    }, [moveTo]);

    const wizardSteps = useMemo((): IWizardItem[] => [
        {
            content: <License />
        },
        {
            content: <Verification />
        },
        {
            content: <Review />
        },
        {
            content: <Location
                label="Pick up Location"
                name="pickUpLocation"
                requiredErrorMessage="Please enter Pick Up Location."
            />
        },
        {
            content: <Location
                label="Drop-off Location"
                name="dropOffLocation"
                requiredErrorMessage="Please enter Drop-off Location."
            />
        },
        {
            content: <AdditionalDetails />
        },
        {
            content: <Summary />
        },
        {
            content: <Success />
        }
    ], []);

    return (
        <div className={styles.wrapper}>
            {
                isLoading && <Modal
                    title="Verifying your information"
                    description="Please wait while we verify your license plate information."
                />
            }
            {
                step > stepFive && step !== stepEight &&
                <div className={styles.left_arrowWrapper} onClick={prevStep}>
                    <Image src="/assets/images/left_arrow.svg" width={7} height={13} alt="left-arrow" />
                </div>
            }
            <div className={styles.header(step < stepFour || step === stepEight)}>
                <Image src="/assets/images/logo.svg" width={0} height={0} alt="logo" className={styles.logo} onClick={() => moveTo(1)} />
            </div>
            <div className={styles.content(step === stepFour || step === stepFive ? true : false)}>
                <Wizard items={wizardSteps} />
            </div>
        </div>
    );
});

export default Registration;