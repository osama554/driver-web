import { memo } from "react";

import ISummaryInnerProps from "@/app/registration/summary/summaryInner/interfaces/ISummaryInnerProps";

import styles from "@/app/registration/summary/summaryInner/summaryInner.styles";

const SummaryInner = memo((props: ISummaryInnerProps) => (
    <div className={styles.summaryAdditionalDetailsWrapper}>
        <span className={styles.summaryAdditionalDetailsTitle}>{props.title}</span>
        <span className={styles.summaryCardText}>{props.text}</span>
    </div>
));

export default SummaryInner;