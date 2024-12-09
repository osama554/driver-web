import { memo } from "react";

import IThemeButtonProps from "@/components/themeButton/interfaces/IThemeButtonProps";

import styles from "@/components/themeButton/themeButton.styles";

const ThemeButton = memo((props: IThemeButtonProps) => {
    const { type = "submit", ...otherProps } = props;

    return (
        <button
            type={type}
            className={`${styles.button(otherProps.primary)} ${otherProps.className}`}
            onClick={props.onClick}
        >
            {otherProps.text}
        </button>
    );
});

export default ThemeButton;