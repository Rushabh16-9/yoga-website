"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { AlertCircle, Lock } from "lucide-react";

interface YogaClass {
    id: string;
    title: string;
    instructorName: string;
    duration: number;
    level: string;
    category: string;
    thumbnailUrl: string;
    description: string;
    goals: string[];
}

interface TrialStatus {
    subscription: any;
    isTrialActive: boolean;
    daysRemaining: number;
}

export default function ClassesPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("all");
    const [selectedDuration, setSelectedDuration] = useState("all");
    const [classes, setClasses] = useState<YogaClass[]>([]);
    const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTrialStatus();
        fetchClasses();
    }, []);

    const fetchTrialStatus = async () => {
        try {
            const response = await fetch('/api/subscription/trial');
            if (response.ok) {
                const data = await response.json();
                setTrialStatus(data);
            }
        } catch (err) {
            console.error('Failed to fetch trial status:', err);
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await fetch('/api/classes');

            if (response.status === 403) {
                setError('subscription_required');
                setLoading(false);
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch classes');
            }

            const data = await response.json();
            setClasses(data.classes || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const filteredClasses = classes.filter((classItem) => {
        const matchesSearch =
            classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            classItem.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel =
            selectedLevel === "all" || classItem.level === selectedLevel;
        const matchesDuration =
            selectedDuration === "all" ||
            (selectedDuration === "short" && classItem.duration <= 45) ||
            (selectedDuration === "medium" && classItem.duration > 45 && classItem.duration <= 60) ||
            (selectedDuration === "long" && classItem.duration > 60);

        return matchesSearch && matchesLevel && matchesDuration;
    });

    if (error === 'subscription_required') {
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
                <Card className="p-8 text-center max-w-md">
                    <Lock size={48} className="mx-auto mb-4 text-sage-500" />
                    <h2 className="text-2xl font-bold text-sage-900 mb-4">Subscription Required</h2>
                    <p className="text-sage-600 mb-6">
                        Start your 14-day free trial to access our complete library of yoga classes.
                    </p>
                    <Button variant="primary" onClick={() => router.push('/pricing')}>
                        Start Free Trial
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Trial Status Banner */}
                {trialStatus?.isTrialActive && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <Card variant="glass" className="p-4 bg-gradient-to-r from-terracotta-50 to-sage-50 border-terracotta-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="text-terracotta-600" size={20} />
                                    <div>
                                        <p className="font-semibold text-sage-900">
                                            Free Trial Active
                                        </p>
                                        <p className="text-sm text-sage-600">
                                            {trialStatus.daysRemaining} days remaining
                                        </p>
                                    </div>
                                </div>
                                <Button variant="secondary" size="sm" onClick={() => router.push('/pricing')}>
                                    Upgrade Now
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-bold font-display mb-4">
                        Explore Our <span className="gradient-text">Classes</span>
                    </h1>
                    <p className="text-xl text-sage-700 max-w-2xl mx-auto">
                        Find the perfect class for your practice level and schedule
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12"
                >
                    <Card variant="glass" className="p-6">
                        <div className="grid md:grid-cols-3 gap-4">
                            <Input
                                type="text"
                                placeholder="Search classes or instructors..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <select
                                value={selectedLevel}
                                onChange={(e) => setSelectedLevel(e.target.value)}
                                className="px-4 py-3 rounded-lg border-2 border-sage-200 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
                            >
                                <option value="all">All Levels</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                            <select
                                value={selectedDuration}
                                onChange={(e) => setSelectedDuration(e.target.value)}
                                className="px-4 py-3 rounded-lg border-2 border-sage-200 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
                            >
                                <option value="all">All Durations</option>
                                <option value="short">Short (≤45 min)</option>
                                <option value="medium">Medium (45-60 min)</option>
                                <option value="long">Long (60+ min)</option>
                            </select>
                        </div>
                    </Card>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 border-4 border-sage-200 border-t-sage-500 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-sage-600">Loading classes...</p>
                    </div>
                )}

                {/* Error State */}
                {error && error !== 'subscription_required' && (
                    <div className="text-center py-12">
                        <p className="text-xl text-sage-600">{error}</p>
                    </div>
                )}

                {/* Results Count */}
                {!loading && !error && (
                    <div className="mb-6 text-sage-700">
                        Showing {filteredClasses.length} of {classes.length} classes
                    </div>
                )}

                {/* Classes Grid */}
                {!loading && !error && (
                    <div className="bento-grid">
                        {filteredClasses.map((classItem, index) => (
                            <motion.div
                                key={classItem.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => router.push(`/classes/${classItem.id}`)}
                                className="cursor-pointer"
                            >
                                <Card variant="glow" className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow">
                                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                                        <img
                                            src={classItem.thumbnailUrl}
                                            alt={classItem.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 left-2 bg-terracotta-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {classItem.category}
                                        </div>
                                        <div className="absolute top-2 right-2 bg-sage-500 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                                            {classItem.level}
                                        </div>
                                    </div>
                                    <div className="flex-1 px-4 pb-4">
                                        <h3 className="text-2xl font-semibold mb-2">{classItem.title}</h3>
                                        <p className="text-sage-600 mb-2">with {classItem.instructorName}</p>
                                        <p className="text-sage-700 text-sm mb-4 line-clamp-2">{classItem.description}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-4 px-4 pb-4 border-t border-sage-100">
                                        <span className="text-sage-700 font-medium">⏱ {classItem.duration} min</span>
                                        <Button variant="primary" size="sm">
                                            Start Class
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* No Results */}
                {!loading && !error && filteredClasses.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-sage-600">
                            No classes found matching your criteria. Try adjusting your filters.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
