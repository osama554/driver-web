export default interface IWizardContextProps {
    step: number;
    moveTo: React.Dispatch<React.SetStateAction<number>>;
    next: () => void;
    prev: () => void;
}