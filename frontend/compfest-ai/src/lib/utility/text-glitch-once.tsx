"use client";

import { textGlitch } from "../animations/text-glitch";
import { useCallback, useEffect, useRef } from "react";

interface TextGlitchProps {
    textToGlitch: string;
    hover: boolean;
    enter: boolean;
}

export const TextGlitchOnce: React.FC<TextGlitchProps> = ({ textToGlitch, hover, enter }) => {
    const ref = useRef<HTMLParagraphElement | null>(null);

    const handleTextGlitch = useCallback((text: string, hidden: boolean = false) => {
        textGlitch({
            text: text,
            duration: 50,
            glitch: 2,
            hidden: hidden,
            callbackFn: (newText: any) => {
                if (ref.current) {
                    ref.current.innerText = newText;
                }
            },
        });
    }, []);

    useEffect(() => {
        if (enter && ref.current) {
            handleTextGlitch(textToGlitch);
        }
    }, [enter, handleTextGlitch, textToGlitch]);

    return (
        <div>
            <p
                className="uppercase text-5xl"
                ref={ref}
                onMouseEnter={() => handleTextGlitch(textToGlitch)}
            >
            </p>
        </div>
    );
};
