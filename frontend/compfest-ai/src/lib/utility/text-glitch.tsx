"use client"

import { textGlitch } from "../animations/text-glitch";
import { useCallback, useEffect, useRef } from "react";

interface TextGlitchProps {
    textToGlitch: string;
    hover: boolean;
}

export const TextGlitch: React.FC<TextGlitchProps> = ({ textToGlitch, hover }) => {
    const ref = useRef<HTMLParagraphElement | null>(null);

    const handleMouseEnter = useCallback((text: string) => {
        textGlitch({
            text: text,
            duration: 50,
            glitch: 2,
            callbackFn: (newText: any) => {
                if (ref.current) {
                    ref.current.innerText = newText;
                }
            },
        });
    }, []);


    useEffect(() => {
        if (ref.current) {
            textGlitch({
                text: text,
                duration: 50,
                glitch: 2,
                hidden: true,
                callbackFn: (newText: any) => {
                    if (ref.current) {
                        ref.current.innerText = newText;
                    }
                },
            });
        }
    }, [ref])

    const text = textToGlitch;
    // const text = 'Hover Me';
    return (
        <div>
            {hover ? <>
                <p
                    className="text-5xl"
                    ref={(el) => {
                        ref.current = el;
                    }}
                    onMouseEnter={() => handleMouseEnter(text)}
                >
                </p>
            </>
                :
                <>
                    <p
                        className="text-5xl"
                        ref={(el) => {
                            ref.current = el;
                        }}
                    >
                    </p>
                </>}
        </div>
    );
};