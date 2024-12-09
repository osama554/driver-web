const themeButtonStyles = {
    button: (primary = false) => `h-[54px] w-full text-center rounded-full font-semibold 
    ${primary ? "bg-paleLavender" : "bg-white"} border border-paleLavender hover:bg-paleLavendarMedium
    active:bg-paleLavendarDark hover:text-white active:text-white`,
};

export default themeButtonStyles;