import { memo } from "react";

import ISummaryDetailsProps from "@/app/registration/summary/summaryDetails/interfaces/ISummaryDetailsProps";

import styles from "@/app/registration/summary/summaryDetails/summaryDetails.styles";

const SummaryDetails = memo((props: ISummaryDetailsProps) => (
    <div className={styles.summaryCard}>
        <div className={styles.summarCardTitle}>
            <h2>{props.title}</h2>
            <div className={styles.editButton} onClick={props.onClick}>Edit</div>
        </div>
        <p className={styles.summaryCardText}>{props.details}</p>
    </div>
));

export default SummaryDetails;