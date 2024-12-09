import { ButtonHTMLAttributes } from "react";

export default interface IThemeButtonProps {
    text: string;
    primary?: boolean;
    className?: string;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    onClick?: () => void;
}