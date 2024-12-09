import { memo } from "react";
import Image from "next/image";

import Heading from "@/components/heading/heading";
import SummaryDetails from "@/app/registration/summary/summaryDetails/summaryDetails";
import SummaryInner from "@/app/registration/summary/summaryInner/summaryInner";
import ThemeButton from "@/components/themeButton/themeButton";
import useRegistrationFormContext from "@/app/registration/formContextProvider/useRegistrationFormContext";
import useWizardContext from "@/components/wizard/wizardContextProvider/useWizardContext";

import styles from "@/app/registration/summary/summary.styles";

const stepFour = 4;
const stepFive = 5;
const stepSix = 6;

const Summary = memo(() => {
    const { formData } = useRegistrationFormContext();
    const { next, moveTo } = useWizardContext();

    return (
        <div className={styles.summaryWrapper}>
            <Heading title="Summary" description="Please review details below." />
            <div className={styles.summaryInner}>
                <SummaryDetails
                    title="Pickup Location"
                    details={formData.pickUpLocation}
                    onClick={() => moveTo(stepFour)}
                />
                <SummaryDetails
                    title="Drop-off Location"
                    details={formData.dropOffLocation}
                    onClick={() => moveTo(stepFive)}
                />
                <div className={styles.summaryCard}>
                    <div className={styles.summarCardTitle}>
                        <h2>Additional Details</h2>
                        <div className={styles.editButton} onClick={() => moveTo(stepSix)}>Edit</div>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.summaryInner}>
                        <SummaryInner title="Name" text={formData.name} />
                        <SummaryInner title="Key Left At" text={formData.keysLeftAt} />
                        <SummaryInner title="Comments" text={formData.comments} />
                        <div>
                            {formData.photo && <Image src={URL.createObjectURL(formData.photo)} width={165} height={74} alt="truck" />}
                        </div>
                    </div>
                </div>
                <ThemeButton text="Submit" primary className={styles.summaryButton} onClick={next} />
            </div>
        </div>
    );
});

export default Summary;