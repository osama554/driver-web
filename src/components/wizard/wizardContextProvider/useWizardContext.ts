import { useContext } from "react";

import { WizardContext } from "@/components/wizard/wizardContextProvider/wizardContextProvider";

const useWizardContext = () => useContext(WizardContext);

export default useWizardContext;