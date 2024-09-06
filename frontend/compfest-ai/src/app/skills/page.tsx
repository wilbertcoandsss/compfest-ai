"use client"

import Navbar from "@lib/components/navbar";
import Image from "next/image";
import React, { useRef, useState } from "react"
import { Parallax } from "react-scroll-parallax";
import "../../lib/styles/skills.css";
import { Input } from "@/components/ui/input";
import { CrossIcon, Terminal, TrashIcon } from "lucide-react"
import ErrorMessage from "@lib/utility/error-msg";
import { TextParallax } from "@lib/utility/text-parallax";
import { Combobox } from "@/components/ui/combobox";
import { Checkbox } from "@/components/ui/checkbox";
import { Box, Button, Callout, Card, Dialog, Flex, IconButton, Inset, Select, Separator, Table, Text, TextArea, TextField, Tooltip } from "@radix-ui/themes";
import { TextGlitch } from "@lib/utility/text-glitch";
import { TextGlitchOnce } from "@lib/utility/text-glitch-once";
import { PiTrashSimpleThin } from "react-icons/pi";
import { FiTrash } from "react-icons/fi";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion"
import { MdError } from "react-icons/md";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css';
import Loader from "@lib/utility/loader";
import "@lib/styles/loader.css";
import { usePathname, useRouter } from "next/navigation"
import { animatePageOut } from "@lib/animations/page-transitions";

type DegreeInfo = {
    fullForm: string;
    description: string;
};

const degreeInfo: Record<string, DegreeInfo> = {
    BCA: {
        fullForm: 'Bachelor of Computer Applications',
        description: 'An undergraduate degree focusing on computer applications and software development, providing foundational knowledge in IT and programming.',
    },
    BBA: {
        fullForm: 'Bachelor of Business Administration',
        description: 'An undergraduate degree focusing on business administration, marketing, and management principles.',
    },
    'B.Tech': {
        fullForm: 'Bachelor of Technology',
        description: 'An undergraduate engineering degree that covers various aspects of technology and its applications.',
    },
    'B.Com': {
        fullForm: 'Bachelor of Commerce',
        description: 'An undergraduate degree in commerce, focusing on subjects like accounting, finance, and business studies.',
    },
    BA: {
        fullForm: 'Bachelor of Arts',
        description: 'An undergraduate degree in the arts, covering humanities, social sciences, and languages.',
    },
    'M.Tech': {
        fullForm: 'Master of Technology',
        description: 'A postgraduate engineering degree focusing on advanced technological and engineering concepts.',
    },
    MBA: {
        fullForm: 'Master of Business Administration',
        description: 'A postgraduate degree focused on business management, finance, marketing, and entrepreneurship, preparing students for leadership roles.',
    },
    MCA: {
        fullForm: 'Master of Computer Applications',
        description: 'A postgraduate degree focusing on advanced computer science topics, software development, and IT management.',
    },
    'M.Com': {
        fullForm: 'Master of Commerce',
        description: 'A postgraduate degree focusing on advanced studies in commerce, finance, and business economics.',
    },
    PhD: {
        fullForm: 'Doctor of Philosophy',
        description: 'The highest level of academic degree, focusing on original research in a specific field of study.',
    },
};

export default function Skills() {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [qualif, setQualif] = useState("");
    const [graduateLevel, setGraduateLevel] = useState("");
    const [preference, setPreference] = useState("");
    const [credentials, setCredentials] = useState("");
    const [purpose, setPurpose] = useState("");

    const undergraduateOptions = ['BCA', 'BBA', 'B.Tech', 'B.Com', 'BA'];
    const masterOptions = ['M.Tech', 'MBA', 'MCA', 'M.Com'];
    const doctoralOptions = ['PhD'];

    // Determine which options to show based on the selected qualification
    let optionsToShow: string[] = [];
    if (graduateLevel === 'undergraduate') {
        optionsToShow = undergraduateOptions;
    } else if (graduateLevel === 'postgraduate') {
        optionsToShow = masterOptions;
    } else if (graduateLevel === 'doctoral') {
        optionsToShow = doctoralOptions;
    } else if (graduateLevel === 'student') {
        optionsToShow = [];
    }

    const [enterGlitch, setEnterGlitch] = useState(false);
    const nextParallaxRef = useRef<HTMLDivElement | null>(null);
    const nextParallaxRef2 = useRef<HTMLDivElement | null>(null);
    const nextParallaxRef3 = useRef<HTMLDivElement | null>(null);
    const nextParallaxRef4 = useRef<HTMLDivElement | null>(null);
    const nextParallaxRef5 = useRef<HTMLDivElement | null>(null);
    const [contentText, setContentText] = useState("");
    const [skills, setSkills] = useState<string[]>([]);
    const [newSkill, setNewSkill] = useState<string>("");
    const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const checkAllDataValid = (): boolean => {
        if (!name || !graduateLevel || !skills) {
            return false;
        }

        if (graduateLevel !== 'student' && !qualif) {
            return false;
        }

        return true;
    }

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    const addSkill = (skill: string) => {
        if (!skills.includes(skill)) {
            setSkills([...skills, skill]);
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleAddSkill = () => {
        if (!newSkill) {
            setError("Skills cannot be empty!");
            return;
        }
        setError("");
        addSkill(newSkill);
        setNewSkill(""); // Clear input field after adding the skill
        setIsInputVisible(false); // Hide input field after adding the skill
    };

    const nextName = (e: any) => {
        e.preventDefault();
        if (name == "") {
            setError("Are you trippin ? We didnt know your name yet :(")
        }
        else {
            setContentText("It is important for us to know your graduate level limit!");
            setError("");
            nextParallaxRef2.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const nextUnique = (e: any) => {
        e.preventDefault();
        if (credentials == "") {
            setError("You are the same with 1000+ million users. Make it unique!");
        }
        else {
            setError("");
            nextParallaxRef3.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const nextPref = (e: any) => {
        e.preventDefault();
        if (name == "") {
            setError("Please give us a lil bit of yourself :(")
        }
        else {
            setError("");
            nextParallaxRef4.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const nextGraduateLevel = (e: any) => {
        e.preventDefault();
        if (graduateLevel == "") {
            setError("Please choose your qualification!")
        }
        else {
            setError("");
            if (purpose === "findJob") {
                setContentText("Time for your skills now!");
            }
            else {
                setContentText("Select the skills that you want to improve!");
            }
            setEnterGlitch(true);
            nextParallaxRef5.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <>
            <Navbar />
            <Parallax speed={35} className="flex items-center justify-center text-center font-restart text-5xl h-specific">
                Hi there!
                <br></br>
                <br></br>
                Welcome to JobSeeker!
            </Parallax>
            <div ref={nextParallaxRef}>
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
                        </form>
                        {error &&
                            <ErrorMessage error={error} />
                        }
                    </div>
                    <br></br>
                    What are you looking for right now?
                    <br></br>
                    <div className="form">
                        <Select.Root size="3" onValueChange={(e) => setPurpose(e)}>
                            <Select.Trigger placeholder="Choose your purpose!" className="font-restart text-2xl font-medium w-full" />
                            <Select.Content className="font-restart text-2xl w-72">
                                <Select.Group>
                                    <Select.Item value="findJob" className="font-restart font-medium" style={{ fontSize: '16px' }}>Looking for Job!</Select.Item>
                                    <Select.Item value="findSkill" className="font-restart font-medium" style={{ fontSize: '16px' }}>Looking to upgrade Skills!</Select.Item>
                                </Select.Group>
                                <Select.Separator />
                            </Select.Content>
                        </Select.Root>
                        {error &&
                            <ErrorMessage error={error} />
                        }
                    </div>
                    <div className="form__box">
                        <input type="Submit" className="form__submit" onClick={(e) => nextName(e)}>
                        </input>
                    </div>
                </Parallax>
            </div>
            <div ref={nextParallaxRef2}>
                <Parallax speed={15} className="flex items-center justify-center text-center font-restart text-5xl h-specific flex-col">
                    Give us something unique credentials that makes you unique!
                    <br></br>
                    <br></br>
                    It can be your email, or any thing that unique!
                    <br></br>
                    Please dont use any symbol or special character as we can't proceed it!
                    <br></br>
                    <br></br>
                    <h5 className="text-4xl">Ex: webeganteng, aldenganteng, freakygantengnus123
                        <br></br>
                        <br></br>
                        Dont make it like webe#ganteng, webe#12345</h5>
                    <div className="form">
                        <form action="" className="form__content">
                            <div className="form__box">
                                <Input type="text" className="form__input" placeholder="Enter your unique credentials" onChange={(e) => setCredentials(e.target.value)} />
                                <label className="form__label">ENTER UNIQUE CREDENTIALS</label>
                                <div className="form__shadow"></div>
                            </div>
                            <div className="form__box">
                                <input type="Submit" className="form__submit" onClick={(e) => nextUnique(e)}>
                                </input>
                            </div>
                        </form>
                        {error &&
                            <ErrorMessage error={error} />
                        }
                    </div>
                </Parallax>
            </div>
            <div ref={nextParallaxRef3}>
                <Parallax speed={15} className="flex items-center justify-center text-center font-restart text-5xl h-specific flex-col">
                    Please tell us a short description about yourself!
                    <br></br>
                    <br></br>
                    <div className="text-3xl">
                        Please include your years of experience, background, current or past job, short job description, etc!
                    </div>
                    <br></br>
                    <TextArea className="font-restart w-96 justify-center flex align-middle items-center text-xl" resize="both" radius="full" variant="surface" placeholder="I am currently working as Cloud Engineer and have experience more than 8 years in this fields. I am expert in server setup and deployment...." onChange={(e) => setPreference(e.target.value)} />
                    <br></br>
                    <div className="form__box">
                        <input type="Submit" className="form__submit" onClick={(e) => nextPref(e)}>
                        </input>
                    </div>
                    {error &&
                        <ErrorMessage error={error} />
                    }

                </Parallax>
            </div>
            <div ref={nextParallaxRef4} className="flex flex-col items-center justify-center text-center h-specific my-10">
                <Parallax
                    speed={15}
                    className="flex items-center justify-center text-center font-restart text-5xl"
                >
                    Welcome Aboard, {name}!
                    <br />
                    <br />
                </Parallax>
                <h1 className="font-restart text-3xl">First, you're a</h1>
                <br></br>
                <Select.Root size="3" onValueChange={(e) => setGraduateLevel(e)}>
                    <Select.Trigger placeholder="Choose your academic qualification!" className="font-restart text-2xl font-medium w-full" />
                    <Select.Content className="font-restart text-2xl w-72">
                        <Select.Group>
                            <Select.Item value="student" className="font-restart font-medium" style={{ fontSize: '16px' }}>Highschool Student</Select.Item>
                            <Select.Item value="undergraduate" className="font-restart font-medium" style={{ fontSize: '16px' }}>Undergraduate Student</Select.Item>
                            <Select.Item value="postgraduate" className="font-restart font-medium" style={{ fontSize: '16px' }}>Postgraduate Master Student</Select.Item>
                            <Select.Item value="doctoral" className="font-restart font-medium" style={{ fontSize: '16px' }}>Postgraduate Doctor Student</Select.Item>
                        </Select.Group>
                        <Select.Separator />
                    </Select.Content>
                </Select.Root>
                <br></br>
                {graduateLevel && graduateLevel !== 'student' &&
                    <>
                        <h1 className="font-restart text-3xl">that graduates as</h1>
                        <br></br>
                        <Select.Root onValueChange={(e) => setQualif(e)}>
                            <Select.Trigger placeholder="Choose your academic qualification!" className="font-restart text-2xl font-medium w-full" />
                            <Select.Content className="font-restart text-2xl w-72">
                                <Select.Group>
                                    {optionsToShow.map((option) => (
                                        <Select.Item
                                            key={option}
                                            value={option}
                                            className="font-restart font-medium"
                                            style={{ fontSize: '16px' }}
                                        >
                                            {option}
                                        </Select.Item>
                                    ))}
                                </Select.Group>
                                <Select.Separator />
                            </Select.Content>
                        </Select.Root>
                        <br></br>

                        <Dialog.Root>
                            <Dialog.Trigger>
                                <h1 className="font-restart text-lg relative inline-block after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-current after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full cursor-pointer">
                                    What is that BCA, MBA, etc thingy?
                                </h1>
                            </Dialog.Trigger>
                            <Dialog.Content>
                                <Dialog.Title>Degree Information</Dialog.Title>
                                <Dialog.Description>
                                    Below is the detailed information about various degrees.
                                </Dialog.Description>

                                <div className="my-5">
                                    <Table.Root>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.ColumnHeaderCell>Degree</Table.ColumnHeaderCell>
                                                <Table.ColumnHeaderCell>Full Form</Table.ColumnHeaderCell>
                                                <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {Object.entries(degreeInfo).map(([degree, info]) => (
                                                <Table.Row key={degree}>
                                                    <Table.RowHeaderCell>{degree}</Table.RowHeaderCell>
                                                    <Table.Cell>{info.fullForm}</Table.Cell>
                                                    <Table.Cell>{info.description}</Table.Cell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table.Root>
                                </div>

                                <Flex gap="3" justify="end">
                                    <Dialog.Close>
                                        <Button color="gray" variant="solid" >
                                            Close
                                        </Button>
                                    </Dialog.Close>
                                </Flex>
                            </Dialog.Content>
                        </Dialog.Root>
                        <br />
                        <div className="form__box">
                            <input type="Submit" className="form__submit" onClick={(e) => nextGraduateLevel(e)}>
                            </input>
                        </div>
                        {error &&
                            <ErrorMessage error={error} />
                        }
                    </>
                }
                {graduateLevel === 'student' &&
                    <div className="form__box">
                        <input type="Submit" className="form__submit" onClick={(e) => nextGraduateLevel(e)}>
                        </input>
                    </div>
                }
            </div>
            <br></br>
            <div ref={nextParallaxRef5} className="flex flex-col items-center justify-center text-center h-specific">
                <Parallax
                    speed={-20}
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
                <h2 className="text-2xl font-medium font-restart">{name} skills:</h2>

                <div className="flex flex-wrap gap-4 mt-4 justify-center items-center">
                    <AnimatePresence>
                        {skills.map((skill) => (
                            <motion.div
                                key={skill}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex items-center gap-2 p-2 bg-neutral-200 rounded-xl uppercase font-medium justify-center border-2 border-neutral-500"
                            >
                                <span>{skill}</span>
                                <TrashIcon onClick={() => removeSkill(skill)} className="cursor-pointer w-5 h-5" />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <motion.button
                        onClick={() => setIsInputVisible(!isInputVisible)}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        initial={{ width: '40px', height: '40px', borderRadius: '50%' }}
                        animate={isHovered ? { width: '120px', height: '50px', borderRadius: '10px', backgroundColor: '#66676F' } : { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#80838D' }}
                        transition={{ duration: 0.25 }}
                        className="text-white relative overflow-hidden"
                    >
                        <motion.span
                            initial={{ opacity: 1 }}
                            animate={isHovered ? { opacity: 0 } : { opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 flex justify-center items-center"
                        >
                            {isInputVisible ?
                                <>
                                    -
                                </> :
                                <>
                                    +
                                </>}
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            className="absolute inset-0 flex justify-center items-center"
                        >
                            {isInputVisible ?
                                <>
                                    Minimize
                                </> :
                                <>
                                    Add Skills!
                                </>}
                        </motion.span>
                    </motion.button>

                    <AnimatePresence>
                        {isInputVisible && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="flex gap-4 items-center flex-row"
                                >
                                    <Flex direction="column" gap="3" maxWidth="250px">
                                        <TextField.Root
                                            variant="classic"
                                            placeholder="Enter a new skill…"
                                            value={newSkill}
                                            onChange={(e) => setNewSkill(e.target.value)}
                                            className="p-2 border rounded"
                                        />
                                        {error &&
                                            <Callout.Root size="2">
                                                <Callout.Icon>
                                                    <MdError />
                                                </Callout.Icon>
                                                <Callout.Text>
                                                    Skills cannnot be empty!
                                                </Callout.Text>
                                            </Callout.Root>

                                        }
                                    </Flex>
                                    <Button
                                        onClick={handleAddSkill}
                                        color="gray" variant="solid"
                                    >
                                        Add
                                    </Button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </Parallax>
            <br></br>
            <br></br>
            <div className="flex justify-center align-middle items-center flex-col font-restart font-medium p-2">
                <h1 className="font-restart font-medium text-3xl">
                    All data set ?
                </h1>
                <br></br>
                <Button style={{ fontSize: '17px' }} color="gray" variant="solid" onClick={toggleDrawer} disabled={!checkAllDataValid()}>
                    Review your data here!
                </Button>
            </div>
            <div className="mt-8 h-80 -z-10">
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='bottom'
                    className='flex justify-center items-center font-restart'
                    size={600}
                    enableOverlay={true}
                >
                    <div className="">
                        <AnimatePresence>

                            <motion.div
                                key="content"
                                initial={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5 }}
                                className='flex justify-center items-center flex-col gap-5'
                            >
                                <div>
                                    <h1 className="text-2xl font-medium">Hi, your name is {' '}
                                        <Tooltip content="Click to change!">
                                            <h1 onClick={() => {
                                                toggleDrawer()
                                                nextParallaxRef.current?.scrollIntoView({ behavior: 'smooth' });
                                            }} className="font-restart text-2xl font-medium relative inline-block after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-current after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full cursor-pointer text-neutral-500">
                                                {name}
                                            </h1>
                                        </Tooltip>
                                    </h1>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-medium">Currently, you are looking for {' '}
                                        <Tooltip content="Click to change!">
                                            <h1 onClick={() => {
                                                toggleDrawer()
                                                nextParallaxRef.current?.scrollIntoView({ behavior: 'smooth' });
                                            }} className="font-restart text-2xl font-medium relative inline-block after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-current after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full cursor-pointer text-neutral-500">
                                                {purpose === "findSkill" ? "upgrading skills" : "looking for a job"}
                                            </h1>
                                        </Tooltip>
                                    </h1>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-medium">Your unique credentials is {' '}
                                        <Tooltip content="Click to change!">
                                            <h1 onClick={() => {
                                                toggleDrawer()
                                                nextParallaxRef2.current?.scrollIntoView({ behavior: 'smooth' });
                                            }} className="font-restart text-2xl font-medium relative inline-block after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-current after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full cursor-pointer text-neutral-500">
                                                {credentials}
                                            </h1>
                                        </Tooltip>
                                    </h1>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-medium text-center">Your short description {' '}
                                        <Tooltip content="Click to change!">
                                            <h1 onClick={() => {
                                                toggleDrawer()
                                                nextParallaxRef3.current?.scrollIntoView({ behavior: 'smooth' });
                                            }} className="font-restart text-2xl font-medium relative inline-block after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-current after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full cursor-pointer text-neutral-500">
                                                {preference}
                                            </h1>
                                        </Tooltip>
                                    </h1>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-medium">You're a {' '}
                                        <Tooltip content="Click to change!">
                                            <h1 onClick={() => {
                                                toggleDrawer()
                                                nextParallaxRef4.current?.scrollIntoView({ behavior: 'smooth' });
                                            }} className="font-restart text-2xl font-medium relative inline-block after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-current after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full cursor-pointer text-neutral-500">
                                                {graduateLevel} {graduateLevel === 'student' ? "" : "student "}
                                            </h1>
                                        </Tooltip>
                                        {graduateLevel !== 'student' && (
                                            <>
                                                {' that graduates as '}
                                                <Tooltip content="Click to change!">
                                                    <h1
                                                        onClick={() => {
                                                            toggleDrawer();
                                                            nextParallaxRef4.current?.scrollIntoView({ behavior: 'smooth' });
                                                        }}
                                                        className="font-restart text-2xl font-medium relative inline-block after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-current after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full cursor-pointer text-neutral-500"
                                                    >
                                                        {qualif}
                                                    </h1>
                                                </Tooltip>
                                            </>
                                        )}
                                    </h1>
                                </div>
                                <h1 className="text-2xl font-medium">Your skills: </h1>
                                <AnimatePresence>
                                    <div className="flex flex-row flex-wrap items-center gap-2 p-2 rounded-xl uppercase font-medium justify-center">
                                        {skills.map((skill) => (
                                            <motion.div
                                                key={skill}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="flex flex-row items-center gap-2 p-2 bg-neutral-200 rounded-xl uppercase font-medium justify-center border-2 border-neutral-500"
                                            >
                                                <span>{skill}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </AnimatePresence>
                                <div className="flex justify-center items-center gap-5 flex-row">
                                    <Button onClick={() => {
                                        const fetchRecommendations = async () => {
                                            toggleDrawer();
                                            const jsonData = {
                                                name: name,
                                                purpose: purpose,
                                                credentials: credentials,
                                                graduate_level: graduateLevel,
                                                preference: preference,
                                                qualifications: qualif,
                                                skills: skills.map(skill => ({ name: skill }))
                                            };
                                            setLoading(true);
                                            try {
                                                const response = await fetch('https://compfest-ai.fly.dev/user/v1/preference', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify(jsonData),
                                                });
                                                if (!response.ok) {
                                                    throw new Error('Network response was not ok');
                                                }
                                                localStorage.setItem('unique', credentials);
                                            } catch (error) {
                                                // setError(error.message);
                                            } finally {
                                                setLoading(false);
                                                await animatePageOut('/jobs', router);
                                            }
                                        };

                                        fetchRecommendations();
                                    }
                                    }
                                        color="gray" variant="solid" >See Suggestion!</Button>
                                </div>
                            </motion.div>

                        </AnimatePresence>
                    </div>
                </Drawer >
            </div >
            {loading && (
                <>
                    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', zIndex: '15' }}>
                        <div className="loader">
                        </div>
                        <br /><br /><br /><br /><br /><br />
                        <h1 className="text-white font-restart text-2xl">
                            Sending your data...
                        </h1>
                    </div>
                </>
            )}
        </>

    )
}
