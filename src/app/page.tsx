"use client";
import { memo } from "react";

import { RegistrationFormProvider } from "@/app/registration/formContextProvider/registrationFormContextProvider";
import Registration from "@/app/registration/registration";
import WizardContextProvider from "@/components/wizard/wizardContextProvider/wizardContextProvider";

const Home = memo(() => (
  <WizardContextProvider>
    <RegistrationFormProvider>
      <Registration />
    </RegistrationFormProvider>
  </WizardContextProvider>
));

export default Home;