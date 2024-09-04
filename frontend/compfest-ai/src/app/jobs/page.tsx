"use client"

import Navbar from "@lib/components/navbar";
import { Box, Card, Dialog, Inset, Strong, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "@lib/styles/loader.css";
import { motion } from "framer-motion";
import googleImg from "@lib/assets/images/gugel.png";
import amazonImg from "@lib/assets/images/amazon.png";
import facebookImg from "@lib/assets/images/facebook.png";
import figmaImg from "@lib/assets/images/figma.png";
import msImg from "@lib/assets/images/ms.png";
import twitterImg from "@lib/assets/images/twitter.png";
import Image, { StaticImageData } from "next/image";
import JobLink from "@lib/components/joblink";

interface Skill {
    name: string;
}

interface Job {
    id: string;
    description: string;
    experience: string;
    name: string;
    qualifications: string;
    role: string;
    salary_range: string;
    skills: Skill[];
    cover: StaticImageData; // Assuming this is the correct type for your image data
    system: string;
    worktype: string;
    job: Job;
}

interface DataResponse {
    response: Job[];
}

export default function jobs() {
    const imageSources = [googleImg, amazonImg, facebookImg, figmaImg, msImg, twitterImg];
    const systemSources = ["Work From Home", "Work From Office", "Hybrid", "Remote"]
    const workTypeSources = ["Full-time", "Part-time", "Contract", "Freelance", "Outsource"];

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * imageSources.length);
        return imageSources[randomIndex];
    };

    const getRandomSystem = () => {
        const randomIndex = Math.floor(Math.random() * systemSources.length);
        return systemSources[randomIndex];
    }

    const getRandomWorkType = () => {
        const randomIndex = Math.floor(Math.random() * workTypeSources.length);
        return workTypeSources[randomIndex];
    }

    const [load, setLoad] = useState<boolean>(false);

    const containerVariants = {
        hidden: {
            opacity: 0,
            transition: {
                staggerChildren: 0.1, // Adjust the delay between items
            },
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Adjust the delay between items
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20, // Start below the container
        },
        visible: {
            opacity: 1,
            y: 0, // End at the original position
            transition: {
                duration: 0.5, // Animation duration for each item
            },
        },
    };

    const [recommendations, setRecommendations] = useState<Job[]>([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoad(true);
            const uniqueCred = localStorage.getItem('unique');
            try {
                const response = await fetch(`http://localhost:6969/job/v2/recommendations/${uniqueCred}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Add the `cover` attribute to each job
                const enhancedData = (data.response as Job[]).map((job: Job) => ({
                    ...job,
                    cover: getRandomImage(), // Add the random image as the cover
                    system: getRandomSystem(),
                    worktype: getRandomWorkType()
                }));
                setRecommendations(enhancedData);
            } catch (error) {
                // setError(error.message);
            } finally {
                setLoad(false);
            }
        };

        fetchRecommendations();
    }, []);

    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const handleOpenDialog = (job: Job) => {
        setSelectedJob(job);
    };

    const handleCloseDialog = () => {
        setSelectedJob(null);
    };

    return (
        <>
            <Navbar />
            {load ? (
                <>
                    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', zIndex: '5' }}>
                        <div className="loader">
                        </div>
                        <br /><br /><br /><br /><br /><br />
                        <h1 className="text-white font-restart text-2xl">
                            Catching your data...
                        </h1>
                    </div>
                </>
            ) : (
                <div className="mx-8 xl:mx-20">
                    <h1 className="font-restart text-3xl text-center">
                        Here are the recommendations from us!
                    </h1>
                    <div className="flex justify-around items-start flex-row">
                        <motion.ul
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="p-5 m-5 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5"
                        >
                            {recommendations.map((rec: any, index) => (
                                <motion.li key={index} variants={itemVariants} className="mr-4 last:mr-0 w-full h-full">
                                    <Box className="w-full h-full" style={{ border: 'none' }}>
                                        <Card size="2" variant="ghost">
                                            <motion.div
                                                className="w-80 bg-white rounded-lg shadow-lg p-5"
                                                whileHover={{ scale: 1.05 }} // Zoom in on hover
                                                whileTap={{ scale: 0.95 }} // Slight zoom out on click
                                                transition={{ type: 'spring', stiffness: 300 }}
                                                onClick={() => handleOpenDialog(rec)}
                                            >
                                                <div className="flex items-center gap-5">
                                                    <Image
                                                        src={rec.cover} // Replace with your image source
                                                        alt="Amazon"
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full"
                                                    />
                                                    <div>
                                                        <h2 className="font-bold text-lg">{rec.job.name}</h2>
                                                        <p className="text-sm text-gray-500">USA</p>
                                                    </div>
                                                </div>
                                                <h3 className="font-bold text-xl mt-4">{rec.job.role}</h3>
                                                <p className="text-gray-600 mt-2 line-clamp-5">
                                                    {rec.job.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                                                        {rec.job.experience}
                                                    </span>
                                                    <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                                                        {rec.job.qualifications}
                                                    </span>
                                                    <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                                                        {rec.worktype}
                                                    </span>
                                                    <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
                                                        {rec.system}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col justify-center items-start mt-5 gap-2">
                                                    <span className="text-blue-600 font-bold text-2xl">{rec.job.salary_range}/month</span>
                                                    <div className="flex justify-between w-full">
                                                        <button className="w-full text-nowrap bg-purple-600 text-white px-4 py-2 rounded-full text-sm">View Details</button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Card>
                                    </Box>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                    {/* Radix Dialog */}
                    <Dialog.Root open={!!selectedJob} onOpenChange={handleCloseDialog}>
                        <Dialog.Trigger>
                            <button className="hidden">Open Dialog</button>
                        </Dialog.Trigger>
                        <Dialog.Content className="fixed inset-0 flex items-center justify-center bg-black/50">
                            <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                                <Dialog.Title className="text-xl font-bold">Job Details</Dialog.Title>
                                {selectedJob && (
                                    <div>
                                        <div className="flex items-center gap-5">
                                            <Image
                                                src={selectedJob.cover} // Replace with your image source
                                                alt="Amazon"
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />
                                            <div>
                                                <h1 className="text-2xl font-semibold">{selectedJob.job.name}</h1>
                                                <h3 className="text-xl font-bold mt-4">{selectedJob.job.role}</h3>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mt-2">{selectedJob.job.description}</p>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                                                {selectedJob.job.experience}
                                            </span>
                                            <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                                                {selectedJob.job.qualifications}
                                            </span>
                                            <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                                                {selectedJob.worktype}
                                            </span>
                                            <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
                                                {selectedJob.system}
                                            </span>
                                        </div>

                                        <div className="flex justify-between w-full align-middle items-center">
                                            <button
                                                className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-full"
                                                onClick={handleCloseDialog}
                                            >
                                                Close
                                            </button>
                                            <div 
                                                className="mt-4 text-black px-4 py-2">
                                                <JobLink selectedJob={selectedJob} />

                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Dialog.Content>
                    </Dialog.Root>
                </div>
            )}
        </>
    )
}