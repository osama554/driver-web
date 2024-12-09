export default interface IRegistrationFormData {
    licensePlate: string;
    name: string;
    keysLeftAt: string;
    comments: string;
    photo: File | null;
    pickUpLocation: string;
    dropOffLocation: string;
}