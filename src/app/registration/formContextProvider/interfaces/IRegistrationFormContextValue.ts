import IFormData from "@/app/registration/formContextProvider/interfaces/IRegistrationFormData";

export default interface IRegistrationFormContextValue {
    formData: IFormData;
    updateFormValue: (name: keyof IFormData, value: string | File | null) => void;
}