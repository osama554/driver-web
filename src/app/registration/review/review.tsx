import { memo } from "react";

import FieldTypes from "@/components/form/enums/fieldTypes";
import Heading from "@/components/heading/heading";
import TextField from "@/components/textField/textField";
import ThemeButton from "@/components/themeButton/themeButton";
import useRegistrationFormContext from "@/app/registration/formContextProvider/useRegistrationFormContext";
import useWizardContext from "@/components/wizard/wizardContextProvider/useWizardContext";

import styles from "@/app/registration/review/review.styles";

const Review = memo(() => {
    const { next } = useWizardContext();
    const { formData } = useRegistrationFormContext();

    return (
        <>
            <Heading title="Review Information" description="Please review details below." />
            <div className={styles.reviewInformationInner}>
                <TextField
                    label="License Plate"
                    disabled
                    name="licensePlate"
                    type={FieldTypes.TextField}
                    valueToAdded={formData.licensePlate}
                />
                <TextField
                    label="Make"
                    disabled
                    name="make"
                    type={FieldTypes.TextField}
                    valueToAdded="Ford"
                />
                <TextField
                    label="Model"
                    disabled
                    name="model"
                    type={FieldTypes.TextField}
                    valueToAdded="Super Duty F-550 DRW"
                />
                <ThemeButton text="Verify" primary onClick={next} className={styles.button} />
            </div>
        </>
    );
});

export default Review;