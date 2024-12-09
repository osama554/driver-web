const textFieldStyles = {
    wrapper: "flex flex-col gap-2.5",
    required: "text-red",
    input: (textArea = false, isImage = false) => `border px-5 w-full 
    ${textArea ? "h-[114px] rounded-[24px] py-[15px]" : "h-[54px] rounded-full"}
    ${isImage ? "pl-10" : ""}`,
    icon: "absolute top-5 left-5",
    error: (isTextArea = false) => `${isTextArea ? "mt-5px" : "my-1.5"} text-red text-[10px] min-h-[15px] text-left`,
    label: "text-sm"
};

export default textFieldStyles;