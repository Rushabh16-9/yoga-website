"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
    CheckCircle, Clock, User, Target, ArrowLeft, Play, Pause,
    RotateCcw, Info, List, Activity, ChevronRight, SkipForward, SkipBack, Volume2, VolumeX
} from "lucide-react";
import Link from "next/link";

interface YogaClass {
    id: string;
    title: string;
    description: string;
    instructorName: string;
    duration: number;
    level: string;
    category: string;
    goals: string[];
    thumbnailUrl: string;
}

interface SequenceStep {
    id: number;
    title: string;
    duration: number; // in seconds
    image: string;
    instruction: string;
    type: 'pose' | 'rest' | 'transition';
}

interface Progress {
    completed: boolean;
    completedAt: Date | null;
    duration: number;
}

export default function ClassPlayerPage() {
    const params = useParams();
    const router = useRouter();
    const [yogaClass, setYogaClass] = useState<YogaClass | null>(null);
    const [progress, setProgress] = useState<Progress | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Player State
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0); // Time left for CURRENT step
    const [isMuted, setIsMuted] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'sequence'>('sequence');

    // Mock Sequence Data
    const sequence: SequenceStep[] = [
        { id: 1, title: "Centering & Breath", duration: 60, type: 'pose', image: "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483079/yoga-api/10_wzpo85.png", instruction: "Sit comfortably and focus on your breath." },
        { id: 2, title: "Cat/Cow Warmup", duration: 60, type: 'pose', image: "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483082/yoga-api/8_sim2s7.png", instruction: "Inhale arch your back, exhale round your spine." },
        { id: 3, title: "Downward Facing Dog", duration: 45, type: 'pose', image: "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483081/yoga-api/15_vkviqn.png", instruction: "Press hips up and back, heels towards the mat." },
        { id: 4, title: "Rest", duration: 15, type: 'rest', image: "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483079/yoga-api/10_wzpo85.png", instruction: "Take a moment in Child's Pose." },
        { id: 5, title: "Warrior I (Right)", duration: 60, type: 'pose', image: "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/44_dqeayo.png", instruction: "Step right foot forward, arms up, hips square." },
        { id: 6, title: "Warrior II (Right)", duration: 60, type: 'pose', image: "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/45_ehimr1.png", instruction: "Open hips to side, gaze over front middle finger." },
        { id: 7, title: "Transition", duration: 10, type: 'transition', image: "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483081/yoga-api/15_vkviqn.png", instruction: "Step back to Downward Dog." },
        { id: 8, title: "Warrior I (Left)", duration: 60, type: 'pose', image: "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/44_dqeayo.png", instruction: "Step left foot forward, arms up." },
        { id: 9, title: "Tree Pose", duration: 45, type: 'pose', image: "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483094/yoga-api/41_veknug.png", instruction: "Balance on one leg, place foot on calf or thigh." },
        { id: 10, title: "Savasana", duration: 300, type: 'pose', image: "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483086/yoga-api/27_clrxzz.png", instruction: "Complete relaxation. Let go of all effort." },
    ];

    const currentStep = sequence[activeStepIndex];

    useEffect(() => {
        fetchClass();
    }, [params.id]);

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isPlaying && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (isPlaying && timeLeft === 0) {
            // Auto-advance
            if (activeStepIndex < sequence.length - 1) {
                handleStepChange(activeStepIndex + 1);
            } else {
                setIsPlaying(false); // End of class
                markAsComplete();
            }
        }
        return () => clearInterval(interval);
    }, [isPlaying, timeLeft, activeStepIndex]);

    const fetchClass = async () => {
        try {
            const response = await fetch(`/api/classes/${params.id}`);
            if (response.status === 403) { router.push('/pricing'); return; }
            if (!response.ok) throw new Error('Failed to fetch class');
            const data = await response.json();
            setYogaClass(data.class);
            setProgress(data.progress);

            // Initialize with first step duration
            setTimeLeft(sequence[0].duration);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleStepChange = (index: number) => {
        setActiveStepIndex(index);
        setTimeLeft(sequence[index].duration);
    };

    const togglePlay = () => setIsPlaying(!isPlaying);

    const nextStep = () => {
        if (activeStepIndex < sequence.length - 1) {
            handleStepChange(activeStepIndex + 1);
        }
    };

    const prevStep = () => {
        if (activeStepIndex > 0) {
            handleStepChange(activeStepIndex - 1);
        }
    };

    const markAsComplete = async () => {
        if (!yogaClass) return;
        try {
            await fetch(`/api/classes/${params.id}/complete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ duration: yogaClass.duration }),
            });
            // Ideally refresh progress state here
        } catch (err) {
            console.error('Failed to mark complete', err);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) return <div className="min-h-screen pt-24 flex justify-center"><div className="animate-spin w-10 h-10 border-4 border-sage-500 rounded-full border-t-transparent"></div></div>;
    if (!yogaClass) return null;

    return (
        <div className="min-h-screen pt-24 pb-32 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <Link href="/classes">
                    <Button variant="ghost" size="sm" className="mb-6 hover:bg-gray-200 transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Back to Classes
                    </Button>
                </Link>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* LEFT: Active Player Section */}
                    <div className="lg:col-span-2 flex flex-col shadow-2xl rounded-2xl overflow-hidden bg-white">

                        {/* 1. Main Visual Area (Video/Image) */}
                        <div className="relative bg-zinc-900 aspect-video md:aspect-[16/9] flex items-center justify-center overflow-hidden w-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full flex items-center justify-center p-8 relative z-10"
                                >
                                    <img
                                        src={currentStep.image}
                                        alt={currentStep.title}
                                        className="h-full w-auto object-contain drop-shadow-2xl"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Background Glow */}
                            <div className="absolute inset-0 z-0 opacity-20 blur-3xl scale-125 pointer-events-none">
                                <img src={currentStep.image} alt="" className="w-full h-full object-cover" />
                            </div>

                            {/* Overlay Text (Top Left) */}
                            <div className="absolute top-0 left-0 p-6 z-20 w-full bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
                                <h2 className="text-2xl md:text-3xl font-bold text-white font-display mb-1 text-shadow-sm">{currentStep.title}</h2>
                                <p className="text-zinc-200 text-sm md:text-base font-medium opacity-90">{currentStep.instruction}</p>
                            </div>

                            {/* Type Badge (Top Right) */}
                            <div className="absolute top-6 right-6 z-20 pointer-events-none">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${currentStep.type === 'rest' ? 'bg-blue-500 text-white' :
                                    currentStep.type === 'transition' ? 'bg-orange-500 text-white' :
                                        'bg-emerald-600 text-white'
                                    } shadow-lg`}>
                                    {currentStep.type}
                                </span>
                            </div>
                        </div>

                        {/* 2. Controls Bar (Separate Block) */}
                        <div className="bg-white border-t border-gray-100 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 z-20">

                            {/* Play/Pause & Timer */}
                            <div className="flex items-center gap-6 w-full md:w-auto justify-center md:justify-start">
                                <button
                                    onClick={togglePlay}
                                    className="group transform transition-transform active:scale-95"
                                >
                                    <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-xl group-hover:bg-black transition-colors">
                                        {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                                    </div>
                                </button>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Time Remaining</span>
                                    <div className={`text-4xl font-mono font-bold tracking-tight ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-zinc-800'}`}>
                                        {formatTime(timeLeft)}
                                    </div>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1.5 border border-gray-100">
                                <Button
                                    variant="ghost"
                                    onClick={prevStep}
                                    disabled={activeStepIndex === 0}
                                    className="h-10 w-12 hover:bg-white hover:shadow-sm transition-all"
                                >
                                    <SkipBack size={20} className="text-gray-600" />
                                </Button>
                                <div className="h-4 w-[1px] bg-gray-200 mx-1"></div>
                                <span className="text-sm font-bold text-gray-500 px-2 font-mono">
                                    {activeStepIndex + 1} <span className="text-gray-300">/</span> {sequence.length}
                                </span>
                                <div className="h-4 w-[1px] bg-gray-200 mx-1"></div>
                                <Button
                                    variant="ghost"
                                    onClick={nextStep}
                                    disabled={activeStepIndex === sequence.length - 1}
                                    className="h-10 w-12 hover:bg-white hover:shadow-sm transition-all"
                                >
                                    <SkipForward size={20} className="text-gray-600" />
                                </Button>
                            </div>
                        </div>

                        {/* Progress Bar (Current Exercise Time) */}
                        <div className="h-1.5 w-full bg-gray-100 relative">
                            <motion.div
                                className="h-full bg-emerald-500 origin-right"
                                initial={{ scaleX: 0 }}
                                animate={{
                                    scaleX: currentStep.duration ? ((currentStep.duration - timeLeft) / currentStep.duration) : 0
                                }}
                                transition={{ duration: 1, ease: "linear" }}
                            />
                        </div>
                    </div>

                    {/* RIGHT: Sequence List */}
                    <div className="flex flex-col gap-6 w-full">
                        <Card className="flex flex-col bg-white border border-gray-100 shadow-xl overflow-hidden rounded-2xl h-[600px]">
                            <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                    <List size={18} className="text-gray-500" />
                                    Class Sequence
                                </h3>
                                <div className="text-xs font-medium text-gray-400">
                                    {sequence.filter(s => s.type === 'pose').length} Poses
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                                {sequence.map((step, index) => (
                                    <div
                                        key={step.id}
                                        onClick={() => handleStepChange(index)}
                                        className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${index === activeStepIndex
                                            ? 'bg-zinc-900 text-white shadow-md'
                                            : 'hover:bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 bg-white rounded-md p-1 flex-shrink-0 overflow-hidden border ${index === activeStepIndex ? 'border-zinc-700' : 'border-gray-200'
                                            }`}>
                                            <img src={step.image} alt="" className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-sm truncate">{step.title}</div>
                                            <div className={`text-xs flex items-center gap-2 mt-0.5 ${index === activeStepIndex ? 'text-gray-400' : 'text-gray-400'
                                                }`}>
                                                <Clock size={10} />
                                                {formatTime(step.duration)}
                                                <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                                                <span>{step.type}</span>
                                            </div>
                                        </div>
                                        {index === activeStepIndex && (
                                            <div className="mr-2">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                            </div>
                                        )}
                                        {index < activeStepIndex && (
                                            <CheckCircle size={16} className="text-emerald-600 mr-2" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Instructor Card */}
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <img
                                src={`https://i.pravatar.cc/150?u=${yogaClass.instructorName}`}
                                alt={yogaClass.instructorName}
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                            />
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">{yogaClass.title}</h4>
                                <p className="text-xs text-gray-500 font-medium">Instructor: {yogaClass.instructorName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .text-shadow-sm { text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
            `}</style>
        </div>
    );
}
