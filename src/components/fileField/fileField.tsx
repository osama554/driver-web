import { ChangeEvent, memo, useCallback } from "react";
import Image from "next/image";

import IFileFieldProps from "@/components/fileField/interfaces/IFileFieldProps";

import styles from "@/components/fileField/fileField.styles";

const FileField = memo((props: IFileFieldProps) => {
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.setErrors?.((prevErrors) => ({ ...prevErrors, [props.name]: "" }));
        props.onChange?.(e);
    }, [props]);

    return (
        <div className={styles.wrapper}>
            <label>{props.label} {props.required && <span className={styles.required}>*</span>}</label>
            <div className={styles.inputWrapper}>
                {
                    props.image
                        ? <>
                            <Image
                                src="/cross.svg"
                                width={15}
                                height={15}
                                alt="cross"
                                className={styles.cross}
                                onClick={props.onRemove}
                            />
                            <Image src={URL.createObjectURL(props.image)} height={83} width={150} alt="truck" className={styles.image} />
                        </>
                        : <div className={styles.fieldWrapper}>
                            <Image src="/upload.svg" height={25} width={26} alt="upload" className={styles.fieldIcon} />
                            <p className={styles.imageText}>
                                Drag and drops to file upload or <span className={styles.fieldTitle}>browser</span>
                            </p>
                            <p className={styles.fieldDescription}>Supported file: png, jpeg</p>
                        </div>
                }
                <input
                    key={props.name}
                    type="file"
                    className={styles.input}
                    onChange={onChangeHandler}
                    hidden={props.image ? true : false}
                    name={props.name}
                />
            </div>
            {props.error && <p className={styles.error}>{props.error}</p>}
        </div>
    );
});

export default FileField;