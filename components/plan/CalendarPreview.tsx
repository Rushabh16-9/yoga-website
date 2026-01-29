"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

interface DayClass {
    day: number;
    dayName: string;
    className: string;
    duration: number;
    difficulty: string;
    completed: boolean;
}

interface CalendarPreviewProps {
    weekClasses: DayClass[];
    onClassClick?: (day: number) => void;
}

export default function CalendarPreview({ weekClasses, onClassClick }: CalendarPreviewProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold font-display text-sage-800">
                    Your First Week
                </h3>
                <span className="text-sm text-sage-600 bg-sage-50 px-3 py-1 rounded-full">
                    Week 1 of 3
                </span>
            </div>

            <div className="grid gap-3">
                {weekClasses.map((dayClass, index) => (
                    <motion.div
                        key={dayClass.day}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card
                            variant={dayClass.completed ? "default" : "glass"}
                            hover={!dayClass.completed}
                            onClick={() => !dayClass.completed && onClassClick?.(dayClass.day)}
                            className={`cursor-pointer transition-all ${dayClass.completed
                                    ? 'opacity-60 cursor-default'
                                    : 'hover:shadow-lg'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                {/* Day indicator */}
                                <div className={`flex-shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center ${dayClass.completed
                                        ? 'bg-sage-100 text-sage-600'
                                        : 'bg-sage-500 text-white'
                                    }`}>
                                    <span className="text-xs font-medium uppercase">
                                        {dayClass.dayName}
                                    </span>
                                    <span className="text-2xl font-bold">
                                        {dayClass.day}
                                    </span>
                                </div>

                                {/* Class info */}
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-lg text-sage-900 truncate">
                                        {dayClass.className}
                                    </h4>
                                    <div className="flex items-center gap-3 mt-1 text-sm text-sage-600">
                                        <span className="flex items-center gap-1">
                                            ⏱️ {dayClass.duration} min
                                        </span>
                                        <span className="flex items-center gap-1">
                                            📊 {dayClass.difficulty}
                                        </span>
                                    </div>
                                </div>

                                {/* Status indicator */}
                                <div className="flex-shrink-0">
                                    {dayClass.completed ? (
                                        <div className="w-8 h-8 rounded-full bg-sage-500 flex items-center justify-center">
                                            <span className="text-white text-lg">✓</span>
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full border-2 border-sage-300" />
                                    )}
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Progress summary */}
            <div className="mt-6 p-4 bg-cream-100 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-sage-700">Week 1 Progress</span>
                    <span className="font-semibold text-sage-800">
                        {weekClasses.filter(c => c.completed).length} / {weekClasses.length} completed
                    </span>
                </div>
                <div className="mt-2 h-2 bg-sage-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-sage-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                            width: `${(weekClasses.filter(c => c.completed).length / weekClasses.length) * 100}%`
                        }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </div>
            </div>
        </div>
    );
}
