"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Clock, User, Target, ArrowLeft } from "lucide-react";
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
    videoUrl: string;
    thumbnailUrl: string;
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
    const [marking, setMarking] = useState(false);

    useEffect(() => {
        fetchClass();
    }, [params.id]);

    const fetchClass = async () => {
        try {
            const response = await fetch(`/api/classes/${params.id}`);

            if (response.status === 403) {
                router.push('/pricing');
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch class');
            }

            const data = await response.json();
            setYogaClass(data.class);
            setProgress(data.progress);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const markAsComplete = async () => {
        if (!yogaClass) return;

        setMarking(true);
        try {
            const response = await fetch(`/api/classes/${params.id}/complete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ duration: yogaClass.duration }),
            });

            if (response.ok) {
                const data = await response.json();
                setProgress(data.progress);
            }
        } catch (err) {
            console.error('Failed to mark as complete:', err);
        } finally {
            setMarking(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-sage-200 border-t-sage-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sage-600">Loading class...</p>
                </div>
            </div>
        );
    }

    if (error || !yogaClass) {
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
                <Card className="p-8 text-center max-w-md">
                    <h2 className="text-2xl font-bold text-sage-900 mb-4">Class Not Found</h2>
                    <p className="text-sage-600 mb-6">{error || 'This class could not be found.'}</p>
                    <Link href="/classes">
                        <Button variant="primary">Browse Classes</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 bg-sage-50/50">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <Link href="/classes">
                    <Button variant="ghost" size="sm" className="mb-6">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Classes
                    </Button>
                </Link>

                {/* Video Player */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Card className="p-0 overflow-hidden">
                        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                            <iframe
                                src={yogaClass.videoUrl}
                                className="absolute top-0 left-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={yogaClass.title}
                            />
                        </div>
                    </Card>
                </motion.div>

                {/* Class Info */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-2"
                    >
                        <Card className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold font-display text-sage-900 mb-2">
                                        {yogaClass.title}
                                    </h1>
                                    <div className="flex items-center gap-4 text-sage-600">
                                        <span className="flex items-center gap-1">
                                            <User size={16} />
                                            {yogaClass.instructorName}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={16} />
                                            {yogaClass.duration} min
                                        </span>
                                    </div>
                                </div>
                                {progress?.completed && (
                                    <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                                        <CheckCircle size={16} />
                                        <span className="text-sm font-medium">Completed</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2 mb-6">
                                <span className="px-3 py-1 bg-terracotta-100 text-terracotta-700 rounded-full text-sm font-medium">
                                    {yogaClass.category}
                                </span>
                                <span className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-sm font-medium capitalize">
                                    {yogaClass.level}
                                </span>
                            </div>

                            <p className="text-sage-700 leading-relaxed mb-6">
                                {yogaClass.description}
                            </p>

                            {!progress?.completed && (
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={markAsComplete}
                                    disabled={marking}
                                    className="w-full md:w-auto"
                                >
                                    {marking ? 'Marking...' : 'Mark as Complete'}
                                </Button>
                            )}
                        </Card>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Goals */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold text-sage-900 mb-3">
                                Class Goals
                            </h3>
                            <div className="space-y-2">
                                {(typeof yogaClass.goals === 'string'
                                    ? JSON.parse(yogaClass.goals)
                                    : yogaClass.goals
                                ).map((goal: string) => (
                                    <div
                                        key={goal}
                                        className="flex items-center gap-2 text-sage-700"
                                    >
                                        <svg
                                            className="w-5 h-5 text-sage-500"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span className="capitalize">
                                            {goal.replace('_', ' ')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Stats */}
                        {progress && (
                            <Card className="p-6 bg-gradient-to-br from-sage-900 to-sage-800 text-white">
                                <h3 className="text-lg font-bold mb-4">Your Progress</h3>
                                <div className="space-y-3">
                                    <div>
                                        <div className="text-sm text-sage-200 mb-1">Status</div>
                                        <div className="text-xl font-bold">
                                            {progress.completed ? 'Completed' : 'In Progress'}
                                        </div>
                                    </div>
                                    {progress.completedAt && (
                                        <div>
                                            <div className="text-sm text-sage-200 mb-1">Completed On</div>
                                            <div className="text-sm">
                                                {new Date(progress.completedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
