"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ClassesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("all");
    const [selectedDuration, setSelectedDuration] = useState("all");

    const classes = [
        {
            id: 1,
            title: "Morning Flow",
            instructor: "Sarah Chen",
            duration: 45,
            level: "beginner",
            category: "Vinyasa",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
            description: "Start your day with energizing sun salutations and gentle flows",
        },
        {
            id: 2,
            title: "Power Vinyasa",
            instructor: "Michael Rodriguez",
            duration: 60,
            level: "intermediate",
            category: "Vinyasa",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
            description: "Build strength and stamina with dynamic sequences",
        },
        {
            id: 3,
            title: "Restorative Evening",
            instructor: "Emma Thompson",
            duration: 30,
            level: "all",
            category: "Restorative",
            image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&q=80",
            description: "Unwind and relax with gentle poses and deep breathing",
        },
        {
            id: 4,
            title: "Yin Yoga Deep Stretch",
            instructor: "Lisa Wang",
            duration: 75,
            level: "all",
            category: "Yin",
            image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80",
            description: "Hold poses longer to release deep tension and improve flexibility",
        },
        {
            id: 5,
            title: "Ashtanga Primary Series",
            instructor: "Raj Patel",
            duration: 90,
            level: "advanced",
            category: "Ashtanga",
            image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80",
            description: "Traditional Ashtanga practice with synchronized breath and movement",
        },
        {
            id: 6,
            title: "Hatha Basics",
            instructor: "Jennifer Lee",
            duration: 45,
            level: "beginner",
            category: "Hatha",
            image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80",
            description: "Learn fundamental poses and proper alignment",
        },
    ];

    const filteredClasses = classes.filter((classItem) => {
        const matchesSearch =
            classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            classItem.instructor.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel =
            selectedLevel === "all" || classItem.level === selectedLevel;
        const matchesDuration =
            selectedDuration === "all" ||
            (selectedDuration === "short" && classItem.duration <= 45) ||
            (selectedDuration === "medium" && classItem.duration > 45 && classItem.duration <= 60) ||
            (selectedDuration === "long" && classItem.duration > 60);

        return matchesSearch && matchesLevel && matchesDuration;
    });

    return (
        <div className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
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

                {/* Results Count */}
                <div className="mb-6 text-sage-700">
                    Showing {filteredClasses.length} of {classes.length} classes
                </div>

                {/* Classes Grid */}
                <div className="bento-grid">
                    {filteredClasses.map((classItem, index) => (
                        <motion.div
                            key={classItem.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card variant="glow" className="overflow-hidden h-full flex flex-col">
                                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                                    <img
                                        src={classItem.image}
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
                                <div className="flex-1">
                                    <h3 className="text-2xl font-semibold mb-2">{classItem.title}</h3>
                                    <p className="text-sage-600 mb-2">with {classItem.instructor}</p>
                                    <p className="text-sage-700 text-sm mb-4">{classItem.description}</p>
                                </div>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-sage-100">
                                    <span className="text-sage-700 font-medium">⏱ {classItem.duration} min</span>
                                    <Button variant="primary" size="sm">
                                        Start Class
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* No Results */}
                {filteredClasses.length === 0 && (
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
