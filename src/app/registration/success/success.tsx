import { memo } from "react";
import Image from "next/image";

import styles from "@/app/registration/success/success.styles";

const Success = memo(() => (
    <div className={styles.successWrapper}>
        <Image src="/assets/images/check_mark.svg" width={80} height={80} alt="check_mark" />
        <h2 className={styles.successTitle}>Thank you!</h2>
        <p className={styles.sucessDescription}>Your request has been submitted!</p>
    </div>
));

export default Success;