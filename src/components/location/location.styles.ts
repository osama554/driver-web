const locationStyles = {
    wrapper: "flex flex-col-reverse lg:flex-row lg:py-[50px] gap-[70px] lg:h-full lg:px-[30px] mb-[-30px]",
    header: "lg:hidden flex bg-gradient-to-b from-paleLavendarMedium to-violet h-10 w-10 rounded-full justify-center items-center absolute left-[30px] cursor-pointer z-10 top-[20px]",
    leftCol: "lg:w-2/5 w-full absolute lg:relative z-10 bottom-0",
    leftColInner: "w-full m-auto",
    infoBoxWrapper: "bg-black px-[15px] py-2.5 rounded-[10px] flex items-center gap-2.5 justify-between mb-5 mx-[15px] lg:mx-0",
    infoBoxInner: "flex gap-2.5 items-center",
    infoBoxText: "text-sm text-white",
    cusorPointer: "cursor-pointer",
    addressFormWrapper: (isVisible = false) => `${isVisible ? "h-[500px]" : "h-auto"} bg-white lg:px-0 px-[30px] py-[30px] lg:pb-[30px] lg:pt-0 rounded-t-[40px]`,
    addressFormInner: "flex flex-col gap-[30px] mt-2.5",
    label: "text-[32px] leading-[48px] font-semibold",
    buttonsWrapper: "flex gap-5",
    secondaryButton: "hidden lg:block",
    rightCol: "lg:w-3/5 w-full h-[70svh] lg:h-[calc(100vh-225px)] relative",
    mapContainer: "[&_.gmnoprint]:hidden [&_button]:hidden [&_a]:hidden",
    spinner: "absolute top-0 left-0 z-10 bg-black/50 flex items-center justify-center w-full h-[100vh] lg:h-full",
    towCompany: "absolute top-[80px] w-[calc(100%_-_60px)] left-[30px] h-[54px] p-3 rounded-[10px] bg-white z-10 grid gap-2.5 items-center text-sm grid-cols-[auto_1fr_auto] [&_.cursor-pointer]:invert"
};

export default locationStyles;