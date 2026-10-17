import { useEffect, useState } from "react";

/** True on phones held sideways (wide and shorter than 550px). */
export const useIsLandscapePhone = () => {
    const [isLandscapePhone, setIsLandscapePhone] = useState(false);

    useEffect(() => {
        const check = () =>
            setIsLandscapePhone(window.innerWidth > window.innerHeight && window.innerHeight < 550);
        check();
        window.addEventListener("resize", check);
        window.addEventListener("orientationchange", check);
        return () => {
            window.removeEventListener("resize", check);
            window.removeEventListener("orientationchange", check);
        };
    }, []);

    return isLandscapePhone;
};
