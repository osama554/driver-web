import { ChangeEvent, memo, useCallback, useMemo } from "react";

import FieldTypes from "@/components/form/enums/fieldTypes";
import Form from "@/components/form/form";
import Heading from "@/components/heading/heading";
import ITextFieldProps from "@/components/textField/interfaces/ITextFieldProps";
import ThemeButton from "@/components/themeButton/themeButton";
import useRegistrationFormContext from "@/app/registration/formContextProvider/useRegistrationFormContext";
import useWizardContext from "@/components/wizard/wizardContextProvider/useWizardContext";

import styles from "@/app/registration/license/license.styles";

const License = memo(() => {
    const { next } = useWizardContext();
    const { formData, updateFormValue } = useRegistrationFormContext();

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateFormValue(name as keyof typeof formData, value);
    }, [updateFormValue]);

    const fields = useMemo((): ITextFieldProps[] => [
        {
            label: "License Plate",
            name: "licensePlate",
            type: FieldTypes.TextField,
            required: true,
            onChange,
            requiredErrorMsg: "Please enter License Plate"
        }
    ], [onChange]);

    const handleSubmit = useCallback(() => {
        next();
    }, [next]);

    return (
        <>
            <Heading
                title="License Plate"
                description="Please enter your license plate number so we can verify your information."
            />
            <Form
                fields={fields}
                onSubmit={handleSubmit}
                className={styles.licenseInner}
            >
                <ThemeButton text="Next" primary />
            </Form>
        </>
    );
});

export default License;