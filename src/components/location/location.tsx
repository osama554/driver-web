import { Circle, GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { createRef, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import Image from "next/image";
import resolveConfig from "tailwindcss/resolveConfig";

import FieldTypes from "@/components/form/enums/fieldTypes";
import Form from "@/components/form/form";
import ILocationProps from "@/components/location/interfaces/ILocationProps";
import IRegistrationFormData from "@/app/registration/formContextProvider/interfaces/IRegistrationFormData";
import ITextFieldProps from "@/components/textField/interfaces/ITextFieldProps";
import tailwindConfig, { Colors } from "tailwind.config";
import ThemeButton from "@/components/themeButton/themeButton";
import useRegistrationFormContext from "@/app/registration/formContextProvider/useRegistrationFormContext";
import useWizardContext from "@/components/wizard/wizardContextProvider/useWizardContext";

import styles from "@/components/location/location.styles";
import "@/components/location/location.css";

const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: ["places", "maps", "marker"],
});

const containerStyle = {
    width: "100%",
    height: "100%",
};

const timeout = 2000;

const colors = resolveConfig(tailwindConfig).theme.colors as Colors;

const Location = memo((props: ILocationProps) => {
    const { formData, updateFormValue } = useRegistrationFormContext();
    const { prev, next } = useWizardContext();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [infoBox, setInfoBox] = useState<boolean>(true);
    const inputRef = useMemo(() => createRef<HTMLInputElement>(), []);
    const autocompleteRef = useRef<google.maps.places.Autocomplete>();
    const eventRef = useRef<google.maps.MapsEventListener>();
    const observerRef = useRef<MutationObserver | null>(null);
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    });

    const handlePlaceChange = useCallback(() => {
        if (autocompleteRef.current) {
            setLat(autocompleteRef.current.getPlace().geometry?.location?.lat() as number);
            setLng(autocompleteRef.current.getPlace().geometry?.location?.lng() as number);
            updateFormValue(
                props.name as keyof typeof formData,
                autocompleteRef.current.getPlace().formatted_address as string
            );
        }
    }, [props.name, updateFormValue]);

    const observeDropdownVisibility = useCallback(() => {
        const pacContainer = document.querySelector(".pac-container") as HTMLElement;

        if (pacContainer) {
            const observer = new MutationObserver(() => {
                const currentVisibility = getComputedStyle(pacContainer).display !== "none";
                setIsVisible((prev) => prev !== currentVisibility ? currentVisibility : prev);
            });

            observer.observe(pacContainer, {
                attributes: true,
            });

            observerRef.current = observer;
        }
    }, []);

    const handleAutocomplete = useCallback(async () => {
        if (inputRef.current) {
            const { Autocomplete } = await loader.importLibrary("places");
            autocompleteRef.current = new Autocomplete(inputRef.current);

            eventRef.current = autocompleteRef.current.addListener("place_changed", handlePlaceChange);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                observeDropdownVisibility();
            }, timeout);
        }
    }, [inputRef, handlePlaceChange, observeDropdownVisibility]);

    useEffect(() => () => eventRef.current?.remove(), []);

    useEffect(() => {
        handleAutocomplete();

        return () => {
            clearTimeout(timeoutRef.current);
            if (eventRef.current) {
                google.maps.event.removeListener(eventRef.current);
            }

            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [handleAutocomplete]);

    const fields = useMemo((): ITextFieldProps[] => [
        {
            label: props.label,
            name: props.name,
            type: FieldTypes.TextField,
            required: true,
            ref: inputRef,
            icon: "/pin.svg",
            requiredErrorMsg: props.requiredErrorMessage,
            valueToAdded: formData[props.name as keyof IRegistrationFormData] as string,
        }
    ], [formData, inputRef, props.label, props.name, props.requiredErrorMessage]);

    const handleSubmit = useCallback(() => {
        next();
    }, [next]);
    const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
        setLat(e.latLng?.lat() as number);
        setLng(e.latLng?.lng() as number);
    }, []);

    const handlePinDrag = useCallback((e: google.maps.MapMouseEvent) => {
        setLat(e.latLng?.lat() || 0);
        setLng(e.latLng?.lng() || 0);
    }, []);

    const center = useMemo(() => ({ lat, lng }), [lat, lng]);

    const options = useMemo(() => ({
        strokeColor: colors.silverSand,
        center,
        fillColor: "transparent",
    }), [center]);

    const onMapLoad = useCallback(() => {
        setIsMapLoaded(true);
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header} onClick={prev}>
                <Image src="/assets/images/left_arrow.svg" width={7} height={13} alt="left-arrow" />
            </div>
            <div className={styles.leftCol}>
                <div className={styles.leftColInner}>
                    {
                        infoBox &&
                        <div className={styles.infoBoxWrapper}>
                            <div className={styles.infoBoxInner}>
                                <Image src="/assets/images/pin_white.svg" width={13} height={15} alt="pin" />
                                <p className={styles.infoBoxText}>Adjust your pickup pointy within the area shown.</p>
                            </div>
                            <Image
                                src="/assets/images/cross_white.svg"
                                width={10}
                                height={10}
                                alt="cross"
                                onClick={() => setInfoBox(false)}
                                className={styles.cusorPointer}
                            />
                        </div>
                    }
                    <div className={styles.addressFormWrapper(isVisible)}>
                        <h2 className={styles.label}>{props.label}</h2>
                        <Form fields={fields} onSubmit={handleSubmit} className={styles.addressFormInner}>
                            <div className={styles.buttonsWrapper}>
                                <ThemeButton text="Back" className={styles.secondaryButton} onClick={prev} type="button" />
                                <ThemeButton text="Confirm" primary />
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            <div className={styles.rightCol}>
                {!isMapLoaded && <div className={styles.spinner}>
                    <Image src="/assets/images/loader.gif" width={101} height={85} alt="loader" />
                </div>}
                {isLoaded && <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    mapContainerClassName={styles.mapContainer}
                    onClick={handleMapClick}
                    onLoad={onMapLoad}

                >
                    <Circle radius={50} options={options} />
                    <Marker
                        position={center}
                        draggable
                        onDragEnd={handlePinDrag}
                        icon="/assets/images/map_pin.svg"
                    />
                </GoogleMap>
                }
            </div>
        </div>
    );
});

export default Location;