"use client";

import React from "react";
import { motion } from "framer-motion";

interface LoadingStateProps {
    message?: string;
    progress?: number;
}

export default function LoadingState({
    message = "Calculating your custom 21-day flow...",
    progress = 0
}: LoadingStateProps) {
    const circumference = 2 * Math.PI * 45; // radius = 45
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
            {/* Circular Progress Bar */}
            <div className="relative w-32 h-32 mb-8">
                {/* Background circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="64"
                        cy="64"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-sage-200"
                    />
                    {/* Progress circle */}
                    <motion.circle
                        cx="64"
                        cy="64"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        className="text-sage-500"
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{
                            duration: 2.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                        style={{
                            strokeDasharray: circumference,
                        }}
                    />
                </svg>

                {/* Center icon */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center text-4xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    🧘‍♀️
                </motion.div>
            </div>

            {/* Loading message */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
            >
                <h3 className="text-2xl font-semibold font-display text-sage-800 mb-2">
                    {message}
                </h3>
                <p className="text-sage-600">
                    Analyzing your goals and preferences
                </p>
            </motion.div>

            {/* Animated dots */}
            <div className="flex gap-2 mt-6">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-2 bg-sage-500 rounded-full"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>

            {/* Subtle background animation */}
            <motion.div
                className="absolute inset-0 -z-10"
                animate={{
                    background: [
                        "radial-gradient(circle at 20% 50%, rgba(74, 103, 65, 0.05) 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 50%, rgba(74, 103, 65, 0.05) 0%, transparent 50%)",
                        "radial-gradient(circle at 20% 50%, rgba(74, 103, 65, 0.05) 0%, transparent 50%)",
                    ],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
