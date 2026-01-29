"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

interface InstructorData {
    name: string;
    title: string;
    bio: string;
    credentials: readonly string[];
    specialties: readonly string[];
    image: string;
}

interface InstructorProfileProps {
    instructor: InstructorData;
}

export default function InstructorProfile({ instructor }: InstructorProfileProps) {
    return (
        <Card variant="glass" className="overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Instructor image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0"
                >
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-sage-200 mx-auto md:mx-0">
                        <img
                            src={instructor.image}
                            alt={instructor.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>

                {/* Instructor info */}
                <div className="flex-1 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold font-display text-sage-900">
                            {instructor.name}
                        </h3>
                        <p className="text-sage-600 font-medium mt-1">
                            {instructor.title}
                        </p>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-sage-700 mt-3 leading-relaxed"
                    >
                        {instructor.bio}
                    </motion.p>

                    {/* Credentials */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-4"
                    >
                        <h4 className="text-sm font-semibold text-sage-800 mb-2">
                            Credentials
                        </h4>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {instructor.credentials.map((credential, index) => (
                                <span
                                    key={index}
                                    className="text-xs bg-sage-100 text-sage-700 px-3 py-1 rounded-full"
                                >
                                    {credential}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Specialties */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4"
                    >
                        <h4 className="text-sm font-semibold text-sage-800 mb-2">
                            Specialties
                        </h4>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {instructor.specialties.map((specialty, index) => (
                                <span
                                    key={index}
                                    className="text-xs bg-terracotta-100 text-terracotta-700 px-3 py-1 rounded-full"
                                >
                                    {specialty}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </Card>
    );
}
