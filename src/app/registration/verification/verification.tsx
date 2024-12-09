import { memo, useState } from "react";
import OtpInput from "react-otp-input";

import Heading from "@/components/heading/heading";
import ThemeButton from "@/components/themeButton/themeButton";
import useWizardContext from "@/components/wizard/wizardContextProvider/useWizardContext";

import styles from "@/app/registration/verification/verification.styles";

const Verification = memo(() => {
    const { next } = useWizardContext();
    const [otp, setOtp] = useState("");

    return (
        <>
            <Heading
                title="Verification"
                onRenderDescription={() => <p className={styles.description}>
                    Please enter the 6-digit code provided by your dispatch manager.
                    To receive your code, call&nbsp;
                    <a href="tel:1-800-123-567" className={styles.phoneNumber}>1-800-123-567</a> for assistance.
                </p>}
            />
            <div className={styles.verificationInner}>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} className={styles.otpInputField} />}
                    containerStyle={styles.otpContainer}
                />
                <div className={styles.verificationButtonContainer}>
                    <ThemeButton text="Next" primary onClick={next} />
                </div>
            </div>
        </>
    );
});

export default Verification;