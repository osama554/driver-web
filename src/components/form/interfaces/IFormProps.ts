import { FormEvent } from "react";

import ITextFieldProps from "@/components/textField/interfaces/ITextFieldProps";

export type Field = ITextFieldProps;

export default interface IFormProps {
    fields: Omit<Field, "error" | "setErrors">[];
    id?: string;
    defaultFlexBasis?: boolean;
    className?: string;
    disableScroll?: boolean;
    onChange?(e: FormEvent<HTMLFormElement>): void;
    onSubmit(fieldValues: Record<string, string>): void;
}