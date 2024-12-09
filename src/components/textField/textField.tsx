"use client";

import { ChangeEvent, FocusEvent, ForwardedRef, forwardRef, memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";

import ITextFieldProps from "@/components/textField/interfaces/ITextFieldProps";

import styles from "@/components/textField/textFieldStyles";

const TextField = memo(
    forwardRef<HTMLInputElement | HTMLTextAreaElement, ITextFieldProps>((props, ref) => {
        const { isTextArea, setErrors, required, onChange, valueToAdded, requiredErrorMsg, ...otherProps } = props;
        const [value, setValue] = useState(valueToAdded || "");

        const onBlur = useCallback((e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value.trim();
            let err = "";

            if (required && !value) {
                err = requiredErrorMsg
                    || `Please enter ${props.label
                        ? props.label.toLowerCase()
                        : props.name?.toLowerCase()}.`;
            } else if (props.regx && !props.regx.test(value)) {
                err = "An entered value is not matching with the pattern.";
            }

            setErrors?.((prevErrors) => ({ ...prevErrors, [props.name]: err }));
        }, [required, props.regx, props.name, setErrors, props.label, requiredErrorMsg]);

        useEffect(() => {
            setValue(valueToAdded || "");
            setErrors?.((prevErrors) => ({ ...prevErrors, [props.name]: "" }));
        }, [valueToAdded, props.name, setErrors]);

        const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setValue(e.target.value);
            onChange && onChange(e);
        }, [onChange]);

        return (
            <div className={styles.wrapper}>
                <label className={styles.label}>
                    {props.label} {required && <span className={styles.required}>*</span>}
                </label>
                {
                    !isTextArea
                        ? <div className="relative">
                            {
                                props.icon
                                && <Image
                                    src={props.icon}
                                    width={14}
                                    height={17}
                                    alt="close"
                                    className={styles.icon}
                                />
                            }
                            <input
                                ref={ref as ForwardedRef<HTMLInputElement>}
                                className={styles.input(false, props.icon ? true : false)}
                                onBlur={onBlur}
                                value={value}
                                onChange={handleChange}
                                {...otherProps}
                            />
                            {props.error && <p className={styles.error(isTextArea)}>{props.error}</p>}
                        </div>
                        : <div>
                            <textarea
                                className={styles.input(props.isTextArea)}
                                {...otherProps}
                                onBlur={onBlur}
                                value={value}
                                onChange={handleChange}
                                {...otherProps}
                            />
                            {props.error && <p className={styles.error(isTextArea)}>{props.error}</p>}
                        </div>
                }
            </div>
        );
    })
);

export default TextField;