"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import LoadingState from "@/components/onboarding/LoadingState";

export type OnboardingData = {
    goal: string;
    experience: string;
    gender: string;
    age: number;
    height: number;
    weight: number;
    dailyTime: number; // 15, 30, or 60 minutes
    injuries: string[];
};

const initialData: OnboardingData = {
    goal: "",
    experience: "",
    gender: "",
    age: 0,
    height: 0,
    weight: 0,
    dailyTime: 0,
    injuries: [],
};

const STEPS = [
    {
        id: "goal",
        title: "What represents your main goal?",
        options: [
            { id: "weight_loss", label: "Weight Loss", icon: "🔥", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80" },
            { id: "flexibility", label: "Improve Flexibility", icon: "🧘‍♀️", image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=400&q=80" },
            { id: "strength", label: "Build Strength", icon: "💪", image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=400&q=80" },
            { id: "stress", label: "Reduce Stress", icon: "😌", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80" },
        ]
    },
    {
        id: "experience",
        title: "Have you practiced yoga before?",
        options: [
            { id: "beginner", label: "I'm a total beginner", description: "Never tried it / tried once" },
            { id: "intermediate", label: "I practice sometimes", description: "Know basic poses" },
            { id: "advanced", label: "I'm refreshing my practice", description: "Practiced regularly before" },
            { id: "pro", label: "I'm a pro", description: "Advanced practitioner" },
        ]
    },
    {
        id: "dailyTime",
        title: "How much time can you dedicate daily?",
        options: [
            { id: "15", label: "15 Minutes", description: "Quick daily practice", icon: "⏱️" },
            { id: "30", label: "30 Minutes", description: "Balanced routine", icon: "⏰", recommended: true },
            { id: "60", label: "60 Minutes", description: "Deep practice", icon: "🕐" },
        ]
    },
    {
        id: "measurements",
        title: "Let's personalize your plan",
        fields: ["gender", "age", "height", "weight"]
    }
];

export default function OnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState<OnboardingData>(initialData);
    const [direction, setDirection] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setDirection(1);
            setCurrentStep(prev => prev + 1);
        } else {
            // Show loading state
            setIsLoading(true);

            // Calculate BMI and generate plan
            setTimeout(() => {
                const bmi = data.weight / Math.pow(data.height / 100, 2);
                const params = new URLSearchParams({
                    ...data as any,
                    bmi: bmi.toFixed(1)
                });
                router.push(`/onboarding/plan?${params.toString()}`);
            }, 2500); // Show loading for 2.5 seconds
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleOptionSelect = (optionId: string) => {
        const stepId = STEPS[currentStep].id;

        // Parse dailyTime as integer
        if (stepId === "dailyTime") {
            setData(prev => ({ ...prev, [stepId]: parseInt(optionId) }));
        } else {
            setData(prev => ({ ...prev, [stepId]: optionId }));
        }

        handleNext(); // Auto advance on selection
    };

    const currentStepData = STEPS[currentStep];

    // Show loading state after completing all steps
    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-sage-50 to-cream-100">
                <div className="max-w-2xl mx-auto">
                    <LoadingState />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-sage-50 to-cream-100">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <div className="h-2 bg-sage-200 rounded-full">
                        <motion.div
                            className="h-full bg-sage-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <p className="text-right text-sm text-sage-600 mt-2">
                        Step {currentStep + 1} of {STEPS.length}
                    </p>
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentStep}
                        custom={direction}
                        initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smooth premium feel
                        }}
                    >
                        <h1 className="text-3xl md:text-4xl font-bold font-display text-center mb-8">
                            {currentStepData.title}
                        </h1>

                        {currentStepData.options && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {currentStepData.options.map((option) => (
                                    <Card
                                        key={option.id}
                                        variant="glass"
                                        hover={true}
                                        onClick={() => handleOptionSelect(option.id)}
                                        className={`cursor-pointer transition-all ${
                                            // @ts-ignore
                                            data[currentStepData.id] === option.id
                                                ? 'ring-2 ring-sage-500 bg-sage-50'
                                                : 'hover:bg-white/50'
                                            }`}
                                    >
                                        <div className="flex flex-col items-center text-center p-4">
                                            {'icon' in option && (
                                                <span className="text-4xl mb-4">{(option as any).icon}</span>
                                            )}
                                            {'image' in option && (
                                                <div className="w-full h-32 mb-4 rounded-lg overflow-hidden relative">
                                                    <img
                                                        src={(option as any).image}
                                                        alt={option.label}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <h3 className="font-semibold text-lg">{option.label}</h3>
                                            {'description' in option && (
                                                <p className="text-sm text-sage-600 mt-1">{(option as any).description}</p>
                                            )}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {currentStepData.id === "measurements" && (
                            <Card variant="default" className="p-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-sage-800 mb-2">Gender</label>
                                        <div className="flex gap-4">
                                            {['Female', 'Male', 'Other'].map(g => (
                                                <button
                                                    key={g}
                                                    onClick={() => setData(prev => ({ ...prev, gender: g }))}
                                                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${data.gender === g
                                                        ? 'border-sage-500 bg-sage-50 text-sage-800 font-medium'
                                                        : 'border-sage-200 text-sage-600 hover:border-sage-300'
                                                        }`}
                                                >
                                                    {g}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <Input
                                            label="Age"
                                            type="number"
                                            value={data.age || ''}
                                            onChange={(e) => setData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                                            placeholder="25"
                                        />
                                        <Input
                                            label="Height (cm)"
                                            type="number"
                                            value={data.height || ''}
                                            onChange={(e) => setData(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                                            placeholder="170"
                                        />
                                    </div>

                                    <Input
                                        label="Current Weight (kg)"
                                        type="number"
                                        value={data.weight || ''}
                                        onChange={(e) => setData(prev => ({ ...prev, weight: parseInt(e.target.value) }))}
                                        placeholder="70"
                                    />

                                    <Button
                                        variant="primary"
                                        size="lg"
                                        className="w-full mt-6"
                                        onClick={handleNext}
                                        disabled={!data.gender || !data.age || !data.height || !data.weight}
                                    >
                                        Generate My Plan
                                    </Button>
                                </div>
                            </Card>
                        )}
                    </motion.div>
                </AnimatePresence>

                {currentStep > 0 && (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={handleBack}
                            className="text-sage-600 hover:text-sage-800 font-medium flex items-center gap-2"
                        >
                            ← Back
                        </button>
                    </div>
                )}
            </div>
        </div >
    );
}
