import { createPortal } from "react-dom";
import { memo } from "react";
import Image from "next/image";

import IModalProps from "@/components/modal/interfaces/IModalProps";

import styles from "@/components/modal/modal.styles";

const Modal = memo((props: IModalProps) => (
    <>
        {
            createPortal(
                <div className={styles.wrapper}>
                    <div className={styles.inner}>
                        <Image src="/assets/images/loader.gif" width={101} height={85} alt="loader" />
                        <div className={styles.content}>
                            <h2 className={styles.title}>{props.title}</h2>
                            <p className={styles.description}>{props.description}</p>
                        </div>
                    </div>
                </div>,
                document.body
            )
        }
    </>
));

export default Modal;