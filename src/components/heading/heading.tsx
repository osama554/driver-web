import { memo } from "react";

import IHeadingProps from "@/components/heading/interfaces/IHeadingProps";

import styles from "@/components/heading/heading.styles";

const Heading = memo((props: IHeadingProps) => (
    <div className={styles.titleWrapper}>
        <h2 className={styles.title}>{props.title}</h2>
        {
            props.onRenderDescription
                ? props.onRenderDescription()
                : <p className={styles.description}>{props.description}</p>
        }
    </div>
));

export default Heading;