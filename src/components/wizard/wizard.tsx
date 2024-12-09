import { memo } from "react";

import IWizardProps from "@/components/wizard/interfaces/IWizardProps";
import useWizardContext from "@/components/wizard/wizardContextProvider/useWizardContext";

const Wizard = memo((props: IWizardProps) => {
    const { step } = useWizardContext();

    return (
        <div>
            {props.items[step - 1].content}
        </div>
    );
});

export default Wizard;