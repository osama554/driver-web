import { useContext } from "react";

import { RegistrationFormContext } from "@/app/registration/formContextProvider/registrationFormContextProvider";

const useRegistrationFormContext = () => useContext(RegistrationFormContext);

export default useRegistrationFormContext;