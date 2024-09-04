import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGlobe, FaBriefcase } from 'react-icons/fa'; // Import icons from react-icons
import { Tooltip } from '@radix-ui/themes';

interface Job {
    name: string;
}

interface SelectedJob {
    job: Job;
}

interface JobLinkProps {
    selectedJob: SelectedJob;
}

const JobLink: React.FC<JobLinkProps> = ({ selectedJob }) => {
    const [showOptions, setShowOptions] = useState(false);

    if (!selectedJob?.job?.name) {
        return null;
    }

    const jobName = selectedJob.job.name;
    const encodedJobName = encodeURIComponent(jobName);

    const linkedInUrl = `https://www.linkedin.com/jobs/search/?currentJobId=3713575447&keywords=${encodedJobName}&origin=SWITCH_SEARCH_VERTICAL`;
    const jobStreetUrl = `https://id.jobstreet.com/id/${encodedJobName}-jobs`;
    const glintsUrl = `https://glints.com/id/opportunities/jobs/explore?keyword=${encodedJobName}&country=ID&locationName=All+Cities/Provinces`;

    const handleToggleOptions = () => {
        setShowOptions(prev => !prev);
    };

    return (
        <div className="flex items-center space-x-2" style={{ borderRadius: '15px' }}>
            <motion.button
                onClick={handleToggleOptions}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
            >
                Seek Job
            </motion.button>

            <AnimatePresence>
                {showOptions && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex space-x-2 ml-2"
                    >
                        <Tooltip content="LinkedIn!">
                            <motion.a
                                href={linkedInUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center"
                                whileHover={{ scale: 1.1 }}
                            >
                                <FaLinkedin size={24} />
                            </motion.a>
                        </Tooltip>
                        <Tooltip content="JobStreet!">
                            <motion.a
                                href={jobStreetUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center"
                                whileHover={{ scale: 1.1 }}
                            >
                                <FaBriefcase size={24} />
                            </motion.a>
                        </Tooltip>
                        <Tooltip content="Glints!">
                            <motion.a
                                href={glintsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center"
                                whileHover={{ scale: 1.1 }}
                            >
                                <FaGlobe size={24} />
                            </motion.a>
                        </Tooltip>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default JobLink;
