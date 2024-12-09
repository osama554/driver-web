import { ChangeEvent, memo, useCallback, useMemo } from "react";

import FieldTypes from "@/components/form/enums/fieldTypes";
import Form from "@/components/form/form";
import Heading from "@/components/heading/heading";
import IFileFieldProps from "@/components/fileField/interfaces/IFileFieldProps";
import ITextFieldProps from "@/components/textField/interfaces/ITextFieldProps";
import ThemeButton from "@/components/themeButton/themeButton";
import useRegistrationFormContext from "@/app/registration/formContextProvider/useRegistrationFormContext";
import useWizardContext from "@/components/wizard/wizardContextProvider/useWizardContext";

import styles from "@/app/registration/additionalDetails/additionalDetails.styles";

type FieldType = ITextFieldProps | IFileFieldProps;

const AdditionalDetails = memo(() => {
    const { formData, updateFormValue } = useRegistrationFormContext();
    const { next, prev } = useWizardContext();

    const handleRemoveImage = useCallback(() => {
        updateFormValue("photo", null);
    }, [updateFormValue]);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const { name, files } = e.target;
            updateFormValue(name as keyof typeof formData, files[0]);
        } else {
            const { name, value } = e.target;
            updateFormValue(name as keyof typeof formData, value);
        }
    }, [updateFormValue]);

    const fields = useMemo((): FieldType[] => [
        {
            label: "Name",
            name: "name",
            type: FieldTypes.TextField,
            required: true,
            onChange,
            valueToAdded: formData.name
        },
        {
            label: "Keys Left At",
            name: "keysLeftAt",
            type: FieldTypes.TextField,
            required: true,
            onChange,
            valueToAdded: formData.keysLeftAt
        },
        {
            label: "Comments",
            name: "comments",
            type: FieldTypes.TextField,
            required: true,
            onChange,
            isTextArea: true,
            valueToAdded: formData.comments
        },
        {
            label: "Photo",
            required: true,
            name: "photo",
            onChange,
            type: FieldTypes.FileField,
            onRemove: handleRemoveImage,
            image: formData.photo
        }
    ], [onChange, formData.name, formData.keysLeftAt, formData.comments, formData.photo, handleRemoveImage]);

    const handleSubmit = useCallback(() => {
        next();
    }, [next]);

    return (
        <div className={styles.wrapper}>
            <Heading title="Additional Details" description="Please enter details below." />
            <Form fields={fields} onSubmit={handleSubmit} className={styles.reviewInformationInner}>
                <div className={styles.verificationButtonContainer}>
                    <ThemeButton text="Back" className={styles.verificationBackButton} onClick={prev} />
                    <ThemeButton text="Next" primary />
                </div>
            </Form>
        </div>
    );
});

export default AdditionalDetails;