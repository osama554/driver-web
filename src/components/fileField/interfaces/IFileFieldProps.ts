import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

import FieldTypes from "@/components/form/enums/fieldTypes";

export default interface IFileFieldProps {
    name: string;
    label: string;
    type: FieldTypes;
    error?: string;
    requiredErrorMsg?: string;
    validationMsg?: string;
    required?: boolean;
    image?: File | null;
    onChange?: (ChangeEventHandler<HTMLInputElement>);
    onRemove?: () => void;
    setErrors?: Dispatch<SetStateAction<Record<string, string>>>;
}