"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle, Play, Activity, Calendar, Zap, Award } from "lucide-react";

// --- Data & Helpers ---

const BMI_CATEGORIES = {
    underweight: { label: "Underweight", color: "text-blue-500", bg: "bg-blue-500", range: "< 18.5" },
    normal: { label: "Normal Weight", color: "text-emerald-500", bg: "bg-emerald-500", range: "18.5 - 24.9" },
    overweight: { label: "Overweight", color: "text-orange-500", bg: "bg-orange-500", range: "25 - 29.9" },
    obese: { label: "Obese", color: "text-red-500", bg: "bg-red-500", range: "> 30" },
};

function getBMICategory(bmi: number) {
    if (bmi < 18.5) return BMI_CATEGORIES.underweight;
    if (bmi < 25) return BMI_CATEGORIES.normal;
    if (bmi < 30) return BMI_CATEGORIES.overweight;
    return BMI_CATEGORIES.obese;
}

const RECOMMENDATIONS = {
    weight_loss: {
        title: "Metabolic Boost & Flow",
        badge: "Fat Burn Focus",
        description: "A high-energy plan designed to ignite your metabolism and build lean muscle through dynamic flows.",
        stats: { intensity: "High", flexibility: "Medium", strength: "High" },
        day1: [
            { time: "07:00 AM", title: "Morning Metabolism Igniter", duration: "20 min", type: "video", img: "https://images.unsplash.com/photo-1544367563-12123d815d19?w=800&q=80" },
            { time: "06:00 PM", title: "Core Power Flow", duration: "35 min", type: "video", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80" },
        ]
    },
    flexibility: {
        title: "Deep Mobility Protocol",
        badge: "Join Health Focus",
        description: "Focused on unlocking tight hips, hamstrings, and shoulders through sustained holds and breathwork.",
        stats: { intensity: "Low", flexibility: "High", strength: "Low" },
        day1: [
            { time: "07:00 AM", title: "Sunrise Spine Awakening", duration: "15 min", type: "video", img: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80" },
            { time: "08:00 PM", title: "Deep Hip Openers", duration: "40 min", type: "video", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80" },
        ]
    },
    strength: {
        title: "Yogic Strength Builder",
        badge: "Muscle Tone Focus",
        description: "Blend of traditional asanas and calisthenics to build functional strength and stability.",
        stats: { intensity: "High", flexibility: "Low", strength: "High" },
        day1: [
            { time: "07:00 AM", title: "Warrior Sequence", duration: "30 min", type: "video", img: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&q=80" },
            { time: "06:00 PM", title: "Arm Balance Basics", duration: "25 min", type: "video", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80" },
        ]
    },
    stress: {
        title: "Mind-Body Restoration",
        badge: "Recovery Focus",
        description: "Gentle movements specifically curated to lower cortisol levels and improve sleep quality.",
        stats: { intensity: "Low", flexibility: "Medium", strength: "Low" },
        day1: [
            { time: "08:00 AM", title: "Gentle Morning Flow", duration: "20 min", type: "video", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80" },
            { time: "09:00 PM", title: "Yoga Nidra for Sleep", duration: "20 min", type: "audio", img: "https://images.unsplash.com/photo-1528319725582-ddc096101511?w=800&q=80" },
        ]
    },
    default: {
        title: "Balanced Foundations",
        badge: "Holistic Health",
        description: "The perfect starting point to build a consistent habit with a mix of strength and flexibility.",
        stats: { intensity: "Medium", flexibility: "Medium", strength: "Medium" },
        day1: [
            { time: "07:00 AM", title: "Sun Salutations A & B", duration: "15 min", type: "video", img: "https://images.unsplash.com/photo-1544367563-12123d815d19?w=800&q=80" },
            { time: "06:00 PM", title: "Evening Wind Down", duration: "20 min", type: "video", img: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80" },
        ]
    }
};

// --- Components ---

const AIMetrics = ({ bmi, label, color, bg }: { bmi: number, label: string, color: string, bg: string }) => (
    <Card variant="glass" className="p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10">
            <Activity size={100} />
        </div>
        <h3 className="text-sm uppercase tracking-wider text-sage-600 font-bold mb-4">Body Composition Analysis</h3>
        <div className="flex items-end gap-2 mb-2">
            <span className="text-5xl font-bold font-display text-sage-900">{bmi}</span>
            <span className="text-lg text-sage-500 mb-2">BMI</span>
        </div>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${bg} bg-opacity-10 ${color} mb-4`}>
            <span className={`w-2 h-2 rounded-full ${bg}`} />
            {label}
        </div>
        <div className="w-full bg-sage-100 rounded-full h-2 mt-2">
            <div
                className={`h-full rounded-full ${bg} transition-all duration-1000`}
                style={{ width: `${Math.min((bmi / 40) * 100, 100)}%` }}
            />
        </div>
        <p className="text-xs text-sage-500 mt-2 flex justify-between">
            <span>15.0</span>
            <span>40.0+</span>
        </p>
    </Card>
);

const PlanOverview = ({ plan }: { plan: any }) => (
    <Card variant="default" className="p-6 h-full bg-gradient-to-br from-white to-sage-50 border-sage-200">
        <div className="flex justify-between items-start mb-4">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Zap size={16} className="text-orange-500 fill-orange-500" />
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">{plan.badge}</span>
                </div>
                <h2 className="text-2xl font-bold font-display text-sage-900">{plan.title}</h2>
            </div>
            <div className="bg-sage-900 text-cream-50 p-2 rounded-lg">
                <Award size={24} />
            </div>
        </div>
        <p className="text-sage-700 text-sm leading-relaxed mb-6">
            {plan.description}
        </p>

        <div className="grid grid-cols-3 gap-2">
            {Object.entries(plan.stats).map(([k, v]) => (
                <div key={k} className="text-center p-2 bg-white rounded-lg border border-sage-100 shadow-sm">
                    <div className="text-[10px] uppercase text-sage-500 font-bold tracking-wider mb-1">{k}</div>
                    <div className="text-sm font-semibold text-sage-800">{v as string}</div>
                </div>
            ))}
        </div>
    </Card>
);

const DayOneRoutine = ({ routine }: { routine: any[] }) => (
    <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
            <Calendar size={20} className="text-sage-600" />
            <h3 className="text-lg font-bold text-sage-900">Your Day 1 Schedule</h3>
        </div>
        {routine.map((session, i) => (
            <Card key={i} variant="default" hover={true} className="p-0 overflow-hidden group cursor-pointer border-l-4 border-l-sage-500">
                <div className="flex">
                    <div className="w-32 h-24 relative flex-shrink-0">
                        <img src={session.img} alt={session.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                <Play size={12} className="text-sage-900 fill-sage-900 ml-0.5" />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-sage-500 flex items-center gap-1">
                                {session.time} • {session.duration}
                            </span>
                            <span className="text-[10px] bg-sage-100 text-sage-600 px-2 py-0.5 rounded-full uppercase font-bold">
                                {session.type}
                            </span>
                        </div>
                        <h4 className="font-semibold text-sage-800 group-hover:text-terracotta-500 transition-colors">
                            {session.title}
                        </h4>
                    </div>
                </div>
            </Card>
        ))}
    </div>
);

const LoadingState = () => {
    const [msg, setMsg] = useState("Analyzing body metrics...");

    useEffect(() => {
        const msgs = [
            "Analyzing body metrics...",
            "Calculating optimal BMI range...",
            "Selecting asanas for your goals...",
            "Building your personalized schedule..."
        ];
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % msgs.length;
            setMsg(msgs[i]);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
            <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-sage-200 rounded-full" />
                <div className="absolute inset-0 border-4 border-sage-500 rounded-full border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="text-sage-500 animate-pulse" size={32} />
                </div>
            </div>
            <h2 className="text-xl font-bold text-sage-800 animate-pulse">{msg}</h2>
        </div>
    );
};

const PlanContent = () => {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);

    // Params
    const goal = searchParams.get("goal") || "weight_loss";
    const bmi = parseFloat(searchParams.get("bmi") || "22.0");
    const weight = searchParams.get("weight");

    // Derived
    const category = getBMICategory(bmi);
    const plan = (RECOMMENDATIONS as any)[goal] || RECOMMENDATIONS.default;

    // Fake AI Loading
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <LoadingState />;

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 bg-sage-50/50">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage-900 text-cream-50 text-xs font-bold rounded-full mb-3 shadow-lg shadow-sage-900/20">
                            <Zap size={12} className="fill-current" /> AI GENERATED REPORT
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-display text-sage-900">
                            Your Personalized Plan
                        </h1>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-sm text-sage-500 font-medium">Validation ID: #YF-{Math.floor(Math.random() * 10000)}</p>
                        <p className="text-sm text-sage-500">Generated: {new Date().toLocaleDateString()}</p>
                    </div>
                </motion.div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    {/* Left Col - Stats & Overview */}
                    <div className="md:col-span-5 space-y-6">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            <PlanOverview plan={plan} />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                            <AIMetrics bmi={bmi} {...category} />
                        </motion.div>
                    </div>

                    {/* Right Col - Routine & Media */}
                    <div className="md:col-span-7 space-y-6">
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                            <DayOneRoutine routine={plan.day1} />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                            <Card variant="glass" className="p-6 bg-gradient-to-r from-sage-900 to-sage-800 text-white border-0">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                                    <div>
                                        <h3 className="text-2xl font-bold font-display mb-2">Claim Your Plan</h3>
                                        <p className="text-sage-200 text-sm max-w-sm">
                                            Unlock your full schedule, video library, and progress tracking with your free trial.
                                        </p>
                                    </div>
                                    <Link href="/sign-up?plan=custom">
                                        <Button variant="primary" size="xl" className="bg-white text-sage-900 hover:bg-cream-50 shadow-xl w-full sm:w-auto">
                                            Start Free Trial
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default function PlanPage() {
    return (
        <Suspense fallback={<LoadingState />}>
            <PlanContent />
        </Suspense>
    );
}
