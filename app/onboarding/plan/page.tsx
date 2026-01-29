"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import CalendarPreview from "@/components/plan/CalendarPreview";
import InstructorProfile from "@/components/plan/InstructorProfile";
import LoadingState from "@/components/onboarding/LoadingState";
import { INSTRUCTORS, YOGA_GOALS } from "@/lib/constants";

// Generate sample week data based on user's goal and daily time
function generateWeekPlan(goal: string, dailyTime: number, level: string) {
    const goalData = YOGA_GOALS[goal as keyof typeof YOGA_GOALS] || YOGA_GOALS.weight_loss;

    const weekClasses = [
        {
            day: 1,
            dayName: "Mon",
            className: `${goalData.label} Foundation`,
            duration: dailyTime,
            difficulty: level === "beginner" ? "Beginner" : level === "pro" ? "Advanced" : "Intermediate",
            completed: false,
        },
        {
            day: 2,
            dayName: "Tue",
            className: "Core Strength Flow",
            duration: dailyTime,
            difficulty: level === "beginner" ? "Beginner" : "Intermediate",
            completed: false,
        },
        {
            day: 3,
            dayName: "Wed",
            className: "Flexibility & Mobility",
            duration: dailyTime,
            difficulty: "All Levels",
            completed: false,
        },
        {
            day: 4,
            dayName: "Thu",
            className: `Power ${goalData.label}`,
            duration: dailyTime,
            difficulty: level === "beginner" ? "Intermediate" : "Advanced",
            completed: false,
        },
        {
            day: 5,
            dayName: "Fri",
            className: "Balance & Breathwork",
            duration: dailyTime,
            difficulty: "All Levels",
            completed: false,
        },
        {
            day: 6,
            dayName: "Sat",
            className: "Weekend Warrior Flow",
            duration: dailyTime + 15, // Longer weekend session
            difficulty: level === "beginner" ? "Intermediate" : "Advanced",
            completed: false,
        },
        {
            day: 7,
            dayName: "Sun",
            className: "Restorative Recovery",
            duration: Math.max(15, dailyTime - 15), // Shorter recovery session
            difficulty: "All Levels",
            completed: false,
        },
    ];

    return weekClasses;
}

function PlanContent() {
    const searchParams = useSearchParams();

    // Get onboarding data from URL params
    const goal = searchParams.get("goal") || "weight_loss";
    const experience = searchParams.get("experience") || "beginner";
    const dailyTime = parseInt(searchParams.get("dailyTime") || "30");
    const bmi = parseFloat(searchParams.get("bmi") || "22.0");
    const weight = searchParams.get("weight") || "70";
    const height = searchParams.get("height") || "170";
    const gender = searchParams.get("gender") || "Other";
    const age = searchParams.get("age") || "25";

    // Generate personalized plan
    const weekClasses = generateWeekPlan(goal, dailyTime, experience);
    const goalData = YOGA_GOALS[goal as keyof typeof YOGA_GOALS] || YOGA_GOALS.weight_loss;
    const primaryInstructor = INSTRUCTORS.primary;

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-cream-50 via-white to-sage-50">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-500 text-white text-sm font-bold rounded-full mb-4 shadow-lg">
                        <span className="text-lg">{goalData.icon}</span>
                        PERSONALIZED FOR YOU
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-sage-900 mb-3">
                        Your 21-Day Transformation Plan
                    </h1>
                    <p className="text-lg text-sage-700 max-w-2xl">
                        Based on your goal of <span className="font-semibold text-sage-800">{goalData.label}</span>,
                        we've created a personalized program with {dailyTime}-minute daily sessions
                        tailored for {experience} level practitioners.
                    </p>
                </motion.div>

                {/* Commitment Summary Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <Card variant="glass" className="p-6 bg-gradient-to-r from-sage-500 to-sage-600 text-white border-0">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold font-display mb-1">{dailyTime}</div>
                                <div className="text-sm text-sage-100">Minutes/Day</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold font-display mb-1">21</div>
                                <div className="text-sm text-sage-100">Days Total</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold font-display mb-1">{bmi}</div>
                                <div className="text-sm text-sage-100">Current BMI</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold font-display mb-1 capitalize">{experience}</div>
                                <div className="text-sm text-sage-100">Your Level</div>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Left Column - Calendar */}
                    <div className="md:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <CalendarPreview
                                weekClasses={weekClasses}
                                onClassClick={(day) => console.log(`Clicked day ${day}`)}
                            />
                        </motion.div>

                        {/* Goal Focus Areas */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6"
                        >
                            <Card variant="default" className="p-6">
                                <h3 className="text-xl font-bold font-display text-sage-900 mb-4">
                                    Your Focus Areas
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {[...goalData.focusAreas].map((area, index) => (
                                        <div key={index} className="text-center p-3 bg-sage-50 rounded-lg">
                                            <div className="text-2xl mb-2">✓</div>
                                            <div className="text-sm font-medium text-sage-800">{area}</div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Column - Instructor & CTA */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-lg font-bold text-sage-900 mb-3">Your Instructor</h3>
                            <InstructorProfile instructor={primaryInstructor} />
                        </motion.div>

                        {/* Start Plan CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card variant="default" className="p-6 bg-gradient-to-br from-terracotta-500 to-terracotta-600 text-white border-0">
                                <h3 className="text-2xl font-bold font-serif mb-3">
                                    Ready to Begin?
                                </h3>
                                <p className="text-terracotta-100 mb-6 text-sm">
                                    Start your 14-day free trial and get full access to your personalized plan,
                                    all classes, and progress tracking.
                                </p>
                                <Link href="/pricing">
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        className="w-full bg-white text-terracotta-600 hover:bg-cream-50 shadow-xl"
                                    >
                                        Start Free Trial →
                                    </Button>
                                </Link>
                                <p className="text-xs text-terracotta-100 mt-3 text-center">
                                    No credit card required
                                </p>
                            </Card>
                        </motion.div>

                        {/* Plan Benefits */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Card variant="glass" className="p-5">
                                <h4 className="font-semibold text-sage-900 mb-3 text-sm">
                                    What's Included:
                                </h4>
                                <ul className="space-y-2 text-sm text-sage-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-sage-500 mt-0.5">✓</span>
                                        <span>21-day personalized program</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-sage-500 mt-0.5">✓</span>
                                        <span>HD video classes</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-sage-500 mt-0.5">✓</span>
                                        <span>Progress tracking</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-sage-500 mt-0.5">✓</span>
                                        <span>Expert guidance</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-sage-500 mt-0.5">✓</span>
                                        <span>Mobile app access</span>
                                    </li>
                                </ul>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PlanPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-cream-50 to-sage-50"><LoadingState /></div>}>
            <PlanContent />
        </Suspense>
    );
}
