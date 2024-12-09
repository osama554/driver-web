import { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";

import FieldTypes from "@/components/form/enums/fieldTypes";

export default interface ITextFieldProps {
    name: string;
    label: string;
    type: FieldTypes;
    valueToAdded?: string;
    error?: string;
    requiredErrorMsg?: string;
    validationMsg?: string;
    required?: boolean;
    isTextArea?: boolean;
    icon?: string;
    disabled?: boolean;
    regx?: RegExp;
    ref?: RefObject<HTMLInputElement>;
    setErrors?: Dispatch<SetStateAction<Record<string, string>>>;
    onChange?(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}