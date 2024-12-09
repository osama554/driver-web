const registrationStyles = {
    logo: "w-[198px] h-[110px] lg:w-[150px] lg:h-[85px] cursor-pointer",
    header: (showHeader = false) => `${showHeader ? "flex" : "hidden lg:flex"} justify-center items-center pt-5 lg:py-5 shadow-none lg:shadow-lightBlack sticky top-0 bg-white z-20`,
    left_arrowWrapper: "lg:hidden flex bg-gradient-to-b from-paleLavendarMedium to-violet h-10 w-10 rounded-full justify-center items-center cursor-pointer mt-5 ml-[30px]",
    content: (isFull = false) => `${isFull ? "max-w-[1170px] lg:px-[30px] !px-0" : "max-w-[450px] pb-[30px]"} m-auto px-[30px] lg:px-0`,
    wrapper: "pb-[30px]"
};

export default registrationStyles;