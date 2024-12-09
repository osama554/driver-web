import { ReactNode } from "react";

export default interface IHeadingProps {
    title: string;
    description?: string;
    onRenderDescription?: () => ReactNode;
}