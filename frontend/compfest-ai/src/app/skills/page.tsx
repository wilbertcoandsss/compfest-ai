"use client"

import Navbar from "@lib/components/navbar";
import Image from "next/image";
import React, { useRef, useState } from "react"
import { Parallax } from "react-scroll-parallax";
import "../../lib/styles/skills.css";
import { Input } from "@/components/ui/input";
import { CrossIcon, Terminal } from "lucide-react"
import ErrorMessage from "@lib/utility/error-msg";
import { TextParallax } from "@lib/utility/text-parallax";
import { Combobox } from "@/components/ui/combobox";
import { Checkbox } from "@/components/ui/checkbox";
import { Box, Card, IconButton, Select, Text } from "@radix-ui/themes";
import { TextGlitch } from "@lib/utility/text-glitch";
import { TextGlitchOnce } from "@lib/utility/text-glitch-once";
import { PiTrashSimpleThin } from "react-icons/pi";
import { FiTrash } from "react-icons/fi";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion"

export default function Skills() {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [qualif, setQualif] = useState("");
    const [enterGlitch, setEnterGlitch] = useState(false);
    const nextParallaxRef = useRef<HTMLDivElement | null>(null);
    const nextParallaxRef2 = useRef<HTMLDivElement | null>(null);
    const [contentText, setContentText] = useState("");
    const [skills, setSkills] = useState<string[]>([]);

    const addSkill = (skill: string) => {
        if (!skills.includes(skill)) {
            setSkills([...skills, skill]);
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };


    const nextName = (e: any) => {
        e.preventDefault();
        if (name == "") {
            setError("Are you trippin ? We didnt know your name yet :(")
        }
        else {
            setContentText("It is important for us to know your qualification limit!");
            setError("");
            nextParallaxRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const nextQualif = (e: any) => {
        e.preventDefault();
        if (qualif == "") {
            setError("Please choose your qualification!")
        }
        else {
            setError("");
            setContentText("Time for skills now!");
            setEnterGlitch(true);
            nextParallaxRef2.current?.scrollIntoView({ behavior: 'smooth' });
            // setEnterGlitch(false);
        }
    }

    return (
        <>
            <Navbar />
            <Parallax speed={35} className="flex items-center justify-center text-center font-restart text-5xl h-specific">
                Hi there!
                <br></br>
                <br></br>
                Welcome to FreakyNus!
            </Parallax>
            <Parallax speed={25} className="flex items-center justify-center text-center font-restart text-5xl h-specific">
                It's a one stop solution for you job seeker!
                <br></br>
                <br></br>
                Ready to dive in ? Get it now !
            </Parallax>
            <Parallax speed={15} className="flex items-center justify-center text-center font-restart text-5xl h-specific flex-col">
                We don't know each other yet!
                <br></br>
                <br></br>
                Who is your name?
                <div className="form">
                    <form action="" className="form__content">
                        <div className="form__box">
                            <Input type="text" className="form__input" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
                            <label className="form__label">ENTER NAME</label>
                            <div className="form__shadow"></div>
                        </div>
                        <div className="form__box">
                            <input type="Submit" className="form__submit" onClick={(e) => nextName(e)}>
                            </input>
                        </div>
                    </form>
                    {error &&
                        <ErrorMessage error={error} />
                    }
                </div>
            </Parallax>
            {/* <TextParallax /> */}
            <div ref={nextParallaxRef} className="flex flex-col items-center justify-center text-center h-specific my-10">
                <Parallax
                    speed={15}
                    ref={nextParallaxRef}
                    className="flex items-center justify-center text-center font-restart text-5xl"
                >
                    Welcome Aboard, {name}!
                    <br />
                    <br />
                </Parallax>
                <h1 className="font-restart text-2xl">First, you're a</h1>
                <br></br>
                <Select.Root onValueChange={(e) => setQualif(e)}>
                    <Select.Trigger placeholder="Choose your academic qualification!" />
                    <Select.Content className="font-restart" >
                        <Select.Group>
                            <Select.Item value="highschool">High School Student</Select.Item>
                            <Select.Item value="undergraduate">Undergraduate Student</Select.Item>
                            <Select.Item value="postgraduate">Postgraduate Master Student</Select.Item>
                            <Select.Item value="doctoral">Postgraduate Doctor Student</Select.Item>
                        </Select.Group>
                        <Select.Separator />
                    </Select.Content>
                </Select.Root>
                <br></br>
                <div className="form__box">
                    <input type="Submit" className="form__submit" onClick={(e) => nextQualif(e)}>
                    </input>
                </div>
                {error &&
                    <ErrorMessage error={error} />
                }
            </div>
            <br></br>
            <div ref={nextParallaxRef2} className="flex flex-col items-center justify-center text-center h-specific">
                <Parallax
                    speed={-20}
                    ref={nextParallaxRef2}
                    className="flex items-center justify-center text-center font-restart text-5xl flex-col"
                >
                    <br></br>
                    <br></br>
                    {enterGlitch ?
                        <>
                            <TextGlitchOnce textToGlitch={contentText} hover={false} enter={enterGlitch}></TextGlitchOnce>
                            <br></br>
                            <h1 className="font-restart text-2xl">You can choose skills above!</h1>
                        </>
                        :
                        <>
                            {contentText}
                        </>
                    }
                    <br></br>
                    <br />
                </Parallax>
                <br></br>
                <br></br>
                <br></br>
                <TextParallax onSkillClick={addSkill} />
                <br></br>
                <br></br>
                <br></br>
            </div>
            <Parallax
                speed={-10}
                className="flex items-center justify-center text-center font-restart flex-col h-96"
            >
                <h2 className="text-2xl font-bold">{name} skills:</h2>
                <h2 className="text-2xl font-bold">Selected Skills:</h2>
                <div className="flex flex-wrap gap-4 mt-4">
                    <AnimatePresence>
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex items-center gap-2 p-2 bg-gray-200 rounded"
                            >
                                <span>{skill}</span>
                                <button
                                    className="bg-red-500 text-white rounded-full px-2 py-1"
                                    onClick={() => removeSkill(skill)}
                                >
                                    x
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

            </Parallax>
            <div className="mt-8 h-80">
            </div>
        </>

    )
}
